import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

const Example = ({ className }: { className: string }) => (
  <>
    <div className="font-size--9 font-mono text-theme-secondary">
      .{className}
    </div>
    <span className={`${className} whitespace-nowrap text-theme-primary`}>
      Healthcare on your own terms
    </span>
  </>
);

const FontSizes = () => {
  return (
    <div
      className="bg-theme rounded grid grid-gap-4 grid-cols-2 font-trust items-baseline overflow-x-scroll"
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
