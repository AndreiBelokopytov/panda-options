import React, { memo } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

//any??
type Props = {
  handleOptionType: (event: any) => void;
  value: number | string;
};

export const AmountField = memo(({ handleOptionType, value }: Props) => {
  return (
    <>
      <InputGroup mt={5}>
        <InputLeftAddon children="XTZ" />
        <Input id="amount" placeholder="Amount" size="md" value={value} onChange={handleOptionType} />
      </InputGroup>
    </>
  );
});
