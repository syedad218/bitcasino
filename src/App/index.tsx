import CurrencySelector from "../components/CurrencySelector";
import logo from "../assets/logo.svg";
import Box from "@mui/material/Box";
import { useReducer } from "react";
import { CurrencyListWrapper } from "./styled";
import { Action, State } from "./types";
import Coin from "../components/Coin";
import useWidth from "../useWidth";

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const width = useWidth();

  return (
    <div className="App">
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateAreas:
            width === "sm" || width === "xs"
              ? `"left" "right" "center"`
              : width === "md"
              ? `"left right" "left center"`
              : `"left center center center right"`,
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{ gridArea: "left", justifySelf: "center", marginTop: "3rem" }}
        >
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
        </Box>
        <Box sx={{ gridArea: "center" }}>
          <div className="figure-container">
            <div className="figure"></div>
          </div>
        </Box>
        <Box sx={{ gridArea: "right", justifySelf: "center" }}>
          <CurrencySelector dispatch={dispatch} state={state} />
        </Box>
      </Box>
      <div className="bg-img"></div>
    </div>
  );
}

export default App;
