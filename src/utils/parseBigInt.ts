import BigNumber from "bignumber.js";
BigNumber.set({ DECIMAL_PLACES: 8 });

export function parseBigNumber(bigNumber: string): string {
  const bigNumberToParse = new BigNumber(bigNumber);
  const properView: bigint = bigNumberToParse.div(new BigNumber(10).pow(18));
  return properView.toString();
}
