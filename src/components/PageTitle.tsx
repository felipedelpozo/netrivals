import React from "react";

import Typography from "@mui/material/Typography";

type PageTitleProps = {
  children: React.ReactElement | string;
};

const PageTitle = ({ children }: PageTitleProps): JSX.Element => (
  <Typography variant="h4" gutterBottom component="div">
    {children}
  </Typography>
);

export default PageTitle;
