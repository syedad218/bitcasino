# BitCasino 💰

- Install Node 12.x or Node 14.x
- Run npm i for installing dependencies
- Run npm run start

Voila!

## Stack used 👨‍💻

- React.js @17 - Frontend library for writing components - [React.js](https://reactjs.org/)
- Material-UI @5.4 - For rendering Grid based UI and specific UI components like Autocomplete, button, etc. [Material-UI](https://material-ui.com/)
- Emotion JS (CSS in JS) @11 - For styling components and customizing MUI components [Emotion JS](https://emotion.sh/)
- Apollo Client @3.5 - Client interface for GraphQL query and mutation - [Apollo Client](https://www.apollographql.com/)
- GraphQL @16.3 - For parsing response from GraphQL server - [GraphQL](https://graphql.org/)
- Lodash @4.17 - For utility functions like debounce, escapeRegExp, etc. - [Lodash](https://lodash.com/)
- Typescript @4.5 - For type checking - [Typescript](https://www.typescriptlang.org/)

## CI/CD 🔥

- Build and Deployment done using GitHub Actions and Github Pages
- Deployed site available here:- [https://syedad218.github.io/bitcasino-assignment]

## How to use

- type the ticker symbol/name for your favorite cryptocurrency in the select box on the right.
  - Here is the order of fetched results based on input
  - 1. Matching symbol by start of the input
  - 2. Matching symbol by inclusion of the input
  - 3. Matching name by start of the input
  - 4. Matching name by inclusion of the input
- select one from the dropdown list
- click on Add button below to add it to your watch list
- The coin on the watch list is fetching price in Euros €.
- The price is taken from the first market value where tickerPrice is available.
- GraphQL server is polled at an interval of 5 seconds for latest price.

### Polling Query ex:-

```js
const { data, loading, error } = useQuery(FETCH_COIN_PRICE_QUERY, {
  variables: { search: coin.symbol },
  pollInterval: 5000,
});
```

### Creating Regex for sorting search results ex:-

```js
const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");
```

### GraphQL query used for fetching all coins/assets to populate selector dropdown:-

```js
const FETCH_COINS_BY_SEARCH_QUERY = gql`
  query GetCoinsList {
    assets(filter: { assetSymbol: { _like: "%%" } }) {
      assetName
      assetSymbol
    }
  }
`;
```

## UI Notes 📝

- Made a custom function which uses MUI's useMediaQuery hook to check for screen size.
- using this function added breakpoints to the page layout for implementing a CSS grid which can move in both x and y directions.

```js
import { Breakpoint, Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useWidth = (): WidthOptions => {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};
```
