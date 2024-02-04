import abi from "../../../abi/Weth.json";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { parseEther } from "viem";
import * as RaffleAbi from "@/abi/Raffle.json";
import { parseBigNumber } from "@/utils/parseBigInt";

interface DepositeWithdraw {
  depositeAmount: bigint;
  withdrawAmount: bigint;
  userBalance: string;
}

interface balanceData {
  data: unknown;
  isError: boolean;
  isLoading: boolean;
}

export function ExchangeWeth() {
  const wethAddress: `0x${string}` =
    "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

  const account = useAccount();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: wethAddress,
    abi,
    functionName: "deposit",
  });

  const {
    data: withDrawData,
    isLoading: isLoadingWithdraw,
    isSuccess: isSuccessWithdraw,
    write: writeWithDraw,
  } = useContractWrite({
    address: wethAddress,
    abi,
    functionName: "withdraw",
  });

  const {
    data: balanceData,
    isError: isBalanceError,
    isLoading: isBalabceLoading,
  } = useContractRead({
    address: wethAddress,
    abi,
    functionName: "balanceOf",
    args: [account.address],
  });

  const [amount, setAmount] = useState<DepositeWithdraw>({
    depositeAmount: BigInt(0),
    withdrawAmount: BigInt(0),
    userBalance: "",
  });

  useEffect(() => {
    setAmount({
      ...amount,
      userBalance: `${balanceData}`,
    });
  }, [data, account.address]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value }: { name: string; value: string } = e.target;

    setAmount({
      ...amount,
      [name]: parseEther(value, "wei"),
    });
  }

  return (
    <>
      <div className={"space-y-5 mt-3"}>
        <div className={"space-x-5"}>
          <label className={""}>Amount to change on WETH:</label>
          <input
            name="depositeAmount"
            id="depositeAmount"
            onChange={handleInputChange}
            type={"number"}
            placeholder={"0"}
          />
          <button
            className={
              "border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"
            }
            disabled={!write}
            onClick={() => {
              write({
                value: amount.depositeAmount,
              });
            }}
          >
            Change
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
        <div className={"space-x-5"}>
          <label className={""}>Amount to withdraw from WETH:</label>
          <input
            name="withdrawAmount"
            id="withdrawAmount"
            onChange={handleInputChange}
            type={"number"}
            placeholder={"0"}
          />
          <button
            className={
              "border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"
            }
            disabled={!write}
            onClick={() => {
              writeWithDraw({
                args: [amount.withdrawAmount],
              });
            }}
          >
            Withdraw
          </button>
          {isLoadingWithdraw && (
            <div className={"mt-5"}>
              Request sent! Waiting for the response...
            </div>
          )}
          {isSuccessWithdraw && (
            <div className={"mt-5"}>
              Transaction: {JSON.stringify(withDrawData)}
            </div>
          )}
        </div>
        <div className={"space-x-5"}>
          <div>Your balance is: {parseBigNumber(amount.userBalance)} WETH</div>
        </div>
      </div>
    </>
  );
}
