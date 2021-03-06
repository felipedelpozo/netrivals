import React from "react";

import ReactMarkdown from "react-markdown";

import PageTitle from "@netrivals/components/PageTitle";

const markdown = `
  This project has been developed using the following technologies:

  * [React](https://reactjs.org/)
  * [TypesScript](https://www.typescriptlang.org/)
  * [Firebase](https://firebase.google.com/)
  * [React Hooks](https://reactjs.org/docs/hooks-intro.html)
  * [Material UI](https://material-ui.com/)
  * [MathJS](https://mathjs.org/)
  * [React Query Firestore](https://github.com/aminerol/react-query-firestore)
  * [React Infinite Scroll Component](https://www.npmjs.com/package/react-infinite-scroll-component)
  * [React Markdown](https://github.com/remarkjs/react-markdown)
  * [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
`;

const HomePage = (): JSX.Element => {
  return (
    <>
      <PageTitle>Home</PageTitle>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
};

export default HomePage;
