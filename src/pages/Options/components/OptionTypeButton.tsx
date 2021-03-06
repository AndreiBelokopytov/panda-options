import React, { useCallback } from "react";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Center } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/react";
import { OptionType } from "../options.types";

type Props = {
  value: OptionType;
  onClick: (value: OptionType) => void;
};
export const OptionTypeButton = ({ onClick, value }: Props) => {
  const handleClick = useCallback(
    (value: OptionType) => {
      onClick(value);
    },
    [onClick]
  );

  return (
    <Box mt={5}>
      <FormLabel>Options type</FormLabel>
      <Center>
        <ButtonGroup variant="solid" spacing="6" colorScheme="purple" mt={2}>
          <Button width="140px" isActive={value === OptionType.CALL} onClick={() => handleClick(OptionType.CALL)}>
            CALL
          </Button>
          <Button width="140px" isActive={value === OptionType.PUT} onClick={() => handleClick(OptionType.PUT)}>
            PUT
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
};
