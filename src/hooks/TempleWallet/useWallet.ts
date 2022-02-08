import { TempleWallet, TempleDAppNetwork, TempleDAppPermission } from "@temple-wallet/dapp";
import { usePermissions } from "./usePermissions";
import { useAvailabilityCheck } from "./useAvailabilityCheck";
import { useCallback, useRef } from "react";
import { createContainer } from "unstated-next";

const useWallet = (
  initialstate = { appName: "DApp", network: "hangzhounet" as TempleDAppNetwork }
): [
  state: {
    permissions: TempleDAppPermission;
    isInitialized?: boolean;
    connect: () => Promise<void>;
  },
  wallet: TempleWallet | undefined
] => {
  const permissionsState = usePermissions();
  const availabilityState = useAvailabilityCheck();

  const wallet = useRef<TempleWallet | undefined>(undefined);

  const connect = useCallback(async () => {
    if (availabilityState.isInitialized && availabilityState.isAvailable) {
      if (!wallet.current) {
        wallet.current = new TempleWallet(initialstate.appName, permissionsState.permissions);
        return wallet.current.connect(initialstate.network);
      }
      return wallet.current.connect(initialstate.network);
    }
  }, [
    wallet,
    availabilityState.isInitialized,
    availabilityState.isAvailable,
    permissionsState.permissions,
    permissionsState.isInitialized,
  ]);
  return [
    {
      permissions: permissionsState.permissions,
      isInitialized: availabilityState.isInitialized && permissionsState.isInitialized,
      connect,
    },
    wallet.current,
  ];
};
export const Wallet = createContainer(useWallet);
