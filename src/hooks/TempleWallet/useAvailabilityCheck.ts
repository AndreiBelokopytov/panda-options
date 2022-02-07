import { TempleWallet } from "@temple-wallet/dapp";
import { useCallback, useEffect, useState } from "react";

export const useAvailabilityCheck = () => {
  const [state, setState] = useState<{
    isAvailable?: boolean;
    isInitialized?: boolean;
  }>({
    isAvailable: undefined,
    isInitialized: false,
  });

  const setAvailable = useCallback((isAvailable: boolean) => {
    setState({
      isAvailable,
      isInitialized: true,
    });
  }, []);

  useEffect(() => {
    let unsubscribe: () => void | undefined;
    (async function () {
      try {
        const isAvailable = await TempleWallet.isAvailable();
        setAvailable(isAvailable);
      } catch (err) {
        console.log(err);
      } finally {
        unsubscribe = TempleWallet.onAvailabilityChange(setAvailable);
      }
    })();
    return () => unsubscribe();
  }, []);

  return state;
};
