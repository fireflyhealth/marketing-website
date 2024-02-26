import { Meta, StoryObj } from '@storybook/react';
import { reviewBlockExample } from '@/mockData';
import { ReviewBlock } from './';

const meta = {
  title: 'Content Blocks/Review Block',
  component: ReviewBlock,
} satisfies Meta<typeof ReviewBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    reviewBlock: reviewBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="theme-bg-color">
        <Story />
      </div>
    ),
  ],
};

export default meta;
