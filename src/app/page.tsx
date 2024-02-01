"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

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
        <div className={"pt-5"}>
          <h2 className={"text-2xl"}>Raffle Game</h2>
        </div>
      </div>
    </>
  );
}

export default App;
