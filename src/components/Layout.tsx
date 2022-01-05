import React from "react";

import Box from "@mui/material/Box";

import AppBar from "@netrivals/components/AppBar";
import Content from "@netrivals/components/Content";
import Drawer from "@netrivals/components/Drawer";

type LayoutProps = {
  drawerWidth?: number;
  children: React.ReactNode;
};

const Layout = ({ drawerWidth = 240, children }: LayoutProps): JSX.Element => (
  <Box sx={{ display: "flex" }}>
    <AppBar />
    <Drawer drawerWidth={drawerWidth} />
    <Content>{children}</Content>
  </Box>
);

export default Layout;
