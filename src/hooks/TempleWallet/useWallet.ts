import { useCheckAccount } from "./useAvailabilityCheck";
import { useCallback, useState } from "react";
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
  const dAppClient = new DAppClient({ name: initialState.appName, preferredNetwork: initialState.network });
  const accountInfoCheck = useCheckAccount(dAppClient);
  const [permissions, setPermissions] = useState<PermissionResponseOutput | undefined>(undefined);
  const [connected, setConnected] = useState(false);
  const connect = useCallback(async () => {
    if (accountInfoCheck.isInitialized) {
      if (!accountInfoCheck.accountInfo) {
        setPermissions(await dAppClient.requestPermissions({ network: { type: initialState.network } }));
      }
    }
  }, [accountInfoCheck.isInitialized, accountInfoCheck.accountInfo]);
  const disconnect = useCallback(async () => {
    await dAppClient.clearActiveAccount();
  }, []);

  dAppClient
    .subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, (data) => {
      if (!data) {
        setConnected(false);
      } else {
        setConnected(true);
      }
    })
    .then();

  return [
    {
      accountInfo: permissions?.accountInfo || accountInfoCheck.accountInfo || undefined,
      isInitialized: accountInfoCheck.isInitialized,
      isConnected: connected,
      connect,
      disconnect,
    },
    dAppClient,
  ];
};

export const Wallet = createContainer(useWallet);
