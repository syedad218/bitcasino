import styled from "@emotion/styled";

export const CoinContainer = styled.div`
  margin-top: 0.5em;
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
  margin-left: 24px;
  color: #ffffff;
  line-height: 1.6;
  div:first-of-type {
    font-size: 16px;
  }
  div:last-of-type {
    font-size: 14px;
    opacity: 0.5;
  }
`;

export const RemoveCoin = styled.div`
  cursor: pointer;
  margin-left: auto;
  border-radius: 50%;
  padding: 5px;
  > svg {
    display: block;
    height: 18px;
    width: 18px;
    fill: rgba(255, 255, 255, 0.5);
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
