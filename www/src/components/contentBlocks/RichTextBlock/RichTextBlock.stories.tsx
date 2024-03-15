import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { richTextBlockExamples } from '@/mockData';
import { RichTextBlock as RichTextBlockType, KeyedArray } from '@/types/sanity';
import { RichTextBlock } from './';

type ExampleProps = {
  blocks: KeyedArray<RichTextBlockType>;
};

const Example: FC<ExampleProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block) => (
        <div className="pb-4" key={block._key}>
          <RichTextBlock richTextBlock={block} />
        </div>
      ))}
    </>
  );
};

const meta = {
  title: 'Content Blocks/RichText Block',
  component: Example,
} satisfies Meta<typeof Example>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    blocks: richTextBlockExamples,
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
