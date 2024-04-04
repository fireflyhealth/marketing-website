import { Meta, StoryObj } from '@storybook/react';
import { textWithDualCtaHeaderExample } from '@/mockData';
import { TextWithDualCtaHeader } from '.';

const meta = {
  title: 'Header Blocks/Text with Dual CTA Header',
  component: TextWithDualCtaHeader,
} satisfies Meta<typeof TextWithDualCtaHeader>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    textWithDualCtaHeader: textWithDualCtaHeaderExample,
  },
};

export default meta;
