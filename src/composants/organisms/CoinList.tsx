import React, { useEffect, useState } from "react";
import { Coin } from "../../types/coin";
import { getMarketCoins, searchCoins } from "../../services/Coingecko";
import SearchInput from "../atoms/SearchInput";
import CoinRow from "../molecules/CoinLigne";
import { useTranslation } from "react-i18next";

const CoinList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const fetchCoins = async () => {
    try {
      setLoading(true);

      if (search.trim().length > 1) {
        
        const results = await searchCoins(search.trim());
        setCoins(results);
      } else {
        //Liste paginée
        const data = await getMarketCoins(page);
        setCoins(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [page, search]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Rechercher une cryptomonnaie..."
      />

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div className="table-responsive mt-4">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("name")}</th>
                  <th>{t("price")}</th>
                  <th>{t("change_24h")}</th>
                  <th>{t("market_cap")}</th>
                </tr>
              </thead>
              <tbody>
                {coins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Aucun résultat trouvé.
                    </td>
                  </tr>
                ) : (
                  coins.map((coin, index) => (
                    <CoinRow
                      key={coin.id}
                      coin={coin}
                      index={search ? index : index + (page - 1) * 10}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination uniquement si pas en recherche */}
          {!search && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className="btn btn-outline-primary"
              >
                ⬅ {t("prev")}
              </button>
              <span>Page {page}</span>
              <button
                onClick={handleNext}
                className="btn btn-outline-primary"
              >
                {t("next")} ➡
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoinList;
