import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { columnsBlockExamples } from '@/mockData';
import { ColumnsBlock as ColumnsBlockType, KeyedArray } from '@/types/sanity';
import { ColumnsBlock } from './';

type ExampleProps = {
  blocks: KeyedArray<ColumnsBlockType>;
};

const Example: FC<ExampleProps> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block) => (
        <div className="pb-4" key={block._key}>
          <ColumnsBlock columnsBlock={block} />
        </div>
      ))}
    </>
  );
};

const meta = {
  title: 'Content Blocks/Columns Block',
  component: Example,
} satisfies Meta<typeof Example>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    blocks: columnsBlockExamples,
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
