import { FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StrikePriceData } from "~/hooks";

type Props = {
  data?: StrikePriceData;
};

export const StrikePriceField = React.memo(({ data }: Props) => {
  const [costPrice, setCostPrice] = useState(0);

  useEffect(() => {
    setCostPrice(Number(data?.amount) * 0.1);
  }, [data?.amount]);

  return (
    <Stack mt={5}>
      <FormLabel htmlFor="strikePrice">Strike Price</FormLabel>
      <InputGroup>
        <InputLeftAddon children="XTZ/USD" />
        <Input id="strikePrice" value={data?.amount} isReadOnly={true} />
        <InputRightAddon children="$" />
      </InputGroup>
      <FormLabel htmlFor="costPrice">Cost Price</FormLabel>
      <InputGroup>
        <Input id="costPrice" value={costPrice} isReadOnly={true} />
        <InputRightAddon children="$" />
      </InputGroup>
    </Stack>
  );
});
