import React, { FC, useState, Fragment, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardContainer,
  TermsText,
  InputField,
  AddButton,
  cardWithStyles,
} from "./styled";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { Coin } from "../../App/types";
import { Props, Asset, Assets } from "./types";
import Snackbar from "@mui/material/Snackbar";
import debounce from "lodash/debounce";
import { findCoins } from "./utils";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FETCH_COINS_BY_SEARCH_QUERY = gql`
  query GetCoinsList {
    assets(filter: { assetSymbol: { _like: "%%" } }) {
      assetName
      assetSymbol
    }
  }
`;

const CurencySelector: FC<Props> = ({ dispatch, state }) => {
  const [value, setValue] = useState<Coin | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const isAddDisabled = value == null;

  const { data, loading } = useQuery<Assets>(
    FETCH_COINS_BY_SEARCH_QUERY
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  const handleAddingCurrency = (e: React.SyntheticEvent<Element, Event>) => {
    const isDuplicate = state.coins.some(
      (coin) => coin.symbol === value?.symbol
    );
    if (isAddDisabled) {
      return;
    } else if (isDuplicate) {
      setAlert(true);
    } else {
      // add coins to the list
      dispatch({ type: "add", payload: value });
      setValue(null);
    }
  };

  const coinsList = useMemo(() => {
    const coins =
      data?.assets?.map((coin: Asset) => ({
        label: coin.assetName,
        symbol: coin.assetSymbol,
      })) || [];

    if (inputValue === "") {
      return coins;
    } else {
      return findCoins(inputValue, coins);
    }
  }, [data, inputValue]);

  const debouncedInputUpdate = debounce(
    (event: React.SyntheticEvent<Element, Event>, input: string) => {
      setInputValue(input);
    },
    500
  );

  return (
    <CardContainer>
      <Card sx={cardWithStyles}>
        <CardContent sx={{ padding: "2.2rem", textAlign: "center" }}>
          <Autocomplete
            id="currency-selector"
            filterOptions={(x) => x}
            size="small"
            options={coinsList}
            autoComplete
            loading={loading}
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue: Coin | null) => {
              setValue(newValue);
            }}
            getOptionLabel={(option) => `${option.label} (${option.symbol})`}
            onInputChange={debouncedInputUpdate}
            renderInput={(params) => (
              <InputField
                {...params}
                label="CRYPTOCURRENCY CODE"
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
          />
          <AddButton
            disableElevation
            fullWidth
            onClick={(e) => handleAddingCurrency(e)}
            disableRipple={isAddDisabled}
          >
            Add
          </AddButton>
          <TermsText>
            Use of this service is subject to terms and conditions.
          </TermsText>
        </CardContent>
      </Card>
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="info">{`${value?.label}(${value?.symbol}) already exists!!`}</Alert>
      </Snackbar>
    </CardContainer>
  );
};

export default CurencySelector;
