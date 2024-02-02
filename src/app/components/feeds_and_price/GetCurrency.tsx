import { useContractRead } from "wagmi";
import * as RaffleAbi from "../../../abi/Raffle.json";
import { FormEvent, useState, useEffect, useRef } from "react";

interface currencyData {
  data: unknown;
  isError: boolean;
  isLoading: boolean;
}

export function GetCurrency() {
  const [receivedData, setReceivedData] = useState<currencyData>({
    data: undefined,
    isError: false,
    isLoading: false,
  });

  const inputRef = useRef(null);

  const [address, setAddress] = useState<string>("");

  const { data, isError, isLoading } = useContractRead({
    address: "0x7C8cB9888f15fb0D18290b1761bD2c43E72C6994",
    abi: RaffleAbi.abi,
    functionName: "getCurrencyExt",
    args: [address],
  });

  const handleButtonClick = () => {
    setAddress(inputRef?.current.value);
    setReceivedData({ data, isError, isLoading });
  };

  return (
    <>
      <div className={"pt-3 space-x-5"}>
        <label>Type token address to get currency</label>
        <input ref={inputRef} type={"text"} placeholder={"0xJd13..."} />
        <button
          className={"border-2 p-1.5 hover:bg-white hover:text-black min-w-28"}
          onClick={handleButtonClick}
        >
          Get price
        </button>
        {!isError && <div className={""}>Price = {data?.toString()}</div>}
      </div>
    </>
  );
}
