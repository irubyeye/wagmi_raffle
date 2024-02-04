import * as RaffleAbi from "../../../abi/Raffle.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { FormEvent, useState } from "react";
import { globalRaffleContractAddress } from "../../../../helper";

export function ManageWeth() {
  const [address, setAddress] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: globalRaffleContractAddress,
    abi: RaffleAbi.abi,
    functionName: "manageWeth",
  });
  return (
    <div className={"mt-5"}>
      <div className={"space-x-5"}>
        <label className={""}>Input new weth address</label>
        <input
          onInput={(e: FormEvent<HTMLInputElement>) => {
            setAddress((e!.target as HTMLInputElement)!.value);
          }}
          type={"text"}
          placeholder={"0xJd13..."}
        />
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          disabled={!write}
          onClick={() => {
            write({
              args: [address],
            });
          }}
        >
          Update
        </button>
      </div>

      {isLoading && (
        <div className={"mt-5"}>Request sent! Waiting for the response...</div>
      )}
      {isSuccess && (
        <div className={"mt-5"}>Transaction: {JSON.stringify(data)}</div>
      )}
    </div>
  );
}
