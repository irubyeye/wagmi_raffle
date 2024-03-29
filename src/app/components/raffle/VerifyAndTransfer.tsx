import { abi } from "../../../abi/Raffle.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { FormEvent, useState } from "react";
import { parseEther } from "viem";
import { globalRaffleContractAddress } from "../../../../helper";

export function VerifyAndTransfer() {
  const [raffleId, setRaffleId] = useState<number>(0);
  const [supposedWinner, setSupposedWinner] = useState<string>("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: globalRaffleContractAddress,
    abi,
    functionName: "verifyAndTransfer",
  });

  return (
    <>
      <div className={"space-y-5 mt-3"}>
        <div className={"space-x-5"}>
          <label className={""}>Input raffle id</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setRaffleId(+(e!.target as HTMLInputElement)!.value);
            }}
            type={"number"}
            placeholder={"0"}
          />
        </div>
        <div className={"space-x-5"}>
          <label className={""}>Input address of the supposed winner</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setSupposedWinner((e!.target as HTMLInputElement)!.value);
            }}
            type={"text"}
            placeholder={"0"}
          />
        </div>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          disabled={!write}
          onClick={() => {
            write({
              args: [raffleId, supposedWinner],
            });
          }}
        >
          Verify
        </button>

        {isLoading && (
          <div className={"mt-5"}>
            Request sent! Waiting for the response...
          </div>
        )}
        {isSuccess && (
          <div className={"mt-5"}>Transaction: {JSON.stringify(data)}</div>
        )}
      </div>
    </>
  );
}
