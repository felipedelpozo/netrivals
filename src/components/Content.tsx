import React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

type LogoContainerProps = {
  drawerWidth?: number;
  children: React.ReactNode;
};

const Content = ({
  drawerWidth = 240,
  children,
}: LogoContainerProps): JSX.Element => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
    }}
  >
    <Toolbar />
    {children}
  </Box>
);

export default Content;
