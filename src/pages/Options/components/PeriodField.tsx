import { Box } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/react";
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/slider";
import React from "react";

type Props = {
  handleChange(val: number[]): void;
  value: number[];
};

export const PeriodField = ({ handleChange, value }: Props) => {
  return (
    <Box mt={5}>
      <FormLabel>Period</FormLabel>
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
      {value[0] === 1 ? `${value[0]} day` : `${value[0]} days`}
    </Box>
  );
};
