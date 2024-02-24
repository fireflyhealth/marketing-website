import { Meta, StoryObj } from '@storybook/react';
import { tabsBlockExample } from '@/mockData';
import { TabsBlock } from '.';

const meta = {
  title: 'Content Blocks/Tabs Block',
  component: TabsBlock,
} satisfies Meta<typeof TabsBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabsBlock: tabsBlockExample,
  },
};

export default meta;
