import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './';

const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'What is the role of a Medical Doctor (MD)?',
    children: (
      <p>
        At Firefly, we believe that many heads are better than one. Instead of
        one doctor, we give you an entire care team: a trusted physician, nurse
        practitioner, health guide, and behavioral health specialist—all working
        together to help you feel your very best. Your Firefly team supports you
        over time, making sure you get the best care science has to offer for
        staying healthy and achieving your goals.
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div className="theme-bg-color p-4 rounded-xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;
