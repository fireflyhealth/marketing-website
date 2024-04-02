import { Meta, StoryObj } from '@storybook/react';
import dynamic from 'next/dynamic';
import { videoExample } from '@/mockData';

const Video = dynamic(() => import('@/components/Video'), {
  ssr: false,
});

const meta = {
  title: 'Components/Video',
  component: Video,
} satisfies Meta<typeof Video>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    video: videoExample,
    posterSizes: ['57vw', '90vw', '66vw'],
    width: 'md:w-3/5',
  },
};

export default meta;
