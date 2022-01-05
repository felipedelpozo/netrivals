import React, { useRef } from "react";

import { Typography } from "@mui/material";
import NumberFormat from "react-number-format";

type CurrencyProps = {
  value?: number;
  checkValue?: number;
};

const Currency = ({ value, checkValue }: CurrencyProps): JSX.Element => {
  const color = useRef(
    !!checkValue && !!value
      ? checkValue < value
        ? "success.main"
        : "error.main"
      : "text.secondary"
  ).current;

  return (
    <Typography variant="h3" color={color}>
      <NumberFormat
        value={value}
        displayType={"text"}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        suffix={"€"}
      />
    </Typography>
  );
};

export default Currency;
