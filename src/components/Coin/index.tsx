import { FC } from "react";
import { Action, Coin } from "../../App/types";
import CloseIcon from "@mui/icons-material/Close";
import tropyIcon from "../../assets/icon.svg";
import { CoinListContainer, CoinDetails, CloseCoin } from "./styled";

interface Props {
  dispatch: (action: Action) => void;
  coin: Coin;
}

const CoinWrapper: FC<Props> = ({ dispatch, coin }) => {
  return (
    <CoinListContainer>
      <img src={tropyIcon} alt="trophy icon" />
      <CoinDetails>
        <div>{`${coin.symbol}`}</div>
        <div>53.52 $</div>
      </CoinDetails>
      <CloseCoin onClick={() => dispatch({ type: "remove", payload: coin })}>
        <CloseIcon />
      </CloseCoin>
    </CoinListContainer>
  );
};

export default CoinWrapper;
