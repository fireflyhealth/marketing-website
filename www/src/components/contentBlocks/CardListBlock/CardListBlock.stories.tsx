import { Meta, StoryObj } from '@storybook/react';
import { cardListBlockExample } from '@/mockData';
import { CardListBlock } from './';

const meta = {
  title: 'Content Blocks/Card List Block',
  component: CardListBlock,
} satisfies Meta<typeof CardListBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cardListBlock: cardListBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
