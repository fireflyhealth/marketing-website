import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { KeyedArray, NavGroupType } from '@/types/sanity';
import { mockData } from '@/mockData';
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
    navGroup: mockData.navigationExample
      .navGroup as unknown as KeyedArray<NavGroupType>,
  },
};

export default meta;
