import { Meta, StoryObj } from '@storybook/react';
import { simpleTextHeaderExample } from '@/mockData';
import { SimpleTextHeader } from '.';

const meta = {
  title: 'Header Blocks/Simple Text Header',
  component: SimpleTextHeader,
} satisfies Meta<typeof SimpleTextHeader>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    simpleTextHeader: simpleTextHeaderExample,
  },
  decorators: [
    (Story) => (
      <div className="z-10 relative">
        <Story />
      </div>
    ),
  ],
};

export default meta;
