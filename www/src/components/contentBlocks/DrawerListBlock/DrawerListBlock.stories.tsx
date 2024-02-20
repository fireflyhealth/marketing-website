import { Meta, StoryObj } from '@storybook/react';
import { drawerListBlockExample } from '@/mockData';
import { DrawerListBlock } from '.';

const meta = {
  title: 'Content Blocks/Drawer List Block',
  component: DrawerListBlock,
} satisfies Meta<typeof DrawerListBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    drawerListBlock: drawerListBlockExample,
  },
};

export default meta;
