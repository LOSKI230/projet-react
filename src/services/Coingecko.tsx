import axios from "axios";
import { Coin, CoinDetail,SearchedCoin } from "../types/coin";

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getMarketCoins = async (
  page: number,
  perPage = 10,
  currency = "eur",
  locale = "fr"
): Promise<Coin[]> => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    headers: {
      "x-cg-demo-api-key": "CG-TehMbGkPV51EGRu4oGRG41yG",
    },
    params: {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: perPage,
      page,
      sparkline: false,
      locale,
    },
  });

  return response.data;
};

export const getCoinDetails = async (id: string): Promise<CoinDetail> => {
  const response = await axios.get(`${BASE_URL}/coins/${id}`);
  return response.data;
};


export const searchCoins = async (query: string): Promise<Coin[]> => {
  // 1. Appel de l’API de recherche
  const response = await axios.get(`${BASE_URL}/search`, {
    headers: {
      "x-cg-demo-api-key": "CG-TehMbGkPV51EGRu4oGRG41yG",
    },
    params: { query },
  });

  const results: SearchedCoin[] = response.data.coins;

  const ids = results.map((coin) => coin.id).slice(0, 10); // max 10 résultats
  // 2. Appel de /coins/markets pour les vraies données
  if (ids.length === 0) return [];

  const marketResponse = await axios.get(`${BASE_URL}/coins/markets`, {
    headers: {
      "x-cg-demo-api-key": "CG-TehMbGkPV51EGRu4oGRG41yG",
    },
    params: {
      vs_currency: "eur",
      ids: ids.join(","),
      order: "market_cap_desc",
      sparkline: false,
      locale: "fr",
    },
  });

  return marketResponse.data as Coin[];
};

