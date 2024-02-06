import { createTestClient, http } from "viem";
import { localhost } from "viem/chains";

export function MagicButtons() {
  const client = createTestClient({
    chain: {
      ...localhost,
      id: 31337,
    },
    mode: "hardhat",
    transport: http(),
  });
  return (
    <>
      <div className={"space-x-6"}>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          onClick={() => {
            client.mine({ blocks: 1 });
          }}
        >
          Move Blocks
        </button>
        <button
          className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
          onClick={async () => {
            await client.increaseTime({ seconds: 3601 });
          }}
        >
          Move Time
        </button>
      </div>
    </>
  );
}
