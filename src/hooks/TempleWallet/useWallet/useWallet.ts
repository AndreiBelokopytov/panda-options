import { checkActiveAccount } from "./checkActiveAccount";
import { useCallback, useEffect, useRef, useState } from "react";
import { createContainer } from "unstated-next";

import { DAppClient, NetworkType, PermissionResponseOutput, AccountInfo, BeaconEvent } from "@airgap/beacon-sdk";

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
  const dAppClient = useRef<DAppClient | undefined>(undefined);
  const [activeAccountChecked, setActiveAccountChecked] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>(undefined);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    (async () => {
      if (dAppClient.current) {
        await disconnect();
      }
      dAppClient.current = new DAppClient({ name: initialState.appName, preferredNetwork: initialState.network });
      const activeAccount = await checkActiveAccount(dAppClient.current);
      setAccountInfo(activeAccount);
      setActiveAccountChecked(true);
      if (activeAccount) {
        setConnected(true);
      }
    })();
  }, [initialState.appName, initialState.network]);

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

  const disconnect = useCallback(async () => {
    await dAppClient.current?.clearActiveAccount();
  }, []);

  dAppClient.current
    ?.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, (data) => {
      setConnected(!!data);
    })
    .then();

  return [
    {
      accountInfo: accountInfo,
      isInitialized: activeAccountChecked,
      isConnected: connected,
      connect,
      disconnect,
    },
    dAppClient.current,
  ];
};

export const Wallet = createContainer(useWallet);
