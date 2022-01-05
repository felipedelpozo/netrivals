import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

import Logo from "@netrivals/components/Logo";

const AppBarContainer = (): JSX.Element => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Link to="/">
        <Logo />
      </Link>
    </Toolbar>
  </AppBar>
);

export default AppBarContainer;
