import { abi } from "../../../abi/Raffle.json";
import governorAbi from "../../../abi/MyGovernor.json";
import timeLockAbi from "../../../abi/TimeLock.json";

import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { encodeFunctionData } from "viem";

interface Proposal {
  tokenAddress: string;
  dataFeed: string;
}

export function Voting() {
  const [proposal, setProposal] = useState<Proposal>({
    tokenAddress: "",
    dataFeed: "",
  });

  // const functionCallManageTokenAndOracle = encodeFunctionData({
  //   abi,
  //   function: "manageTokenAndOracle",
  //   args: [],
  // });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value }: { name: string; value: string } = e.target;

    setProposal({
      ...proposal,
      [name]: value,
    });
  }

  return (
    <>
      <div className={"space-y-5 mt-3"}>
        <h3></h3>
        <div className={"space-x-5"}>
          <label className={""}>Token to add</label>
          <input
            name="tokenAddress"
            id="tokenAddress"
            onChange={handleInputChange}
            type={"text"}
            placeholder={"0"}
          />
        </div>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          //disabled={!write}
          onClick={() => {
            // write({
            //   value: amount.depositeAmount,
            // });
          }}
        >
          Change
        </button>
      </div>
    </>
  );
}
