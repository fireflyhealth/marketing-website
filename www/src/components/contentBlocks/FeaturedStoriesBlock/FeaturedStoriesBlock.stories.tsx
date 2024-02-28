import { Meta, StoryObj } from '@storybook/react';
import { featuredStoriesBlockExample } from '@/mockData';
import { FeaturedStoriesBlock } from '.';

const meta = {
  title: 'Content Blocks/Featured Stories Block',
  component: FeaturedStoriesBlock,
} satisfies Meta<typeof FeaturedStoriesBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    featuredStoriesBlock: featuredStoriesBlockExample,
  },
};

export default meta;
