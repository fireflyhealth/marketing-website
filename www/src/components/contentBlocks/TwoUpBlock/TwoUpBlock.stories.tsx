import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { twoUpBlockExamples } from '@/mockData';
import { TwoUpBlock as TwoUpBlockType } from '@/types/sanity';
import { TwoUpBlock } from './index';

type ExampleProps = {
  blocks: TwoUpBlockType[];
};

const Example: FC<ExampleProps> = ({ blocks }) => (
  <>
    {blocks.map((block, index) => (
      <TwoUpBlock key={index} twoUpBlock={block} />
    ))}
  </>
);

const meta = {
  title: 'Content Blocks/2-up Content Blocks',
  component: Example,
} satisfies Meta<typeof Example>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    blocks: twoUpBlockExamples,
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
