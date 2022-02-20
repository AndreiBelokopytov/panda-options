import { useState } from "react";
import { AccountInfo, DAppClient } from "@airgap/beacon-sdk";

export const useCheckAccount = (dAppClient: DAppClient) => {
  const [state, setState] = useState<{
    accountInfo?: AccountInfo;
    isInitialized: boolean;
  }>({
    accountInfo: undefined,
    isInitialized: false,
  });

  (async () => {
    if (!state.isInitialized) {
      const accountInfo = await dAppClient.getActiveAccount();

      setState({
        accountInfo,
        isInitialized: true,
      });
    }
  })();

  return state;
};
