import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinModal from "./details";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
}

interface CoinDetails {
  symbol: string;
  name: string;
  block_time_in_minutes: number;
  description: { en: string };
  image: { large: string };
}

const CryptoList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
            },
          }
        );
        setCoins(response.data);
      } catch {
        setError("Échec de récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const fetchCoinDetails = async (id: string) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setSelectedCoin(response.data);
    } catch {
      setError("Échec de récupération des détails.");
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="container-fluid mt-4 w-100">
      <h1 className="text-center text-primary mb-4">Cryptos en tendance</h1>

      {loading && <div className="text-center"><div className="spinner-border text-primary"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive w-100">
          <table className="table table-striped table-hover shadow w-100">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Logo</th>
                <th>Nom</th>
                <th>Symbole</th>
                <th>Prix (USD)</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => (
                <tr key={coin.id} onClick={() => fetchCoinDetails(coin.id)} style={{ cursor: "pointer" }}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>
                    <img src={coin.image} alt={coin.name} width={35} height={35} />
                  </td>
                  <td>{coin.name}</td>
                  <td className="text-uppercase">{coin.symbol}</td>
                  <td className="text-success fw-bold">${coin.current_price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loadingDetails && <div className="text-center mt-3"><div className="spinner-border text-primary"></div></div>}

      {/* Affichage du modal si une crypto est sélectionnée */}
      {selectedCoin && <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />}
    </div>
  );
};

export default CryptoList;
