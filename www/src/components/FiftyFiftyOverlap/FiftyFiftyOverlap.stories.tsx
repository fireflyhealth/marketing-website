import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Props as FiftyFiftyOverlapProps, FiftyFiftyOverlap } from '.';

const FiftyFiftyOverlapExample: FC<FiftyFiftyOverlapProps> = ({
  fiftyFiftyOverlap,
}) => {
  return <FiftyFiftyOverlap fiftyFiftyOverlap={fiftyFiftyOverlap} />;
};

const meta = {
  title: 'Components/50-50 Overlap',
  component: FiftyFiftyOverlapExample,
  argTypes: {
    fiftyFiftyOverlap: {
      heading: {
        componentTitle: {
          control: { type: 'string' },
        },
      },
    },
  },
} satisfies Meta<typeof FiftyFiftyOverlapExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fiftyFiftyOverlap: {
      heading: {
        componentTitle: 'Our Story',
        componentDescription: 'This is a test.',
      },
    },
  },
};

export default meta;
