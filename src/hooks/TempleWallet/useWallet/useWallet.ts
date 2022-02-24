import { useCallback, useEffect, useRef, useState } from "react";
import { createContainer } from "unstated-next";

import { DAppClient, NetworkType, AccountInfo, BeaconEvent } from "@airgap/beacon-sdk";

type InitialState = {
  appName: string;
  network: NetworkType;
};

type State = {
  accountInfo?: AccountInfo;
  isInitialized: boolean;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

let dAppClient: DAppClient | undefined;

const useWallet = (
  initialState: InitialState = { appName: "DApp", network: NetworkType.HANGZHOUNET }
): [state: State, dAppClient: DAppClient] => {
  const initClient = () => new DAppClient({ name: initialState.appName, preferredNetwork: initialState.network });
  const client = useRef<DAppClient>(dAppClient ?? initClient());
  if (!dAppClient) {
    dAppClient = client.current;
  }
  const [isInitialized, setInitialized] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>(undefined);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    (async () => {
      let activeAccount;

      try {
        activeAccount = await client.current.getActiveAccount();
      } catch (e) {
        console.error(e);
      }

      setAccountInfo(activeAccount);
      setInitialized(true);
      setConnected(!!activeAccount);
    })();

    client.current.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, (data) => setConnected(!!data));
  }, [initialState.appName, initialState.network]);

  const connect = useCallback(async () => {
    try {
      setAccountInfo(
        (await client.current.requestPermissions({ network: { type: initialState.network } })).accountInfo
      );
    } catch (e) {
      console.error(e);
    }
  }, [initialState.network]);

  const disconnect = useCallback(async () => {
    try {
      await client.current.clearActiveAccount();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return [
    {
      accountInfo,
      isInitialized,
      isConnected,
      connect,
      disconnect,
    },
    client.current,
  ];
};

export const Wallet = createContainer(useWallet);
