import { Meta, StoryObj } from '@storybook/react';
import { sequenceBlockExample } from '@/mockData';
import { SequenceBlock } from './';

const meta = {
  title: 'Content Blocks/Sequence Block',
  component: SequenceBlock,
} satisfies Meta<typeof SequenceBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sequenceBlock: sequenceBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="-m-[25px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
