import { Coin } from "../../App/types";
import { escapeRegExp } from "lodash";

export const findCoins = (inputValue: string, coins: Coin[]): Array<Coin> => {
  const matchSymbolByStart = [];
  const matchSymbolByInclusion = [];
  const matchNameByStart = [];
  const matchNameByInclusion = [];
  const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
  const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");
  for (const coin of coins) {
    // checking symbol pattern **
    if (regByInclusion.test(coin.symbol)) {
      if (regByStart.test(coin.symbol)) {
        matchSymbolByStart.push(coin);
      } else {
        matchSymbolByInclusion.push(coin);
      }
    } else {
      // checking name pattern **
      if (regByInclusion.test(coin.label)) {
        if (regByStart.test(coin.label)) {
          matchNameByStart.push(coin);
        } else {
          matchNameByInclusion.push(coin);
        }
      }
    }
  }
  return [
    ...matchSymbolByStart,
    ...matchSymbolByInclusion,
    ...matchNameByStart,
    ...matchNameByInclusion,
  ];
};
