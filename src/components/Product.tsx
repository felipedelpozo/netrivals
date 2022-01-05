import React, { memo, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { e, evaluate } from "mathjs";
import { useDocument } from "react-query-firestore";

import Price from "@netrivals/components/Price";
import FormulaModel from "@netrivals/models/formula";
import ProductModel from "@netrivals/models/product";

import EquationSelector from "./EquationSelector";

const Product = ({ productId }: { productId: string }): JSX.Element => {
  const { data, update, deleteDocument } = useDocument<ProductModel>(
    `products/${productId}`
  );
  const [equation, setEquation] = useState<FormulaModel | null>(
    data?.equation || null
  );

  useEffect(() => {
    if (equation && !!equation?.value) {
      update({
        salePrice: evaluate(equation.value, { p: data?.regularPrice || 0 }),
        equation: { name: equation.name, value: equation.value },
      });
    }
  }, [data?.regularPrice, equation, update]);

  if (!data) {
    return <></>;
  }

  return (
    <Card sx={{ display: "flex", alignItems: "center", my: 1 }}>
      <CardMedia
        component="img"
        sx={{ flex: 1, p: 1 }}
        image={data?.thumbnailImage}
        alt={data?.name}
      />
      <Box sx={{ flex: 8, width: "100%", height: "100%" }}>
        <CardContent>
          <Box sx={{ pb: 3 }}>
            <Typography variant="h6" color="text.primary">
              {data?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pr: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Price value={data?.regularPrice} />
            </Box>
            <Box sx={{ mx: 2, width: "100%" }}>
              <EquationSelector
                currentValue={data?.equation || null}
                onChange={(event, newValue) => setEquation(newValue || null)}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                textAlign: "right",
                alignContent: "end",
              }}
            >
              <Price
                value={data?.salePrice || data?.regularPrice}
                checkValue={data?.regularPrice}
              />
            </Box>
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
      </Box>
    </Card>
  );
};

export default memo(Product);
