import { styled, TextField } from "@mui/material";

const TextFieldDotted = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px dotted",
    },
    "&:hover fieldset": {
      border: "1px solid",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid",
    },
  },
});

export default TextFieldDotted;
