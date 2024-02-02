"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { ManageWeth } from "@/app/components/feeds_and_price/ManageWeth";
import { TokensFeeds } from "@/app/components/token_oracles/TokensFeeds";
import { GetCurrency } from "@/app/components/feeds_and_price/GetCurrency";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  return (
    <>
      <div className={"pt-5 pl-5 pr-5"}>
        <div className={"flex space-x-5"}>
          <h2 className={"text-2xl"}>Connect account</h2>
          <button
            className={"border-2 p-1.5 hover:bg-white hover:text-black"}
            onClick={() => open()}
          >
            Connect wallet
          </button>
          <button
            className={"border-2 p-1.5 hover:bg-white hover:text-black"}
            onClick={() => open({ view: "Networks" })}
          >
            Choose network
          </button>
          {account.status === "connected" && (
            <>
              <button
                className={"border-2 p-1.5 hover:bg-white hover:text-black"}
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
              <h2 className={"self-center"}>
                Account address: {account.address}
              </h2>
            </>
          )}
        </div>
        <hr className={"mt-5 mb-5"} />
        <div className={""}>
          <h2 className={"text-2xl text-center"}>Manage contract</h2>
          <ManageWeth />
          <hr className={"mt-5 mb-5 w-1/2"} />
          <TokensFeeds />
        </div>
        <hr className={"mt-5 mb-5"} />
        <div className={""}>
          <h2 className={"text-2xl text-center"}>Raffle logic</h2>
          <h3 className={"text-xl mt-3"}>Get currency</h3>
          <GetCurrency />
        </div>
      </div>
    </>
  );
}

export default App;
