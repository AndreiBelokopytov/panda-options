import { instance } from "./api";
import { CoinbasePrice } from "./coinbaseApi.types";

export const coinbasePriceApi = {
  async getSpotPrice() {
    try {
      const response = await instance.get<CoinbasePrice>("/spot?currency=USD");

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  },
};
