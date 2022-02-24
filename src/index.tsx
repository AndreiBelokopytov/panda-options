import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { Wallet } from "./hooks";

const queryClient = new QueryClient();

ReactDOM.render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Wallet.Provider>
        <App />
      </Wallet.Provider>
    </QueryClientProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
