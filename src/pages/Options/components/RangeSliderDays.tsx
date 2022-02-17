import { Box } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/react";
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/slider";
import React, { memo } from "react";

type Props = {
  handleChange(val: number[]): void;
  value?: number[];
};

export const RangeSliderDays = memo(({ handleChange, value }: Props) => {
  return (
    <Box mt={5}>
      <FormLabel>Expiration</FormLabel>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[1]}
        min={1}
        max={30}
        step={1}
        onChange={handleChange}
        mt={2}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
      </RangeSlider>
      {value}
    </Box>
  );
});
