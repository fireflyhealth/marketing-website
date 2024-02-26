import { Meta, StoryObj } from '@storybook/react';
import { faqBlockExample } from '@/mockData';
import { FAQBlock } from '.';

const meta = {
  title: 'Content Blocks/FAQ Block',
  component: FAQBlock,
} satisfies Meta<typeof FAQBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    faqBlock: faqBlockExample,
  },
};

export default meta;
