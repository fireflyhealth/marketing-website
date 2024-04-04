import { Meta, StoryObj } from '@storybook/react';
import { videoBlockExample } from '@/mockData';
import { VideoBlock } from './';

const meta = {
  title: 'Content Blocks/Video Block',
  component: VideoBlock,
} satisfies Meta<typeof VideoBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    videoBlock: videoBlockExample,
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
