import { Button } from "@chakra-ui/button";
import React, { useCallback } from "react";
import { Wallet } from "~/hooks";

export const WalletButton = () => {
  const [{ isInitialized, permissions, connect }] = Wallet.useContainer();
  const handleClick = useCallback(() => connect?.(), [connect]);

  if (!isInitialized) {
    return null;
  }

  return permissions?.pkh ? <Button>{permissions?.pkh}</Button> : <Button onClick={handleClick}>Connect</Button>;
};
