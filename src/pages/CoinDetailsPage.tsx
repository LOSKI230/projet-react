import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../services/Coingecko";
import { CoinDetail } from "../types/coin";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const CoinDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {t,i18n} = useTranslation();



  useEffect(() => {
    if (id) {
      getCoinDetails(id)
        .then((data) => setCoin(data))
        .catch((err) => console.error("Erreur chargement détail", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!coin) return <p>Coin introuvable.</p>;
  console.log("Langue active :", i18n.language);
console.log("Description disponible :", coin.description);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{coin.name} ({coin.symbol.toUpperCase()})</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img src={coin.image.large} alt={coin.name} className="w-32 h-32" />

        <div className="space-y-2">
          <p dangerouslySetInnerHTML={{ __html: coin.description[i18n.language]  || coin.description.en }} />

          <p><strong>💰 {t("Prix_actuel")} :</strong> {coin.market_data.current_price.eur} €</p>
          <p><strong>📈 {t("market_cap")} :</strong> {coin.market_data.market_cap.eur.toLocaleString()} €</p>
          <p>
            <strong>📊 {t("change_24h")} :</strong>{" "}
            <span className={coin.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
        </div >
        <div className="d-flex mb-3">
    <button onClick={() => navigate("/")} className="btn btn-danger">{t("back")}</button>
        </div>
      </div>
    </main>
  );
};

export default CoinDetailPage;
