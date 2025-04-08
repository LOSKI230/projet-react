import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-inner">
        <Link className="navbar-title" to="/">
          🪙 <span>{t("title")}</span>
        </Link>

        <div className="language-switch">
          <button
            onClick={() => changeLanguage("fr")}
            className={`btn btn-sm btn-outline-primary me-2 ${
              i18n.language === "fr" ? "active" : ""
            }`}
          >
            FR
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`btn btn-sm btn-outline-primary ${
              i18n.language === "en" ? "active" : ""
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
