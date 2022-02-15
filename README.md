# BitCasino

- Install Node 12.x or Node 14.x
- Run npm i for installing dependencies
- Run npm run start

Voila!

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

```
const { data, loading, error } = useQuery(FETCH_COIN_PRICE_QUERY, {
    variables: { search: coin.symbol },
    pollInterval: 5000,
  });
```

### Creating Regex for sorting search results ex:-

```
const regByInclusion = new RegExp(escapeRegExp(inputValue), "i");
const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, "i");
```

## Stack used

- React.js @17 - Frontend library for writing components
- Material-UI @5.4 - For rendering Grid based UI and specific UI components like Autocomplete, button, etc.
- Emotion JS (CSS in JS) @11 - For styling components and customizing MUI components
- Apollo Client @3.5 - Client interface for GraphQL query and mutation
- GraphQL @16.3 - For parsing response from GraphQL server
- Lodash @4.17 - For utility functions like debounce, escapeRegExp, etc.
- Typescript @4.5 - For type checking

## CI/CD:- Build and Deployment done using GitHub Actions and Github Pages
