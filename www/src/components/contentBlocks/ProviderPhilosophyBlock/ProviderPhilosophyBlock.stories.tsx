import { Meta, StoryObj } from '@storybook/react';
import { providerPhilosophyBlockExample } from '@/mockData';
import { ProviderPhilosophyBlock } from './';

const meta = {
  title: 'Content Blocks/Provider Philosophy Block',
  component: ProviderPhilosophyBlock,
} satisfies Meta<typeof ProviderPhilosophyBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    providerPhilosophyBlock: providerPhilosophyBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="-m-[25px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
