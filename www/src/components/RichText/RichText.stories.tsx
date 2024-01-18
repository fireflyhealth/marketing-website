import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { articleRichText, simpleRichText } from '@/mockData/richText';
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
};
export const ArticleRichText: Story = {
  args: { content: articleRichText, className: 'max-w-[800px] mx-auto' },
};

export default meta;
