import { useQuery } from "react-query";
import { strikePriceApi } from "~/api";

const REFETCH_INTERVAL = 3000;

export const useStrikePrice = () => {
  const data = useQuery("data", strikePriceApi.getStrikePrice, {
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
  });

  return data;
};
