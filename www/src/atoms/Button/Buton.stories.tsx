import { Meta, StoryObj } from '@storybook/react';
import { Button } from './';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    controls: { exclude: ['onClick'] },
    docs: {
      controls: { exclude: ['onClick'] },
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const handleClick = () => alert('button clicked');

export const Primary: Story = {
  args: { label: 'Get Started', disabled: false, onClick: handleClick },
};

export default meta;
