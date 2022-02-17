import React, { useCallback, useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Center, Container } from "@chakra-ui/layout";
import { useStrikePrice } from "~/hooks";
import { Button } from "@chakra-ui/button";
import { AmountField, OptionsType, RangeSliderDays, StrikePriceField } from ".";

export const OptionsContainer = () => {
  const [rangeValue, setRangeValue] = useState([1]);
  const [optionType, setOptionType] = useState<number | string>("");

  const handleChange = useCallback((val: number[]) => setRangeValue(val), []);

  //any??
  const handleOptionType = useCallback((event) => {
    event.target.value >= 1 || event.target.value === " "
      ? setOptionType(event.target.value)
      : setOptionType("Invalid value");
  }, []);

  const dataStrikePrice = useStrikePrice();

  const strikePrice = useCallback(() => dataStrikePrice, [dataStrikePrice]);

  return (
    <Container maxW="container.md">
      <Center>
        <FormControl w={300}>
          <OptionsType />
          <AmountField handleOptionType={handleOptionType} value={optionType} />
          <RangeSliderDays handleChange={handleChange} value={rangeValue} />
          {/* data?? */}
          <StrikePriceField data={strikePrice().data} />
          <Button mt={4} type="submit">
            Submit
          </Button>
        </FormControl>
      </Center>
    </Container>
  );
};
