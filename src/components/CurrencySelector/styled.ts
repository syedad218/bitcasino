import styled from "@emotion/styled";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled as MUIStyled } from "@mui/material/styles";

export const cardWithStyles: React.CSSProperties = { width: 370, height: 246 };

export const AddButton = MUIStyled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  borderRadius: "20px",
  height: "38px",
  marginTop: "16px",
  backgroundColor: "#FE4B24",
  "&:hover": {
    backgroundColor: "#FE4B24",
  },
}));

export const InputField = MUIStyled(TextField)<TextFieldProps>({
  ".MuiInputLabel-root": {
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    fontSize: "1rem",
  },
  ".MuiOutlinedInput-input": {
    height: "17px",
  },
});

export const CardContainer = styled.div`
  margin-top: 5rem;
`;

export const TermsText = styled.div`
  font-size: 14px;
  color: grey;
  margin-top: 3rem;
  opacity: 0.8;
`;
