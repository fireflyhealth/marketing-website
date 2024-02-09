import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NavigationExample } from '@/types/sanity';
import { navigationExample } from '@/mockData';
import { Navigation } from './';

type Props = {
  navigation: NavigationExample;
};

const NavigationExample: FC<Props> = ({ navigation }) => {
  return (
    <Navigation
      navigation={navigation.globalNav}
      showNavCTA
      globalDoubleNav={navigation.doubleCta}
    />
  );
};

const meta = {
  title: 'Components/Navigation',
  component: NavigationExample,
  parameters: {
    controls: { exclude: ['navigation'] },
  },
} satisfies Meta<typeof NavigationExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    navigation: navigationExample,
  },
};

export default meta;
