import abi from "../../../abi/UniswapMaskToken.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { FormEvent, useState } from "react";
import { parseEther } from "viem";
import { globalRaffleContractAddress } from "../../../../helper";
export function AllowanceTransfer() {
  const [targetTokenAddress, setTargetTokenAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: targetTokenAddress,
    abi,
    functionName: "approve",
  });
  return (
    <>
      <div className={"mt-3"}>
        <div className={"space-x-5"}>
          <label className={""}>Input token address for approving</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setTargetTokenAddress((e!.target as HTMLInputElement)!.value);
            }}
            type={"text"}
            placeholder={"0xJd13..."}
          />
          <label className={""}>Amount to transfer:</label>
          <input
            onInput={(e) => {
              setAmount(+(e!.target as HTMLInputElement)!.value);
            }}
            type={"number"}
          />
          <button
            className={
              "border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"
            }
            disabled={!write}
            onClick={() => {
              write({
                args: [
                  globalRaffleContractAddress,
                  parseEther(amount.toString(), "wei"),
                ],
              });
              console.log(parseEther(amount.toString(), "wei"));
            }}
          >
            Approve
          </button>
        </div>

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
