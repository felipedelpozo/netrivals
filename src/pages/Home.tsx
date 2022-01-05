import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";

import PageTitle from "@netrivals/components/PageTitle";

const HomePage = (): JSX.Element => {
  return (
    <>
      <PageTitle>Home</PageTitle>
      <ReactMarkdown># Home</ReactMarkdown>
    </>
  );
};

export default HomePage;
