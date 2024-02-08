import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ctaCardsBlockExample } from '@/mockData';
import { CTACardsBlock } from './';

type Props = {
  itemCount: number;
};

const CTACardsBlockExample: FC<Props> = ({ itemCount }) => {
  const exampleWithModifiedCount = {
    ...ctaCardsBlockExample,
    ctaCards: [
      ...ctaCardsBlockExample.ctaCards,
      ...ctaCardsBlockExample.ctaCards,
      ...ctaCardsBlockExample.ctaCards,
    ].slice(0, itemCount),
  };
  return <CTACardsBlock ctaCardsBlock={exampleWithModifiedCount} />;
};

const meta = {
  title: 'Content Blocks/CTA Cards Block',
  component: CTACardsBlockExample,
  parameters: {
    controls: {
      itemCount: { type: 'number', min: 1, max: 9 },
    },
  },
} satisfies Meta<typeof CTACardsBlockExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    itemCount: 3,
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
