import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Props, AnnouncementBanner } from './';

const AnnouncementBannerExample: FC<Props> = ({ announcementBanner }) => {
  return <AnnouncementBanner announcementBanner={announcementBanner} />;
};

const meta = {
  title: 'Components/Announcement Banner',
  component: AnnouncementBannerExample,
  parameters: {
    controls: {
      exclude: ['announcementBanner'],
    },
  },
} satisfies Meta<typeof AnnouncementBannerExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    announcementBanner: {
      _type: 'announcementBanner',
      text: [
        {
          _key: '23125f958b5d',
          _type: 'block',
          children: [
            {
              _key: 'bc2d87eb3df8',
              _type: 'span',
              marks: ['strong'],
              text: 'Global',
            },
            {
              _key: '0645102d1737',
              _type: 'span',
              marks: [],
              text: ' ',
            },
            {
              _key: '12eea6b65f44',
              _type: 'span',
              marks: ['em'],
              text: 'announcement',
            },
            {
              _key: '6dba8a713d14',
              _type: 'span',
              marks: [],
              text: ' ',
            },
            {
              _key: 'a9c0ffa96e39',
              _type: 'span',
              marks: ['underline'],
              text: 'banner',
            },
            {
              _key: 'd6a597d43b22',
              _type: 'span',
              marks: [],
              text: ' ',
            },
            {
              _key: 'afb2017a2dd4',
              _type: 'span',
              marks: ['166646bd34b8'],
              text: 'text',
            },
            {
              _key: '91b07cc2c8c2',
              _type: 'span',
              marks: [],
              text: ' here',
            },
          ],
          markDefs: [
            {
              _key: '166646bd34b8',
              _type: 'link',
              link: {
                _type: 'link',
                externalUrl: 'https://www.google.com',
              },
            },
          ],
          style: 'normal',
        },
      ],
    },
  },
};

export default meta;
