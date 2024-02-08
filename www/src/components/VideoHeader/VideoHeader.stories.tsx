import { Meta, StoryObj } from '@storybook/react';
import { videoHeaderExample } from '@/mockData';
import { VideoHeader } from './';

const meta = {
  title: 'Header Blocks/Video Header',
  component: VideoHeader,
} satisfies Meta<typeof VideoHeader>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    videoHeader: videoHeaderExample,
  },
};

export default meta;
