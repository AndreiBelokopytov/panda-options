import { useCallback, useEffect, useRef, useState } from "react";
import { createContainer } from "unstated-next";

import { DAppClient, NetworkType, AccountInfo, BeaconEvent } from "@airgap/beacon-sdk";

type InitialState = {
  appName: string;
  network: NetworkType;
};

const useWallet = (
  initialState: InitialState = { appName: "DApp", network: NetworkType.HANGZHOUNET }
): [
  state: {
    accountInfo?: AccountInfo;
    isInitialized: boolean;
    isConnected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
  },
  dAppClient: DAppClient | undefined
] => {
  const dAppClient = useRef<DAppClient>();
  const [isInitialized, setInitialized] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>(undefined);
  const [isConnected, setConnected] = useState(false);

  const disconnect = useCallback(async () => {
    await dAppClient.current?.clearActiveAccount();
  }, []);

  useEffect(() => {
    (async () => {
      if (dAppClient.current) {
        await disconnect();
      }
      dAppClient.current = new DAppClient({ name: initialState.appName, preferredNetwork: initialState.network });
      let activeAccount;

      try {
        activeAccount = await dAppClient.current.getActiveAccount();
      } catch (e) {
        console.error(e);
      }

      setAccountInfo(activeAccount);
      setInitialized(true);
      if (activeAccount) {
        setConnected(true);
      }
    })();
  }, [initialState.appName, initialState.network, disconnect]);

  const connect = useCallback(async () => {
    if (dAppClient.current) {
      try {
        setAccountInfo(
          (await dAppClient.current.requestPermissions({ network: { type: initialState.network } })).accountInfo
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [initialState.network]);

  dAppClient.current
    ?.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, (data) => {
      setConnected(!!data);
    })
    .then();

  return [
    {
      accountInfo,
      isInitialized,
      isConnected,
      connect,
      disconnect,
    },
    dAppClient.current,
  ];
};

export const Wallet = createContainer(useWallet);
