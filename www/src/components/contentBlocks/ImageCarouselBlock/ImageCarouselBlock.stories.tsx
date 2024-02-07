import { Meta, StoryObj } from '@storybook/react';
import { imageCarouselBlockExample } from '@/mockData';
import { ImageCarouselBlock } from './';

const meta = {
  title: 'Content Blocks/Image Carousel Block',
  component: ImageCarouselBlock,
  parameters: {
    controls: {
      exclude: ['imageCarouselBlock'],
    },
  },
} satisfies Meta<typeof ImageCarouselBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageCarouselBlock: imageCarouselBlockExample,
    vwHeightSetting: 45,
    vwHeightEnabled: false,
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
