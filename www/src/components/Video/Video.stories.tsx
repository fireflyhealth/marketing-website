import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Video as VideoType } from '@/types/sanity';
import { videoExample } from '@/mockData';
import { Video } from './';

type Props = {
  video: VideoType;
};

const VideoExample: FC<Props> = ({ video }) => {
  return <Video video={video} width="md:w-3/5" />;
};

const meta = {
  title: 'Components/Video',
  component: VideoExample,
} satisfies Meta<typeof VideoExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    video: videoExample,
  },
};

export default meta;
