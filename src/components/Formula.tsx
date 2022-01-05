import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDocument } from "react-query-firestore";

import FormulaModel from "@netrivals/models/formula";

type FormulaProps = {
  formulaId: string;
};

const Formula = ({ formulaId }: FormulaProps): JSX.Element => {
  const { data, deleteDocument } = useDocument<FormulaModel>(
    `formulas/${formulaId}`
  );

  if (!data) {
    return <></>;
  }

  return (
    <Card sx={{ my: 1 }}>
      <CardContent>
        <Box>
          <Typography variant="h6" color="text.secondary">
            {data?.name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">{data?.value}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={deleteDocument}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default Formula;
