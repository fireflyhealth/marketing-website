import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Props, AnnouncementBanner } from './';

const AnnouncementBannerExample: FC<Props> = ({ announcementBanner }) => {
  return <AnnouncementBanner announcementBanner={announcementBanner} />;
};

const meta = {
  title: 'Components/Announcement Banner',
  component: AnnouncementBannerExample,
} satisfies Meta<typeof AnnouncementBannerExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    announcementBanner: {
      _type: 'announcementBanner',
      body: 'This is announcement bar text.',
    },
  },
};

export default meta;
