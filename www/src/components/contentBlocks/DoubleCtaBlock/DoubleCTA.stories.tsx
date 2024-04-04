import { Meta, StoryObj } from '@storybook/react';
import { doubleCtaBlock } from '@/mockData';
import { DoubleCtaBlock } from '.';

const meta = {
  title: 'Content Blocks/2-up Big CTA Block',
  component: DoubleCtaBlock,
} satisfies Meta<typeof DoubleCtaBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    doubleCtaBlock: doubleCtaBlock,
  },
};

export default meta;
