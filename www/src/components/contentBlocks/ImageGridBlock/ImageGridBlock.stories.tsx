import { Meta, StoryObj } from '@storybook/react';
import { imageGridBlockExample } from '@/mockData';
import { ImageGridBlock } from '.';

const meta = {
  title: 'Content Blocks/Image Grid Block',
  component: ImageGridBlock,
} satisfies Meta<typeof ImageGridBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageGridBlock: imageGridBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="-m-[25px] theme-bg-color">
        <Story />
      </div>
    ),
  ],
};

export default meta;
