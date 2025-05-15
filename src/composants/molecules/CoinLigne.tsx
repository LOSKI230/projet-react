import React from "react";
import { Coin } from "../../types/coin";
import { useNavigate } from "react-router-dom";

type Props = {
  coin: Coin;
  index: number;
};

const CoinRow: React.FC<Props> = ({ coin, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/coin/${coin.id}`);
  };

  const changeClass =
    coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger";

    return (
      <tr onClick={handleClick} style={{ cursor: "pointer" }}>
        <td>{index + 1}</td>
        <td className="d-flex align-items-center gap-2">
          {coin.image ? (
            <img src={coin.image} alt={coin.name || "Inconnu"} width="24" height="24" />
          ) : (
            <span>📷</span> 
          )}
          <span className="fw-bold">{coin.name || "Inconnu"}</span>
          <span className="text-muted text-uppercase">{coin.symbol || "?"}</span>
        </td>
        <td>{coin.current_price != null ? `${coin.current_price.toLocaleString()} €` : "Inconnu"}</td>
        <td className={changeClass}>
          {coin.price_change_percentage_24h != null
            ? `${coin.price_change_percentage_24h.toFixed(2)} %`
            : "Inconnu"}
        </td>
        <td>{coin.market_cap != null ? `${coin.market_cap.toLocaleString()} €` : "Inconnu"}</td>
      </tr>
    );
  };

export default CoinRow;
