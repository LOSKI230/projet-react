export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
  }
  
  export interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    description: {
        [key: string]: string; 
      
    };
    image: {
      large: string;
    };
    market_data: {
      current_price: {
        eur: number;
      };
      market_cap: {
        eur: number;
      };
      price_change_percentage_24h: number;
    };
  }

  export interface SearchedCoin {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
  }
  
  