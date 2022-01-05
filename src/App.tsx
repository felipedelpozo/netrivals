import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "@netrivals/components/Layout";
import Home from "@netrivals/pages/Home";
import MarketPosition from "@netrivals/pages/MarketPosition";
import MyProducts from "@netrivals/pages/MyProducts";
import PricesFormulas from "@netrivals/pages/PricesFormulas";
import Settings from "@netrivals/pages/Settings";

const drawerWidth = 240;

const App = (): JSX.Element => (
  <Layout drawerWidth={drawerWidth}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/market-position" element={<MarketPosition />} />
      <Route path="/my-products" element={<MyProducts />} />
      <Route path="/prices-formulas" element={<PricesFormulas />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Layout>
);

export default App;
