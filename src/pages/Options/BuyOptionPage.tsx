import React, { useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import { AmountField, OptionTypeButton, PeriodField, StrikePriceField } from ".";
import { OptionType } from "./options.types";
import { useCoinbasePrice } from "~/hooks";

export const BuyOptionPage = () => {
  const [period, setPeriod] = useState(1);
  const [optionType, setOptionType] = useState<OptionType>(OptionType.CALL);
  const [amount, setAmount] = useState<number | undefined>();

  return (
    <FormControl w={300}>
      <OptionTypeButton onClick={setOptionType} value={optionType} />
      <AmountField onChange={setAmount} />
      <PeriodField onChange={setPeriod} value={period} />
      <StrikePriceField data={useCoinbasePrice().data} />
      <Button mt={4} type="submit">
        Buy Option
      </Button>
    </FormControl>
  );
};
