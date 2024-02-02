import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Video as VideoType } from '@/types/sanity';
import { videoExample } from '@/mockData';
import { Video } from './';

type Props = {
  video: VideoType;
};

const meta = {
  title: 'Components/Video',
  component: Video,
} satisfies Meta<typeof Video>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    video: videoExample,
    width: 'md:w-3/5',
  },
};

export default meta;
