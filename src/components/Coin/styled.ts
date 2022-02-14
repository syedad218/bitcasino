import styled from "@emotion/styled";

export const CoinListContainer = styled.div`
  max-width: 350px;
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.1)
    )
    0 1 100%;
`;

export const CoinDetails = styled.div`
  margin-left: 32px;
  color: #ffffff;
  div:first-of-type {
    font-size: 18px;
    font-weight: bold;
  }
  div:last-of-type {
    font-size: 14px;
    opacity: 0.5;
    margin-top: 8px;
  }
`;

export const CloseCoin = styled.div`
  cursor: pointer;
  margin-left: auto;
  > svg {
    display: block;
    height: 16px;
    width: 16px;
    fill: rgba(255, 255, 255, 0.5);
  }
`;
