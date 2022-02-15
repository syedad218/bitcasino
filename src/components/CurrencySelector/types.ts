import { Dispatch, State } from "../../App/types";

export interface Props {
  dispatch: Dispatch;
  state: State;
}

export interface Asset {
  assetName: string;
  assetSymbol: string;
}

export interface Assets {
  assets: Asset[];
}
