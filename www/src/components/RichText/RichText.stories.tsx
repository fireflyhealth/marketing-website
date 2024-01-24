import { Meta, StoryObj } from '@storybook/react';
import { PortableTextBlock } from '@portabletext/types';

import { mockData } from '@/mockData';
import { RichText } from './';

const meta = {
  title: 'Components/RichText',
  component: RichText,
  parameters: {
    controls: { exclude: ['content', 'className'] },
  },
} satisfies Meta<typeof RichText>;

type Story = StoryObj<typeof meta>;

export const SimpleRichText: Story = {
  args: { content: mockData.simpleRichText as unknown as PortableTextBlock[] },
  decorators: (Story: React.ComponentType) => (
    <div className="p-4 bg-theme">
      <Story />
    </div>
  ),
};
export const ArticleRichText: Story = {
  args: {
    content: mockData.articleRichText as unknown as PortableTextBlock[],
    className: 'max-w-[800px] mx-auto',
  },
  decorators: (Story: React.ComponentType) => (
    <div className="p-4 bg-theme">
      <Story />
    </div>
  ),
};

export default meta;
