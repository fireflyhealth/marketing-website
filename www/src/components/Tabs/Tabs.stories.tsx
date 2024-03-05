import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/atoms/Button';
import { Tabs } from '.';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Primary: Story = {
  args: {
    tabs: [
      {
        _key: 'tabOne',
        label: 'Tab One',
        children: (
          <div>
            <p>Tab one content</p>
            <p>
              Hello, welcome to tabs. You can navigate through them with your
              keyboard by:
            </p>
            <ul>
              <li>
                Tabbing to focus on the tab label and pressing Space or Enter
              </li>
              <li>
                While focused on a tab label, use the Left Arrow, Right Arrow,
                Home or End keys to switch the active tab
              </li>
            </ul>

            <Button
              width="auto"
              align="center"
              id="tab-1"
              onClick={noop}
              label="Tab To Me"
            />
          </div>
        ),
      },
      {
        _key: 'tabTwo',
        label: 'Tab Two',
        children: (
          <div>
            <p>Tab two content</p>
            <Button
              width="auto"
              align="center"
              id="tab-2"
              onClick={noop}
              label="Tab To Me"
            />
          </div>
        ),
      },
      {
        _key: 'tabThree',
        label: 'Tab Three',
        children: (
          <div>
            <p>Tab three content</p>
            <Button
              width="auto"
              align="center"
              id="tab-3"
              onClick={noop}
              label="Tab To Me"
            />
          </div>
        ),
      },
      {
        _key: 'tabFour',
        label: 'Tab Four',
        children: (
          <div>
            <p>Tab four content</p>
            <Button
              width="auto"
              align="center"
              id="tab-4"
              onClick={noop}
              label="Tab To Me"
            />
          </div>
        ),
      },
      {
        _key: 'tabFive',
        label: 'Tab Five',
        children: (
          <div>
            <p>Tab five content</p>
            <Button
              width="auto"
              align="center"
              id="tab-5"
              onClick={noop}
              label="Tab To Me"
            />
          </div>
        ),
      },
      {
        _key: 'tabSix',
        label: 'Tab Six',
        children: (
          <div>
            <p>Tab six content</p>
            <Button
              width="auto"
              align="center"
              id="tab-6"
              onClick={noop}
              label="Tab To Me"
            />
          </div>
        ),
      },
    ],
  },
};

export default meta;
