import { useCallback } from "react";

type Props = {
  address?: string;
  connect?: () => void;
};

export const WalletButton = ({ address, connect }: Props) => {
  const handleClick = useCallback(() => connect?.(), [connect]);

  return address ? (
    <span>{address}</span>
  ) : (
    <button type="button" onClick={handleClick}>
      Connect
    </button>
  );
};
