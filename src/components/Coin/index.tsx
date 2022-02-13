import { FC } from "react";
import { Action, Coin } from "../../App/types";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  dispatch: (action: Action) => void;
  coin: Coin;
}

const CoinWrapper: FC<Props> = ({ dispatch, coin }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "300px",
        justifyContent: "space-between",
        maxWidth: "100px",
      }}
    >
      <div>{`${coin.symbol}`}</div>
      <div onClick={() => dispatch({ type: "remove", payload: coin })} style={{cursor: 'pointer'}}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default CoinWrapper;
