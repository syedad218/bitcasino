import styled from "@emotion/styled";
import { GridLayout } from "./types";

export const Title = styled.div`
  color: #fff;
  & > h1 {
    font-size: 2.2em;
  }
  & > h3 {
    color: grey;
    font-weight: 500;
  }
`;

export const CoinListWrapper = styled.div`
  max-height: calc(100vh - 375px);
  margin-top: 2rem;
  overflow: auto;
  & > p {
    color: grey;
    font-weight: normal;
    font-size: 1.2em;
    margin-top: 2em;
  }
`;

export const gridLayout: GridLayout = {
  xs: {
    gridTemplateColumns: "1fr",
    gridTemplateAreas: `"left" "right" "center"`,
  },
  sm: {
    gridTemplateColumns: "1fr",
    gridTemplateAreas: `"left" "right" "center"`,
  },
  md: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `"left right" "left center"`,
  },
  lg: {
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `"left center right"`,
  },
  xl: {
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `"left center right"`,
  },
};
