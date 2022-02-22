import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Box, Center } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/react";
import { OptionType } from "../options.types";

type Props = {
  value: OptionType;
  onClick?: (value: OptionType) => OptionType;
};
export const OptionTypeButton = ({ onClick, value }: Props) => {
  return (
    <Box mt={5}>
      <FormLabel>Options type</FormLabel>
      <Center>
        <ButtonGroup variant="solid" spacing="6" colorScheme="purple" mt={2}>
          <Button width="140px">CALL</Button>
          <Button width="140px">PUT</Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
};
