import React from "react";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";

type DrawerItemProps = {
  text: string;
  to: string;
  icon: JSX.Element;
  onClick?: () => void;
  children?: JSX.Element;
};

const DrawerItem = ({
  text,
  icon = <InboxIcon />,
  children,
  to,
  ...props
}: DrawerItemProps): JSX.Element => {
  const location = useLocation();

  return (
    <ListItemButton
      key={text}
      component={Link}
      to={to}
      selected={location.pathname === to}
      {...props}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
      {children}
    </ListItemButton>
  );
};

export default DrawerItem;
