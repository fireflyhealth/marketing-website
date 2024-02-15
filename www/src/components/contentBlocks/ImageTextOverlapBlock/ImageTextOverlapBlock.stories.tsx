import { Meta, StoryObj } from '@storybook/react';
import { imageTextOverlapBlockExample } from '@/mockData';
import { ImageTextOverlapBlock } from './';

const meta = {
  title: 'Content Blocks/Image Text Overlap Block',
  component: ImageTextOverlapBlock,
} satisfies Meta<typeof ImageTextOverlapBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageTextOverlapBlock: imageTextOverlapBlockExample,
  },
  decorators: [
    (Story) => (
      <div className="theme-bg-color -m-[25px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
