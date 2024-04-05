import { Meta, StoryObj } from '@storybook/react';
import { nearbyBlockExample } from '@/mockData';
import { NearbyBlock } from '.';

const meta = {
  title: 'Content Blocks/Nearby Block',
  component: NearbyBlock,
} satisfies Meta<typeof NearbyBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    nearbyBlock: nearbyBlockExample,
  },
};

export default meta;
