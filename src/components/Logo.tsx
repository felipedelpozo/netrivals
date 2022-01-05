import React from "react";

import Box from "@mui/material/Box";

import Logo from "@netrivals/assets/images/logo.png";

type LogoContainerProps = {
  height?: number;
};

const LogoContainer = ({ height = 38 }: LogoContainerProps): JSX.Element => (
  <Box
    component="img"
    sx={{
      height,
    }}
    alt="NetRivals"
    src={Logo}
  />
);

export default LogoContainer;
