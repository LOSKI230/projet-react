import React, { useEffect, useState } from "react";
import { Coin } from "../../types/coin";
import { getMarketCoins, searchCoins } from "../../services/Coingecko";
import SearchInput from "../atoms/SearchInput";
import CoinRow from "../molecules/CoinLigne";
import { useTranslation } from "react-i18next";

const CoinList: React.FC = () => {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [displayedCoins, setDisplayedCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const coinsPerPage = 10;

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const data = await getMarketCoins(1, 250); // on récupère tout une seule fois
      setAllCoins(data);
      setDisplayedCoins(data.slice(0, coinsPerPage));
    } catch (error) {
      console.error("Erreur lors du chargement des coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (search.trim().length > 1) {
      const filtered = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedCoins(filtered);
    } else {
      const start = (page - 1) * coinsPerPage;
      const end = start + coinsPerPage;
      setDisplayedCoins(allCoins.slice(start, end));
    }
  }, [search, page, allCoins]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    const maxPage = Math.ceil(allCoins.length / coinsPerPage);
    if (page < maxPage) setPage((prev) => prev + 1);
  };

  return (
    <div className="container">
      <SearchInput
        value={search}
        onChange={(val) => {
          setSearch(val);
          setPage(1); // reset page on search
        }}
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
                {displayedCoins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Aucun résultat trouvé.
                    </td>
                  </tr>
                ) : (
                  displayedCoins.map((coin, index) => (
                    <CoinRow
                      key={coin.id}
                      coin={coin}
                      index={search ? index : index + (page - 1) * coinsPerPage}
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
                disabled={page >= Math.ceil(allCoins.length / coinsPerPage)}
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
