import React, { memo, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { evaluate } from "mathjs";
import { useDocument } from "react-query-firestore";

import Price from "@netrivals/components/Price";
import ProductModel from "@netrivals/models/product";

import EquationSelector from "./EquationSelector";

const Product = ({ productId }: { productId: string }): JSX.Element => {
  const { data, update } = useDocument<ProductModel>(`products/${productId}`);
  const [equation, setEquation] = useState<string | null>(
    data?.equation?.value || null
  );

  useEffect(() => {
    if (equation) {
      update({
        salePrice: evaluate(equation, { p: data?.regularPrice || 0 }),
      });
    }
  }, [data?.regularPrice, equation, update]);

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
                onChange={(event, newValue) =>
                  setEquation(newValue?.value || null)
                }
                // onClose={() => setShowSelect(false)}
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
      </Box>
    </Card>
  );
};

export default memo(Product);
