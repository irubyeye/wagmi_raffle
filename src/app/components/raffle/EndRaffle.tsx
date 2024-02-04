import { abi } from "../../../abi/Raffle.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { FormEvent, useState } from "react";
import { parseEther } from "viem";
import { globalRaffleContractAddress } from "../../../../helper";

export function EndRaffle() {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: globalRaffleContractAddress,
    abi,
    functionName: "endRaffle",
  });

  return (
    <div className={"pt-5"}>
      <button
        className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
        disabled={!write}
        onClick={() => {
          write();
        }}
      >
        End Raffle
      </button>

      {isLoading && (
        <div className={"mt-5"}>Request sent! Waiting for the response...</div>
      )}
      {isSuccess && (
        <div className={"mt-5"}>Transaction: {JSON.stringify(data)}</div>
      )}
    </div>
  );
}
