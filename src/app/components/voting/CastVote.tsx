import governorAbi from "../../../abi/MyGovernor.json";
import { useState } from "react";
import { useContractWrite } from "wagmi";

export function CastVote() {
  const proposalId = localStorage.getItem("proposalId");
  const [vote, setVote] = useState<number>(0);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x519b05b3655F4b89731B677d64CEcf761f4076f6",
    abi: governorAbi.abi,
    functionName: "castVote",
  });

  return (
    <div className={"space-y-5 mt-3"}>
      <div className={"space-x-5"}>
        <label>Your choice:</label>
        <select
          onChange={(e) => {
            setVote(+e.target.value);
          }}
          name="selectedFruit"
        >
          <option value="0">Against</option>
          <option value="1">For</option>
          <option value="2">Abstain</option>
        </select>
      </div>
      <button
        className={"border-2 p-1.5 min-w-28 hover:bg-white hover:text-black"}
        disabled={!write}
        onClick={() => {
          write({ args: [proposalId, vote] });
        }}
      >
        Create proposal
      </button>
    </div>
  );
}
