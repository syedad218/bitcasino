export type Coin = {
  symbol: string;
  label: string;
};
export type State = {
  coins: Array<Coin>;
};

export type Action = {
  type: string;
  payload: any;
};
