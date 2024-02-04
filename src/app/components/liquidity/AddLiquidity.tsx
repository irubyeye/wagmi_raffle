import { abi } from "../../../abi/Raffle.json";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { FormEvent, useState } from "react";
import { parseEther } from "viem";
import { globalRaffleContractAddress } from "../../../../helper";
export function AddLiquidity() {
  const wethTokenAddress: `0x${string}` =
    "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

  const account = useAccount();
  const [amountTokenA, setAmountTokenA] = useState<number>(0);
  const [amountTokenB, setAmountTokenB] = useState<number>(0);
  const [targetTokenAddress, setTargetTokenAddress] = useState<string>("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: globalRaffleContractAddress,
    abi,
    functionName: "addLiquidity",
  });
  return (
    <>
      <div className={"space-y-5 mt-3"}>
        <div className={"space-x-5"}>
          <label className={""}>Set amount of WETH</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setAmountTokenA(+(e!.target as HTMLInputElement)!.value);
            }}
            type={"number"}
            placeholder={"123"}
          />
        </div>
        <div className={"space-x-5"}>
          <label className={""}>Your token address</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setTargetTokenAddress((e!.target as HTMLInputElement)!.value);
            }}
            type={"text"}
            placeholder={"0xJd13..."}
          />
        </div>
        <div className={"space-x-5"}>
          <label className={""}>Set amount of your token:</label>
          <input
            onInput={(e) => {
              setAmountTokenB(+(e!.target as HTMLInputElement)!.value);
            }}
            type={"number"}
            placeholder={"123"}
          />
        </div>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          disabled={!write}
          onClick={() => {
            write({
              args: [
                wethTokenAddress,
                targetTokenAddress,
                parseEther(amountTokenA.toString(), "wei"),
                parseEther(amountTokenB.toString(), "wei"),
                0,
                0,
                account.address,
                Math.floor(Date.now() / 1000) + 60,
              ],
            });
          }}
        >
          Add liquidity
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
