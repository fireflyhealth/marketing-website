import { Meta, StoryObj } from '@storybook/react';
import { practitionersBlockExample } from '@/mockData';
import { ImageTextOverlapBlock } from './';

const meta = {
  title: 'Content Blocks/Image Text Overlap Block',
  component: ImageTextOverlapBlock,
} satisfies Meta<typeof ImageTextOverlapBlock>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imageTextOverlapBlock: {},
  },
  decorators: [
    (Story) => (
      <div className="theme-bg-color">
        <Story />
      </div>
    ),
  ],
};

export default meta;
