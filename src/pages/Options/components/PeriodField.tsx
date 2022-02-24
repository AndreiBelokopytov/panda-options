import { Box } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/react";
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/slider";
import React, { useCallback } from "react";

type Props = {
  onChange: (val: number) => void;
  value: number;
};

export const PeriodField = ({ onChange, value }: Props) => {
  const handleChange = useCallback((value: number[]) => onChange(value[0]), [onChange]);

  return (
    <Box mt={5}>
      <FormLabel>Period</FormLabel>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[value]}
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
      {value === 1 ? `${value} day` : `${value} days`}
    </Box>
  );
};
