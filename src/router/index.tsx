import React from "react";
import { Routes, Route } from "react-router-dom";
import MarketPage from "../pages/MarketPage";
import CoinDetailPage from "../pages/CoinDetailsPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketPage />} />
      <Route path="/coin/:id" element={<CoinDetailPage />} />
    </Routes>
  );
};

export default AppRouter;
