import { Container } from "@chakra-ui/layout";
import React from "react";
import { BuyOptionPage, WalletButton } from "./pages";

export const App = () => {
  return (
    <Container maxW="container.md" centerContent={true}>
      <WalletButton />
      <BuyOptionPage />
    </Container>
  );
};
