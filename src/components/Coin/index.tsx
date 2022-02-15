import { FC } from "react";
import { Coin, Dispatch } from "../../App/types";
import CloseIcon from "@mui/icons-material/Close";
import tropyIcon from "../../assets/icon.svg";
import { CoinContainer, CoinDetails, RemoveCoin } from "./styled";
import { gql, useQuery } from "@apollo/client";

const FETCH_COIN_PRICE_QUERY = gql`
  query price($search: String!) {
    markets(
      filter: { baseSymbol: { _eq: $search }, quoteSymbol: { _eq: "EUR" } }
    ) {
      marketSymbol
      baseSymbol
      ticker {
        lastPrice
      }
    }
  }
`;
interface Props {
  dispatch: Dispatch;
  coin: Coin;
}

const CoinWrapper: FC<Props> = ({ dispatch, coin }) => {
  const { data, loading, error } = useQuery(FETCH_COIN_PRICE_QUERY, {
    variables: { search: coin.symbol },
    pollInterval: 5000,
  });

  const price = data?.markets?.[0]?.ticker?.lastPrice;
  const roundedPrice = Math.round(price * 100) / 100;

  return (
    <CoinContainer>
      <img src={tropyIcon} alt="trophy icon" />
      <CoinDetails>
        <div>{`${coin.symbol}`}</div>
        {loading ? (
          <div>loading...</div>
        ) : isNaN(roundedPrice) ? (
          <div>Price unavailable!</div>
        ) : (
          <div>{roundedPrice} $</div>
        )}
      </CoinDetails>
      <RemoveCoin onClick={() => dispatch({ type: "remove", payload: coin })}>
        <CloseIcon />
      </RemoveCoin>
    </CoinContainer>
  );
};

export default CoinWrapper;
