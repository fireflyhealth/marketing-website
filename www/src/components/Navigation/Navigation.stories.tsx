import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Navigation as NavigationType } from '@/types/sanity';
import { navigationExample } from '@/mockData';
import { Navigation } from './';

type Props = {
  navigation: NavigationType;
};

const NavigationExample: FC<Props> = ({ navigation }) => {
  return <Navigation navigation={navigation} showNavCTA />;
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
