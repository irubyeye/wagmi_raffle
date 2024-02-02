import * as RaffleAbi from "../../../abi/Raffle.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { FormEvent, useState } from "react";

export function TokensFeeds() {
  const raffleContractAddress: `0x${string}` =
    "0x7C8cB9888f15fb0D18290b1761bD2c43E72C6994";

  const [address, setAddress] = useState<string>("");
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  const [addressFeed, setAddressFeed] = useState<string>("");
  const [addressToken, setAddressToken] = useState<string>("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: raffleContractAddress,
    abi: RaffleAbi.abi,
    functionName: "manageTokensList",
  });

  const {
    data: dataFeed,
    isLoading: isLoadingFeed,
    isSuccess: isSuccessFeed,
    write: writeFeed,
  } = useContractWrite({
    address: raffleContractAddress,
    abi: RaffleAbi.abi,
    functionName: "manageCurrencyOracle",
  });

  return (
    <div>
      <div className={"mt-5"}>
        <div className={"space-x-5"}>
          <label className={""}>Input token to manage</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setAddress((e!.target as HTMLInputElement)!.value);
            }}
            type={"text"}
            placeholder={"0xJd13..."}
          />
          <label className={""}>Is allowed</label>
          <input
            onChange={(e) => {
              setIsAllowed(e.currentTarget.checked);
            }}
            type={"checkbox"}
          />
          <button
            className={
              "border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"
            }
            disabled={!write}
            onClick={() => {
              write({
                args: [address, isAllowed],
              });
            }}
          >
            Update
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
      <hr className={"mt-5 mb-5 w-1/2"} />
      <div className={"mt-5"}>
        <div className={"space-x-5"}>
          <label className={""}>Input token to manage</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setAddressToken((e!.target as HTMLInputElement)!.value);
            }}
            type={"text"}
            placeholder={"0xKh11s..."}
          />
        </div>
        <div className={"space-x-5 pt-5"}>
          <label className={""}>Input datafeed for token</label>
          <input
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setAddressFeed((e!.target as HTMLInputElement)!.value);
            }}
            type={"text"}
            placeholder={"0xJd13..."}
          />
        </div>
        <button
          className={
            "border-2 p-1.5 min-w-28 hover:bg-white hover:text-black mt-5"
          }
          disabled={!writeFeed}
          onClick={() => {
            writeFeed({
              args: [addressToken, addressFeed],
            });
          }}
        >
          Update
        </button>

        {isLoading && (
          <div className={"mt-5"}>
            Request sent! Waiting for the response...
          </div>
        )}
        {isSuccess && (
          <div className={"mt-5"}>Transaction: {JSON.stringify(dataFeed)}</div>
        )}
      </div>
    </div>
  );
}
