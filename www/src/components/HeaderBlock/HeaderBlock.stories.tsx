import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import * as SanityTypes from '@/types/sanity';
import { HeaderBlock } from '.';

// TODO: add CTA after component is created

const HeaderBlockExample: FC<SanityTypes.HeaderBlock> = ({
  title,
  description,
  cta,
}) => {
  return <HeaderBlock title={title} description={description} cta={cta} />;
};

const meta = {
  title: 'Content Blocks/Header Block',
  component: HeaderBlockExample,
} satisfies Meta<typeof HeaderBlockExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Our Values',
    description: 'This is a test',
  },
};

export default meta;
