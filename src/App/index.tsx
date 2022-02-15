import CurrencySelector from "../components/CurrencySelector";
import logo from "../assets/logo.svg";
import Box from "@mui/material/Box";
import { useReducer } from "react";
import { gridLayout, Title, CoinListWrapper } from "./styled";
import Coin from "../components/Coin";
import useWidth from "../hooks/useWidth";
import { reducer, initialState } from "../State/reducer";

const leftPanelWithStyles: React.CSSProperties = {
  gridArea: "left",
  justifySelf: "center",
  marginTop: "3rem",
  marginLeft: "2rem",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const width = useWidth();
  const coins = state?.coins ?? [];

  return (
    <div className="App">
      <Box
        sx={{
          display: "grid",
          gap: 1,
          height: "100vh",
          rowGap: 5,
          ...gridLayout[width],
        }}
      >
        <Box sx={leftPanelWithStyles}>
          <Title>
            <img src={logo} alt="logo" />
            <h1>
              Now you can track
              <br /> all your cryptos here!
            </h1>
            <h3>
              Just enter the <br /> cryptocurrency code on the <br /> form to the right.
            </h3>
          </Title>
          <CoinListWrapper>
            {coins.length > 0 ? (
              coins.map((coin, index) => {
                return (
                  <div key={`${coin.symbol}-${index}`}>
                    <Coin dispatch={dispatch} coin={coin} />
                  </div>
                );
              })
            ) : (
              <p>Your watchlist is empty!</p>
            )}
          </CoinListWrapper>
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
