import { WalletButton } from "./components";
import { useWallet } from "./hooks";

export const App = () => {
  const [{ isInitialized, permissions, connect }] = useWallet("MyDapp", "hangzhounet");

  if (!isInitialized) {
    return null;
  }

  return (
    <main>
      <WalletButton connect={connect} address={permissions?.pkh} />
    </main>
  );
};
