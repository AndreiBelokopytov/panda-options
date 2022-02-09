import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Wallet } from "./hooks";

ReactDOM.render(
  <ChakraProvider>
    <Wallet.Provider>
      <App />
    </Wallet.Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
