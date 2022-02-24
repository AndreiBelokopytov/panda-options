import React, { useEffect, useState } from "react";
import { FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack } from "@chakra-ui/react";
import { CoinbasePriceData } from "~/api/coinbaseApi.types";

type Props = {
  data?: CoinbasePriceData;
};

export const StrikePriceField = React.memo(({ data }: Props) => {
  const [optionCost, setOptionCost] = useState(0);

  useEffect(() => {
    setOptionCost(Number(data?.amount) * 0.1);
  }, [data?.amount]);

  return (
    <Stack mt={5}>
      <FormLabel htmlFor="strikePrice">Strike Price</FormLabel>
      <InputGroup>
        <InputLeftAddon children="XTZ/USD" />
        <Input id="strikePrice" value={data?.amount} isReadOnly={true} />
        <InputRightAddon children="$" />
      </InputGroup>
      <FormLabel htmlFor="optionCost">Option Cost</FormLabel>
      <InputGroup>
        <Input id="optionCost" value={optionCost.toFixed(2)} isReadOnly={true} />
        <InputRightAddon children="$" />
      </InputGroup>
    </Stack>
  );
});
