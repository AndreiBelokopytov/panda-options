import { useQuery } from "react-query";
import { coinbasePriceApi } from "~/api";

const REFETCH_INTERVAL = 3000;

export const useCoinbasePrice = () => {
  return useQuery("coinbasePrice", coinbasePriceApi.getSpotPrice, {
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
  });
};
