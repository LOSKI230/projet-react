import React from "react";
import "./SearchInput.css";
import { useTranslation } from "react-i18next";


type RechercheInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
const SearchInput: React.FC<RechercheInputProps> = ({ value, onChange}) => {
  const { t } = useTranslation();
    return (
      <div className="search-bar mb-3">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("search_placeholder")}
          className="form-control search-input"
        />
      </div>
    );
  };
  

export default SearchInput;
