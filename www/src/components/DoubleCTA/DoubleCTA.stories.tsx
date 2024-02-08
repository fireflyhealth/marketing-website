import { Meta, StoryObj } from '@storybook/react';
import { doubleCtaBlock } from '@/mockData';
import { DoubleCTA } from '.';

const meta = {
  title: 'Component Blocks/Double CTA',
  component: DoubleCTA,
  parameters: {
    controls: { exclude: ['navigation'] },
  },
} satisfies Meta<typeof DoubleCTA>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    doubleCta: doubleCtaBlock,
  },
};

export default meta;
