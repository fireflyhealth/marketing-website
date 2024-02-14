import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RichImage, Image, ResponsiveImageSet } from '@/types/sanity';
import { responsiveImageSetExample } from '@/mockData';
import { ResponsiveSanityImage } from './ResponsiveSanityImage';

type ExampleProps = {
  desktopEnabled: boolean;
  tabletEnabled: boolean;
  mobileEnabled: boolean;
};

const Example: FC<ExampleProps> = ({
  desktopEnabled,
  tabletEnabled,
  mobileEnabled,
}) => {
  const modifiedImageSet: ResponsiveImageSet = {
    ...responsiveImageSetExample,
    desktop: desktopEnabled ? responsiveImageSetExample.desktop : null,
    tablet: tabletEnabled ? responsiveImageSetExample.tablet : null,
    mobile: mobileEnabled ? responsiveImageSetExample.mobile : null,
  };

  return (
    <div className="h-full relative">
      <ResponsiveSanityImage imageSet={modifiedImageSet} sizes={['100vw']} />
    </div>
  );
};

const meta = {
  title: 'Atoms/Responsive Image Set',
  component: Example,
} satisfies Meta<typeof Example>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    desktopEnabled: true,
    tabletEnabled: true,
    mobileEnabled: true,
  },
};

export default meta;
