import { Meta, StoryObj } from '@storybook/react';
import { quoteBlock } from '@/mockData';
import { QuoteBlock } from '.';

const meta = {
  title: 'Content Blocks/Quote Block',
  component: QuoteBlock,
} satisfies Meta<typeof QuoteBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    quoteBlock: quoteBlock,
  },
};

export default meta;
