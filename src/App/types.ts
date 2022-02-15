export type Coin = {
  symbol: string;
  label: string;
};
export type State = {
  coins: Coin[];
};

export type Action = {
  type: string;
  payload: any;
};

export type Dispatch = (action: Action) => void;

export type GridProps = {
  gridTemplateColumns: CSSStyleDeclaration["gridTemplateColumns"];
  gridTemplateAreas: CSSStyleDeclaration["gridTemplateAreas"];
};

export type GridLayout = {
  xs: GridProps;
  sm: GridProps;
  md: GridProps;
  lg: GridProps;
  xl: GridProps;
};
