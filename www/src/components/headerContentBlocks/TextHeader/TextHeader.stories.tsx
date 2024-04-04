import { Meta, StoryObj } from '@storybook/react';
import { textHeaderExample } from '@/mockData';
import { TextHeader } from '.';

const meta = {
  title: 'Header Blocks/Text Header',
  component: TextHeader,
} satisfies Meta<typeof TextHeader>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    textHeader: textHeaderExample,
  },
};

export default meta;
