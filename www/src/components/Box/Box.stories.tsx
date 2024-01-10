import { Box } from './Box';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    children: {
      options: ['Hello', 'Dogs', 'Devs'],
      mapping: {
        Hello: <p>Hello</p>,
        Dogs: <p>Frank 🐶 Muenster</p>,
        Devs: <p>Bryan, Sohee, Joseph</p>,
      },
    },
  },
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: <p>Hello</p> } };

export default meta;
