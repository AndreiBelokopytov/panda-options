import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React, { useCallback } from "react";
import { Wallet } from "~/hooks";

export const WalletButton = () => {
  const [{ isInitialized, permissions, connect }] = Wallet.useContainer();
  const handleClick = useCallback(() => connect?.(), [connect]);

  if (!isInitialized) {
    return null;
  }

  return (
    <Box my={5}>
      {permissions?.pkh ? <Button>{permissions?.pkh}</Button> : <Button onClick={handleClick}>Connect</Button>}
    </Box>
  );
};
