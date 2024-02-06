import { abi } from "../../../abi/Raffle.json";
import governorAbi from "../../../abi/MyGovernor.json";

import { useContractRead, useContractWrite, useContractEvent } from "wagmi";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { encodeFunctionData, keccak256, toHex } from "viem";
import { ADDRESS_ZERO, globalRaffleContractAddress } from "../../../../helper";
import { CastVote } from "@/app/components/voting/CastVote";
import { QueueAndExecute } from "@/app/components/voting/QueueAndExecute";
import { MagicButtons } from "@/app/components/magic-buttons/MagicButtons";

export interface Proposal {
  tokenAddress: `0x${string}`;
  dataFeed: string;
  description: string;
  functionHash: string;
  isAllowed: boolean;
  proposalId: `0x${string}` | undefined;
  proposalState: number;
}

export function Voting() {
  const votingStatuses: string[] = [
    "Pending",
    "Active",
    "Canceled",
    "Defeated",
    "Succeeded",
    "Queued",
    "Expired",
    "Executed",
  ];

  const [proposal, setProposal] = useState<Proposal>({
    tokenAddress: ADDRESS_ZERO,
    dataFeed: ADDRESS_ZERO,
    description: "",
    isAllowed: false,
    functionHash: "",
    proposalId: undefined,
    proposalState: 0,
  });

  const [proposalId, setProposalId] = useState<`0x${string}` | undefined>(
    undefined,
  );

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xbEbf55B706046A370198B92990B8A2f9E5e1ebB8",
    abi: governorAbi.abi,
    functionName: "propose",
  });

  const {
    data: proposalStateData,
    isError: proposalStateError,
    isLoading: proposalStateLoading,
  } = useContractRead({
    address: "0xbEbf55B706046A370198B92990B8A2f9E5e1ebB8",
    abi: governorAbi.abi,
    functionName: "state",
    args: [proposal.proposalId],
  });

  useContractEvent({
    address: "0xbEbf55B706046A370198B92990B8A2f9E5e1ebB8",
    abi: governorAbi.abi,
    eventName: "ProposalCreated",
    listener(log) {
      setProposalId(log[0].args.proposalId);
    },
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    const { name, value }: { name: string; value: string } = e.target;

    setProposal({
      ...proposal,
      [name]: value,
    });
  }

  function handleVoting() {
    const functionCallManageTokenAndOracle = encodeFunctionData({
      abi,
      args: [proposal.tokenAddress, proposal.dataFeed, proposal.isAllowed],
      functionName: "manageTokenAndOracle",
    });
    setProposal({
      ...proposal,
      functionHash: functionCallManageTokenAndOracle,
    });
    console.log(proposal);
    console.log(functionCallManageTokenAndOracle);
    write({
      args: [
        [globalRaffleContractAddress],
        [0],
        [functionCallManageTokenAndOracle],
        proposal.description,
      ],
    });
  }

  return (
    <>
      <div className={"space-y-5 mt-3"}>
        <h3>Create proposal</h3>
        <div className={"space-x-5"}>
          <label className={""}>Token to add</label>
          <input
            name="tokenAddress"
            id="tokenAddress"
            onChange={handleInputChange}
            type={"text"}
            placeholder={"0xD4fkj5"}
          />
        </div>
        <div className={"space-x-5"}>
          <label className={""}>Datafeed to add</label>
          <input
            name="dataFeed"
            id="dataFeed"
            onChange={handleInputChange}
            type={"text"}
            placeholder={"0xD4fkj5"}
          />
        </div>
        <div className={"space-x-5"}>
          <label>Is allowed</label>
          <input
            name="isAllowed"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              setProposal({ ...proposal, isAllowed: e.target.checked });
            }}
            type={"checkbox"}
          />
        </div>
        <div className={"space-x-5"}>
          <label>Vote description</label>
          <input
            name="description"
            onChange={handleInputChange}
            placeholder={"Some description here..."}
            type={"text"}
          />
        </div>
        {isLoading && (
          <div className={"mt-5"}>
            Request sent! Waiting for the response...
          </div>
        )}
        {isSuccess && (
          <div className={"mt-5"}>
            Transaction: {JSON.stringify(data?.hash)}
          </div>
        )}
        {!proposalStateError && (
          <h3>
            Current proposal state:{" "}
            {`${votingStatuses[proposal.proposalState]}`}
          </h3>
        )}

        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          disabled={!write}
          onClick={handleVoting}
        >
          Create proposal
        </button>

        <h3 className={"text-xl mt-5"}>Vote</h3>
        <CastVote proposalId={proposalId} />

        <h3 className={"text-xl mt-5"}>Queue and execute</h3>
        <QueueAndExecute props={proposal} />

        <h3 className={"text-xl mt-5"}>Magic buttons</h3>
        <MagicButtons />
      </div>
    </>
  );
}
