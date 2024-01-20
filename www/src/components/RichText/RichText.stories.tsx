import { Meta, StoryObj } from '@storybook/react';

import { articleRichText, simpleRichText } from '@/mockData/richText';
import { ColorTheme, Theme } from '../Theme';
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
  args: { content: simpleRichText },
  decorators: (Story: React.ComponentType) => (
    <div className="p-4 bg-theme">
      <Story />
    </div>
  ),
};
export const ArticleRichText: Story = {
  args: { content: articleRichText, className: 'max-w-[800px] mx-auto' },
  decorators: (Story: React.ComponentType) => (
    <div className="p-4 bg-theme">
      <Story />
    </div>
  ),
};

export default meta;
