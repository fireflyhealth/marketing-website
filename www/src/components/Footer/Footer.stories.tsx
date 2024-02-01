import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Footer as FooterType } from '@/types/sanity';
import { footerExample } from '@/mockData';
import { Footer } from './';

type Props = {
  footer: FooterType;
};

const FooterExample: FC<Props> = ({ footer }) => {
  return <Footer footer={footer} />;
};

const meta = {
  title: 'Components/Footer',
  component: FooterExample,
  parameters: {
    controls: { exclude: ['footer'] },
  },
} satisfies Meta<typeof FooterExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    footer: footerExample,
  },
};

export default meta;
