import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RichImage, Image } from '@/types/sanity';
import { mockData } from '@/mockData';
import { SanityImage } from './SanityImage';

const getImage = (label: string): RichImage | Image => {
  const image = mockData.imageExamples.find((i) => i.label === label)?.image;
  if (!image) {
    throw new Error(
      `Image for "${label}" could not be fetched. Check your mock data & query`,
    );
  }
  return image;
};

const noCrop = getImage('Download');
const verticalCrop = getImage('Download - Vertical Crop');
const hotSpot = getImage('Download - upper-right hot spot');

const meta = {
  title: 'Atoms/Image',
  component: SanityImage,
} satisfies Meta<typeof SanityImage>;

type Story = StoryObj<typeof meta>;

export const Sanity_Image: Story = {
  args: {
    image: noCrop,
    sizes: '800px',
    width: 800,
  },
  decorators: [
    (Story) => (
      <div className="bg-theme rounded p-3">
        <p className="font-size-8 mb-4">An image with a no crop settings.</p>
        <Story />
      </div>
    ),
  ],
};

export const Cropped_in_Sanity: Story = {
  args: {
    image: verticalCrop,
    sizes: '400px',
    width: 400,
  },
  decorators: [
    (Story) => (
      <div className="bg-theme rounded p-3">
        <p className="font-size-8 mb-4">
          An image with a vertical crop applied in Sanity.
        </p>
        <Story />
      </div>
    ),
  ],
};

export const Resized: Story = {
  args: {
    image: noCrop,
    sizes: '100vw',
  },
  decorators: [
    () => {
      return (
        <div className="bg-theme rounded p-3">
          <p className="font-size-8 mb-4">
            An image with no crop settings, rendered at different widths.
          </p>
          <div className="flex flex-row items-end">
            <div className="mr-2">
              <SanityImage image={hotSpot} sizes="100px" width={100} />
            </div>
            <div className="mr-2">
              <SanityImage image={hotSpot} sizes="200px" width={200} />
            </div>
            <div className="mr-2">
              <SanityImage image={hotSpot} sizes="400px" width={400} />
            </div>
            <div className="mr-2">
              <SanityImage image={hotSpot} sizes="800px" width={800} />
            </div>
          </div>
        </div>
      );
    },
  ],
};

export const HotSpots: Story = {
  args: {
    image: noCrop,
    sizes: '100vw',
  },
  decorators: [
    () => {
      return (
        <div className="bg-theme rounded p-3">
          <p className="font-size-8 mb-4">
            Images can be sized within app code with either width & height
            values or an aspectRatio prop. If the image has a Hot Spot applied
            in Sanity, the crop will focus on it.
          </p>
          <div className="flex flex-row items-end mb-2">
            <div className="mr-2">
              <SanityImage
                image={hotSpot}
                sizes="300px"
                width={300}
                height={400}
              />
              <p className="font-size-10">300 x 400, with hotSpot</p>
            </div>
            <div className="mr-2">
              <SanityImage
                image={hotSpot}
                sizes="300px"
                width={800}
                height={250}
              />
              <p className="font-size-10">800 x 250, with hotSpot</p>
            </div>
          </div>
          <div className="flex flex-row items-end mb-2">
            <div className="mr-2">
              <SanityImage
                image={noCrop}
                sizes="300px"
                width={300}
                height={400}
              />
              <p className="font-size-10">300 x 400, no hotSpot</p>
            </div>
            <div className="mr-2">
              <SanityImage
                image={noCrop}
                sizes="300px"
                width={800}
                height={250}
              />
              <p className="font-size-10">800 x 250, no hotSpot</p>
            </div>
          </div>

          <div className="flex flex-row items-end mb-2">
            <div className="mr-2 w-[300px]">
              <SanityImage image={hotSpot} sizes="300px" aspectRatio={1.33} />
              <p className="font-size-10">aspectRatio = 1.33, with hotSpot</p>
            </div>
            <div className="mr-2 w-[800px]">
              <SanityImage image={hotSpot} sizes="300px" aspectRatio={0.3} />
              <p className="font-size-10">aspectRatio = 0.3, with hotSpot</p>
            </div>
          </div>

          <div className="flex flex-row items-end mb-2">
            <div className="mr-2 w-[300px]">
              <SanityImage image={noCrop} sizes="300px" aspectRatio={1.33} />
              <p className="font-size-10">aspectRatio = 1.33, no hotSpot</p>
            </div>
            <div className="mr-2 w-[800px]">
              <SanityImage
                image={noCrop}
                sizes={['300px', '500px', '50vw']}
                aspectRatio={0.3}
              />
              <p className="font-size-10">aspectRatio = 0.3, no hotSpot</p>
            </div>
          </div>
        </div>
      );
    },
  ],
};
export default meta;
