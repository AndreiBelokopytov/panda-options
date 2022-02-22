import React, { memo } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

type Props = {
  handleAmount?: (val: number) => void;
  value: number;
};

export const AmountField = memo(({ handleAmount, value }: Props) => {
  return (
    <InputGroup mt={5}>
      <InputLeftAddon children="XTZ" />
      <Input id="amount" placeholder="Amount" size="md" onChange={handleAmount} value={value} />
    </InputGroup>
  );
});
