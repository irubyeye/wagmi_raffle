import { Proposal } from "@/app/components/voting/Voting";
import { useContractWrite } from "wagmi";
import { keccak256, toHex } from "viem";
import governorAbi from "@/abi/MyGovernor.json";
import { globalRaffleContractAddress } from "../../../../helper";
import { useState } from "react";

export function QueueAndExecute({ props }: { props: Proposal }) {
  const descriptionHash: string = keccak256(toHex(props.description));

  const {
    data: queueData,
    isLoading: isQueueLoading,
    isSuccess: isQueueSuccess,
    write: queueWrite,
  } = useContractWrite({
    address: "0x519b05b3655F4b89731B677d64CEcf761f4076f6",
    abi: governorAbi.abi,
    functionName: "queue",
  });

  const {
    data: executeData,
    isLoading: isExecuteLoading,
    isSuccess: isExecuteSuccess,
    write: executeWrite,
  } = useContractWrite({
    address: "0x519b05b3655F4b89731B677d64CEcf761f4076f6",
    abi: governorAbi.abi,
    functionName: "execute",
  });

  return (
    <div className={"space-y-5 mt-3"}>
      <div className={"space-x-5"}>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          disabled={!queueWrite}
          onClick={() => {
            console.log(props);
            queueWrite({
              args: [
                [globalRaffleContractAddress],
                [0],
                [props.functionHash],
                descriptionHash,
              ],
            });
          }}
        >
          Queue
        </button>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          disabled={!executeWrite}
          onClick={() => {
            console.log(descriptionHash);
            executeWrite({
              args: [
                [globalRaffleContractAddress],
                [0],
                [props.functionHash],
                descriptionHash,
              ],
            });
          }}
        >
          Execute
        </button>
      </div>
    </div>
  );
}
