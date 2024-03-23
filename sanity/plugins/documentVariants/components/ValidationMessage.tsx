import React, { FC } from 'react';
import { WarningOutlineIcon } from '@sanity/icons';
import { Box, Flex, Text } from '@sanity/ui';

type ValidationMessageProps = {
  message: string;
};

export const ValidationMessage: FC<ValidationMessageProps> = ({ message }) => (
  <Box marginY={2}>
    <Flex align="center">
      <WarningOutlineIcon />
      <Box marginLeft={1}>
        <Text size={1}>{message}</Text>
      </Box>
    </Flex>
  </Box>
);
