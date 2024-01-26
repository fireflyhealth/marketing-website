import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { KeyedArray, NavGroupType } from '@/types/sanity';
import { navigationExample } from '@/mockData';
import { Navigation } from './';

type Props = {
  navGroup: KeyedArray<NavGroupType>;
};

const NavigationExample: FC<Props> = ({ navGroup }) => {
  return <Navigation navGroup={navGroup} />;
};

const meta = {
  title: 'Components/Navigation',
  component: NavigationExample,
} satisfies Meta<typeof NavigationExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    navGroup: navigationExample,
  },
};

export default meta;
