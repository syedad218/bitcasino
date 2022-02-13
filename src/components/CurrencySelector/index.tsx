import React, { FC, useState, useRef, Fragment, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardContainer, TermsText } from "./styled";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { gql, useQuery } from "@apollo/client";
import escapeRegExp from "lodash/escapeRegExp";
import CircularProgress from "@mui/material/CircularProgress";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Action, State } from "../../App/types";
import Snackbar from '@mui/material/Snackbar';


interface Props {
  dispatch: (action: Action) => void;
  state: State;
}

interface Asset {
  assetName: string;
  assetSymbol: string;
}

const FETCH_COINS_BY_SEARCH_QUERY = gql`
  query GetCoinsList {
    assets(filter: { assetSymbol: { _like: "%%" } }) {
      assetName
      assetSymbol
    }
  }
`;

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  borderRadius: "20px",
  height: "38px",
  marginTop: "16px",
  backgroundColor: "#FE4B24",
  "&:hover": {
    backgroundColor: "#FE4B24",
  },
}));

const CurencySelector: FC<Props> = ({ dispatch, state }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<{ label: string; symbol: string } | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const isAddDisabled = value === null;

  const { data, loading, error } = useQuery<{ assets: Asset[] }>(
    FETCH_COINS_BY_SEARCH_QUERY
  );

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const handleAddingCurrency = (e: React.SyntheticEvent<Element, Event>) => {
    const isDuplicate = state.coins.some(
      (coin) => coin.symbol === value?.symbol
    );
    if (isAddDisabled) {
      // do nothing
      return;
    } else if (isDuplicate) {
      setAlert(true);
    } else {
      // add coins to the list
      dispatch({ type: "add", payload: value });
    }
  };

  const coinsList = useMemo(() => {
    const coins =
      data?.assets?.map((coin: Asset) => ({
        label: `${coin.assetName}`,
        symbol: coin.assetSymbol,
      })) || [];

    if (inputValue === "") {
      return coins;
    } else {
      const matchSymbolByStart = [];
      const matchSymbolByInclusion = [];
      const matchNameByStart = [];
      const matchNameByInclusion = [];
      const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
      const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");
      for (const coin of coins) {
        // checking symbol pattern **
        if (regByInclusion.test(coin.symbol)) {
          if (regByStart.test(coin.symbol)) {
            matchSymbolByStart.push(coin);
          } else {
            matchSymbolByInclusion.push(coin);
          }
        } else {
          // checking name pattern **
          if (regByInclusion.test(coin.label)) {
            if (regByStart.test(coin.label)) {
              matchNameByStart.push(coin);
            } else {
              matchNameByInclusion.push(coin);
            }
          }
        }
      }
      return [
        ...matchSymbolByStart,
        ...matchSymbolByInclusion,
        ...matchNameByStart,
        ...matchNameByInclusion,
      ];
    }
  }, [data, inputValue]);

  const debouncedInputUpdate = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };

  return (
    <CardContainer>
      <Card sx={{ width: 370, height: 246 }}>
        <CardContent sx={{ padding: "38px 35px", textAlign: "center" }}>
          <Autocomplete
            id="currency-selector"
            sx={{ width: 300 }}
            filterOptions={(x) => x}
            size="small"
            options={coinsList}
            autoComplete
            loading={loading}
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(
              event,
              newValue: { label: string; symbol: string } | null
            ) => {
              // console.log(newValue);
              setValue(newValue);
            }}
            getOptionLabel={(option) => `${option.label} (${option.symbol})`}
            onInputChange={debouncedInputUpdate}
            renderInput={(params) => (
              <TextField
                {...params}
                label="CRYPTOCURRENCY CODE"
                sx={{ fontWeight: "bold" }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress
                          color="inherit"
                          size={16}
                          sx={{ marginRight: "28px" }}
                        />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
            onClose={() => setOptions([])}
          />
          <CustomButton
            disableElevation
            fullWidth
            onClick={(e) => handleAddingCurrency(e)}
          >
            Add
          </CustomButton>
          <TermsText>
            Use of this service is subject to terms and conditions.
          </TermsText>
        </CardContent>
      </Card>
      <Snackbar
        open={alert}
        autoHideDuration={3000}
        onClose={handleClose}
        message="coin already exists"
        // action={action}
      />
    </CardContainer>
  );
};

export default CurencySelector;
