import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BrandedIcon } from '../../svgs/BrandedIcon';

import { Carousel, Slide, SlideContainer, PrevButton, NextButton } from '.';

const CarouselExample: FC = () => {
  return (
    <Carousel slideCount={6}>
      <SlideContainer>
        <Slide slideIndex={0}>
          <div className="h-full aspect-square bg-sky"></div>
        </Slide>
        <Slide slideIndex={1}>
          <div className="h-full aspect-[4/3] bg-midnight" />
        </Slide>
        <Slide slideIndex={2}>
          <div className="h-full aspect-[2/3] bg-sienna" />
        </Slide>
        <Slide slideIndex={3}>
          <div className="h-full aspect-square bg-grey" />
        </Slide>
        <Slide slideIndex={4}>
          <div className="h-full aspect-[4/3] bg-[pink]" />
        </Slide>
        <Slide slideIndex={5}>
          <div className="h-full aspect-[2/3] bg-midnight-light" />
        </Slide>
      </SlideContainer>
      <PrevButton>
        <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
      </PrevButton>
      <NextButton>
        <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
      </NextButton>
    </Carousel>
  );
};

const meta = {
  title: 'Components/Carousel',
  component: CarouselExample,
} satisfies Meta<typeof CarouselExample>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export default meta;
