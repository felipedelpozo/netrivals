import React from "react";

import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteCollection } from "react-query-firestore";

import PageTitle from "@netrivals/components/PageTitle";
import Product from "@netrivals/components/Product";
import FormulasModel from "@netrivals/models/formula";

const PricesFormulasPage = (): JSX.Element => {
  const { data, error, fetchNextPage, hasNextPage } =
    useInfiniteCollection<FormulasModel>("formulas", {}, { limit: 10 });

  if (error) {
    return <Alert severity="error">Error {error?.message}</Alert>;
  }

  if (!data) {
    return <LinearProgress />;
  }

  if (!data.length) {
    return <Alert severity="warning">No Formulas</Alert>;
  }

  return (
    <>
      <PageTitle>Prices formulas</PageTitle>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<LinearProgress sx={{ my: 4 }} />}
      >
        {data?.map(({ id }) => (
          <>{id && <Product key={`product-${id}`} productId={id} />}</>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default PricesFormulasPage;
