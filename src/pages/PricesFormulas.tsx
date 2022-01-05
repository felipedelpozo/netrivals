import React, { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteCollection } from "react-query-firestore";

import AddEquation from "@netrivals/components/AddEquation";
import Formula from "@netrivals/components/Formula";
import PageTitle from "@netrivals/components/PageTitle";
import FormulaModel from "@netrivals/models/formula";

const PricesFormulasPage = (): JSX.Element => {
  const [open, toggleOpen] = useState(false);

  const { data, add, error, fetchNextPage, hasNextPage } =
    useInfiniteCollection<FormulaModel>("formulas", {}, { limit: 10 });

  if (error) {
    return <Alert severity="error">Error {error?.message}</Alert>;
  }

  if (!data) {
    return <LinearProgress />;
  }

  if (!data.length) {
    return <Alert severity="warning">No Formulas</Alert>;
  }

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleSubmit = (value: FormulaModel) => {
    add(value);
  };

  return (
    <>
      <PageTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Box sx={{ mr: 3 }}>Prices formulas</Box>
          <Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => toggleOpen(true)}
            >
              Add
            </Button>
          </Box>
        </Box>
      </PageTitle>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<LinearProgress sx={{ my: 4 }} />}
      >
        {data?.map(({ id }) => (
          <>{id && <Formula key={`formula-${id}`} formulaId={id} />}</>
        ))}
      </InfiniteScroll>
      <AddEquation
        open={open}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </>
  );
};

export default PricesFormulasPage;
