import { Meta, StoryObj } from '@storybook/react';
import { imageBlockExample } from '@/mockData';
import { ImageBlock } from './';

const meta = {
  title: 'Content Blocks/Image Block',
  component: ImageBlock,
  // parameters: {
  //   controls: {
  //     exclude: ['imageBlock'],
  //   },
  // },
} satisfies Meta<typeof ImageBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageBlock: imageBlockExample,
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
