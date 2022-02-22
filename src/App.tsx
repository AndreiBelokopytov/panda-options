import { WalletButton } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <WalletButton />
    </ChakraProvider>
  );
};
