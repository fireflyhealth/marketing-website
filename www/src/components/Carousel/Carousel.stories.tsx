import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Carousel } from '.';

type CarouselExampleProps = {
  /* Temporary for QA */
  vwHeightSetting?: number;
  vwHeightEnabled?: boolean;
};

const CarouselExample: FC<CarouselExampleProps> = ({
  vwHeightEnabled,
  vwHeightSetting,
}) => {
  return (
    <Carousel
      vwHeightSetting={(vwHeightEnabled && vwHeightSetting) || undefined}
    >
      <div className="h-full aspect-square bg-sky"></div>
      <div className="h-full aspect-[4/3] bg-midnight" />
      <div className="h-full aspect-[2/3] bg-sienna" />
      <div className="h-full aspect-square bg-grey" />
      <div className="h-full aspect-[4/3] bg-[pink]" />
      <div className="h-full aspect-[2/3] bg-midnight-light" />
    </Carousel>
  );
};

const meta = {
  title: 'Components/Carousel',
  component: CarouselExample,
} satisfies Meta<typeof CarouselExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    vwHeightSetting: 45,
    vwHeightEnabled: false,
  },
};

export default meta;
