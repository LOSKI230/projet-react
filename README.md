# 🪙 CryptoMarket Viewer

Une application React + TypeScript qui permet d'explorer les cryptomonnaies en temps réel via l'API [CoinGecko](https://www.coingecko.com/).

---

## Objectif du projet
Ce projet a été réalisé dans un cadre pédagogique avec pour objectif :
- D’appliquer les principes de développement moderne en React
- De pratiquer l'architecture Atomic Design
- D'assurer l'internationalisation (i18n)
- De structurer une application avec TypeScript strict


## Fonctionnalités

- Liste paginée des cryptos
- Recherche par nom
- Détails de chaque cryptomonnaie
- Interface multilingue (Français 🇫🇷 / Anglais 🇬🇧)
- Architecture modulaire avec Atomic Design
- Navigation avec React Router
- Données typées en TypeScript
- Rendu sans erreurs console / sans `any`

---

## Technologies

- React + Vite
- TypeScript (Strict Mode)
- React Router DOM
- react-i18next
- Bootstrap
- CoinGecko Public API

---

##  Répartition du travail (3 personnes)

### LO Mouhamadou
- Page : `MarketPage`
- Organisme : `CoinList`
- Composants associés : `CoinLigne`, `SearchInput`

### Himmid Brahim
- Page : `CoinDetailsPage`
- Organisme : `Navbar`
- Service API : `Coingecko.tsx`

### DIAO Mouhamadou
- Mise en place de l’architecture i18n (`react-i18next`)
- Configuration du routing (`React Router`)
- Setup général + typage global (`types/coin.tsx`)

## ℹ Limite technique

L'API CoinGecko ne fournit pas les descriptions en plusieurs langues (ex. : français), ce qui empêche de traduire les commentaires/descriptions dans la page de détails d'une crypto.  
L'application bascule bien l'interface FR/EN, mais le contenu des données reste en anglais (limitation API).

## Installation

```bash
# Cloner le projet
git clone https://github.com/LOSKI230/projet-react.git
cd projet-react

# Installer les dépendances
npm install

# Lancer le projet en développement
npm run dev
