import { abi } from "../../../abi/Raffle.json";
import governorAbi from "../../../abi/MyGovernor.json";

import { useContractRead, useContractWrite, useContractEvent } from "wagmi";
import { ChangeEvent, useMemo, useState } from "react";
import { encodeFunctionData } from "viem";
import { ADDRESS_ZERO, globalRaffleContractAddress } from "../../../../helper";

interface Proposal {
  tokenAddress: `0x${string}`;
  dataFeed: string;
  description: string;
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
    proposalId: undefined,
    proposalState: 0,
  });

  const functionCallManageTokenAndOracle = encodeFunctionData({
    abi,
    args: [proposal.tokenAddress, proposal.dataFeed, proposal.isAllowed],
    functionName: "manageTokenAndOracle",
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x519b05b3655F4b89731B677d64CEcf761f4076f6",
    abi: governorAbi.abi,
    functionName: "propose",
  });

  const {
    data: proposalStateData,
    isError: proposalStateError,
    isLoading: proposalStateLoading,
  } = useContractRead({
    address: "0x519b05b3655F4b89731B677d64CEcf761f4076f6",
    abi: governorAbi.abi,
    functionName: "state",
    args: [proposal.proposalId],
  });

  useContractEvent({
    address: "0x519b05b3655F4b89731B677d64CEcf761f4076f6",
    abi: governorAbi.abi,
    eventName: "ProposalCreated",
    listener(log) {
      setProposal({ ...proposal, proposalId: log[0].args.proposalId });
      localStorage.setItem("proposalId", `${proposal.proposalId}`);
    },
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value }: { name: string; value: string } = e.target;

    setProposal({
      ...proposal,
      [name]: value,
    });
  }

  useMemo(async () => {
    setProposal({ ...proposal, proposalState: proposalStateData as number });
  }, [proposalStateData]);

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
            name="tokenAddress"
            id="tokenAddress"
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
          onClick={() => {
            write({
              args: [
                [globalRaffleContractAddress],
                [0],
                [functionCallManageTokenAndOracle],
                proposal.description,
              ],
            });
          }}
        >
          Create proposal
        </button>
        <h3 className={"text-xl mt-5"}>Vote</h3>
      </div>
    </>
  );
}
