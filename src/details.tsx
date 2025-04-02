import React from "react";

interface CoinDetails {
  symbol: string;
  name: string;
  block_time_in_minutes: number;
  description: { en: string };
  image: { large: string };
}

interface ModalProps {
  coin: CoinDetails | null;
  onClose: () => void;
}

const CoinModal: React.FC<ModalProps> = ({ coin, onClose }) => {
  if (!coin) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{coin.name} ({coin.symbol.toUpperCase()})</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <img src={coin.image.large} alt={coin.name} className="img-fluid mb-3" />
            <p><strong>Block time:</strong> {coin.block_time_in_minutes} min</p>
            <p><strong>Description:</strong> {coin.description.en.substring(0, 150)}...</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinModal;
