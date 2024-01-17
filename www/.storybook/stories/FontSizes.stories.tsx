import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

const Example = ({ className }: { className: string }) => (
  <>
    <div className="font-size--9 font-mono text-grey-darker">.{className}</div>
    <span className={`${className} whitespace-nowrap`}>
      Healthcare on your own terms
    </span>
  </>
);

const FontSizes = () => {
  return (
    <div
      className="grid p-6 grid-gap-4 grid-cols-2 font-trust items-baseline"
      style={{ gridTemplateColumns: '140px 1fr' }}
    >
      <Example className="font-size--1" />
      <Example className="font-size--2" />
      <Example className="font-size--3" />
      <Example className="font-size--4" />
      <Example className="font-size--5" />
      <Example className="font-size--6" />
      <Example className="font-size--7" />
      <Example className="font-size--8" />
      <Example className="font-size--9" />
      <Example className="font-size--10" />
    </div>
  );
};

const meta = {
  title: 'Atoms/Font Sizes',
  component: FontSizes,
} satisfies Meta<typeof FontSizes>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export default meta;
