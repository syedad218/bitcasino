import CurrencySelector from "../components/CurrencySelector";
import logo from "../assets/logo.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useReducer } from "react";
import { CurrencyListWrapper } from "./styled";
import { Action, State } from "./types";
import Coin from "../components/Coin";

export const initialState = {
  coins: [],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      console.log(action.payload);
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
      throw new Error("failed to update state");
  }
};

// const FETCH_COINS_QUERY = gql`
//   query price {
//     markets(
//       filter: { baseSymbol: { _eq: "BTC" }, quoteSymbol: { _eq: "EUR" } }
//     ) {
//       marketSymbol
//       ticker {
//         lastPrice
//       }
//     }
//   }
// `;

function App() {
  // const { loading, error, data } = useQuery(FETCH_COINS_QUERY);
  const [state, dispatch] = useReducer(reducer, initialState);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error :(</div>;

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, padding: 5 }}>
        <Grid container spacing={2} alignItems="space-between">
          <Grid item sm={12} md={8}>
            <div className="title">
              <img src={logo} alt="logo" />
              <h1 className="text">Now you can track all your cryptos here!</h1>
              <h3 className="subtext">
                Just enter the cryptocurrency code on the form to the right.
              </h3>
            </div>
            <CurrencyListWrapper>
              <div>
                {state.coins?.map((coin, index) => {
                  return (
                    <div key={`${coin.symbol}-${index}`}>
                      <Coin dispatch={dispatch} coin={coin} />
                    </div>
                  );
                })}
              </div>
            </CurrencyListWrapper>
          </Grid>
          <Grid item sm={12} md={4}>
            <CurrencySelector dispatch={dispatch} state={state} />
          </Grid>
        </Grid>
      </Box>
      <div className="bg-img"></div>
      <div className="figure"></div>
    </div>
  );
}

export default App;
