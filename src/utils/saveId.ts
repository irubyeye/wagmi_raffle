import * as fs from "fs";

function storeProposalId(proposalId: any) {
  fs.writeFileSync("", proposalId, "utf8");
}
