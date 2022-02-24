import React, { ChangeEvent, memo, useCallback, useState } from "react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

type Props = {
  onChange?: (val?: number) => void;
};

export const AmountField = memo(({ onChange }: Props) => {
  const [amount, setAmount] = useState<number | undefined>();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      isNaN(value) ? setAmount(undefined) : setAmount(value);
      onChange?.(value === 0 ? undefined : value);
    },
    [onChange]
  );

  const handlePressKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const isLeadingZero = amount === undefined && key === "0";
    const re = /[\d.]/;
    if (!re.test(key) || isLeadingZero) {
      event.preventDefault();
    }
  };

  return (
    <InputGroup mt={5}>
      <InputLeftAddon children="XTZ" />
      <Input id="amount" placeholder="Amount" size="md" onChange={handleChange} onKeyPress={handlePressKey} />
    </InputGroup>
  );
});
