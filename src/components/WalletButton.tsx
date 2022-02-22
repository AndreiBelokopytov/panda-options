import { Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Wallet } from "~/hooks";

export const WalletButton = () => {
  const [{ isInitialized, accountInfo, connect, disconnect, isConnected }] = Wallet.useContainer();
  const handleClick = useCallback(() => connect?.(), [connect]);
  const handleDisconnectClick = useCallback(() => disconnect?.(), [disconnect]);

  if (!isInitialized) {
    return null;
  }

  return isConnected ? (
    <Button onClick={handleDisconnectClick}>{accountInfo?.address}</Button>
  ) : (
    <Button onClick={handleClick}>Connect</Button>
  );
};
