import { Meta, StoryObj } from '@storybook/react';
import { smallImageCarouselBlockExample } from '@/mockData';
import { SmallImageCarouselBlock } from './';

const meta = {
  title: 'Content Blocks/Small Image Carousel Block',
  component: SmallImageCarouselBlock,
} satisfies Meta<typeof SmallImageCarouselBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    smallImageCarouselBlock: smallImageCarouselBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="-m-[25px] bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
