import React from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ArticleIcon from "@mui/icons-material/Article";
import FunctionsIcon from "@mui/icons-material/Functions";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";

import DrawerItem from "@netrivals/components/DrawerItem";

type DrawerContainerProps = {
  drawerWidth?: number;
};

const DrawerContainer = ({
  drawerWidth = 240,
}: DrawerContainerProps): JSX.Element => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    location.pathname === "/my-products" && setOpen(!open);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="products settings"
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <DrawerItem
              onClick={handleClick}
              text="My Products"
              to="/my-products"
              icon={<ArticleIcon />}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </DrawerItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <DrawerItem
                  text="Prices formulas"
                  to="/prices-formulas"
                  icon={<FunctionsIcon />}
                />
              </List>
            </Collapse>
            <DrawerItem
              text="Market position"
              to="/market-position"
              icon={<StoreIcon />}
            />
            <DrawerItem
              text="Settings"
              to="/settings"
              icon={<SettingsIcon />}
            />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default DrawerContainer;
