export type CoinbasePriceData = {
  base: string;
  currency: string;
  amount: string;
};

export type CoinbasePrice = {
  data: CoinbasePriceData;
};
