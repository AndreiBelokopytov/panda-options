import { AxiosError, AxiosPromise } from "axios";
import { StrikePrice } from "~/hooks";
import { DefaultError } from ".";
import { instance } from "./api";

export const strikePriceApi = {
  async getStrikePrice(): Promise<AxiosPromise<StrikePrice> | DefaultError> {
    try {
      const response = await instance.get("/spot?currency=USD");
      return response.data.data;
    } catch (e) {
      const error = e as AxiosError;

      return {
        error: error,
        status: error.response?.status,
      };
    }
  },
};
