import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { ReactQueryFirestoreProvider } from "react-query-firestore";
import { BrowserRouter as Router } from "react-router-dom";

import { db } from "@netrivals/services/firebase";
import theme from "@netrivals/styles/theme";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const reactQueryConfig = {
  queries: {
    retry: false,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryFirestoreProvider
      firestore={db}
      reactQueryConfig={reactQueryConfig}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReactQueryFirestoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
