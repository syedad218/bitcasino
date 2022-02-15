import { Action, State } from "../App/types";

export const initialState: State = {
  coins: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add":
      return {
        coins: [...state.coins, action.payload],
      };
    case "remove":
      return {
        coins: state.coins.filter(
          (coin) => coin.symbol !== action.payload.symbol
        ),
      };
    default:
      throw new Error("failed to update state!!");
  }
};
