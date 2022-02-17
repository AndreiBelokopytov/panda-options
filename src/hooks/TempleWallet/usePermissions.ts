import { TempleDAppPermission, TempleWallet } from "@temple-wallet/dapp";
import { useState, useEffect, useCallback } from "react";

export const usePermissions = () => {
  const [state, setState] = useState<{
    permissions: TempleDAppPermission;
    isInitialized?: boolean;
  }>({
    permissions: null,
    isInitialized: false,
  });

  const setPermissions = useCallback((permissions: TempleDAppPermission) => {
    setState({
      permissions,
      isInitialized: true,
    });
  }, []);

  useEffect(() => {
    let unsubscribe: () => void | undefined;
    (async function () {
      try {
        const _permissions = await TempleWallet.getCurrentPermission();
        setPermissions(_permissions);
      } catch (err) {
        console.log(err);
      } finally {
        unsubscribe = TempleWallet.onPermissionChange(setPermissions);
      }
    })();

    return () => unsubscribe?.();
  }, [setPermissions]);

  return state;
};
