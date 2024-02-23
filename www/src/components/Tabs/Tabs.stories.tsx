import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '.';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabs: [
      { _key: 'tabOne', label: 'Tab One', children: <p>Tab one content</p> },
      { _key: 'tabTwo', label: 'Tab Two', children: <p>Tab two content</p> },
      {
        _key: 'tabThree',
        label: 'Tab Three',
        children: <p>Tab three content</p>,
      },
      { _key: 'tabFour', label: 'Tab Four', children: <p>Tab four content</p> },
      { _key: 'tabFive', label: 'Tab Five', children: <p>Tab five content</p> },
      { _key: 'tabSix', label: 'Tab Six', children: <p>Tab six content</p> },
    ],
  },
};

export default meta;
