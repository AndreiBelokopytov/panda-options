import { TempleWallet, TempleDAppNetwork, TempleDAppPermission } from "@temple-wallet/dapp";
import { usePermissions } from "./usePermissions";
import { useAvailabilityCheck } from "./useAvailabilityCheck";
import { useRef } from "react";

export const useWallet = (
  appName: string,
  network: TempleDAppNetwork
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

  const connect = async () => {
    if (availabilityState.isInitialized && availabilityState.isAvailable) {
      if (!wallet.current) {
        wallet.current = new TempleWallet(appName, permissionsState.permissions);
      }
      return wallet.current.connect(network);
    }
  };

  return [
    {
      permissions: permissionsState.permissions,
      isInitialized: availabilityState.isInitialized && permissionsState.isInitialized,
      connect,
    },
    wallet.current,
  ];
};
