import React, { FC } from 'react';
import { Flex, Card, Text, Box, CardTone } from '@sanity/ui';

type InfoBoxProps = {
  children: React.ReactNode;
  icon?: React.ComponentType;
  tone?: CardTone;
};

export const InfoBox: FC<InfoBoxProps> = (props) => {
  const Icon = props.icon || null;
  return (
    <Card marginY={2} padding={3} border tone={props.tone || 'primary'}>
      <Flex align="center">
        {Icon ? (
          <Text size={2}>
            <Icon />
          </Text>
        ) : null}
        <Box marginLeft={3}>
          <Text size={2}>{props.children}</Text>
        </Box>
      </Flex>
    </Card>
  );
};
