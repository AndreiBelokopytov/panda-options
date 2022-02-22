import React, { useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import { AmountField, OptionTypeButton, PeriodField, StrikePriceField } from ".";
import { OptionType } from "./options.types";
import { useCoinbasePrice } from "~/hooks";

export const BuyOptionPage = () => {
  const [period, setPeriod] = useState([1]);
  const [optionType, setOptionType] = useState(OptionType.CALL);
  const [amount, setAmount] = useState<number>(1);

  const handleChange = (val: number[]) => setPeriod(val);

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <FormControl w={300}>
      <OptionTypeButton value={optionType} />
      <AmountField handleAmount={handleAmount} value={amount} />
      <PeriodField handleChange={handleChange} value={period} />
      <StrikePriceField data={useCoinbasePrice().data} />
      <Button mt={4} type="submit">
        Buy Option
      </Button>
    </FormControl>
  );
};
