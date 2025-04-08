import React from "react";
import CoinList from "../composants/organisms/CoinList";
import { useTranslation } from "react-i18next";

const MarketPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("Cryptocurrency_market")}</h1>
      <CoinList />
    </main>
  );
};

export default MarketPage;
