import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Props as BrandedIconProps, BrandedIcon } from '@/svgs/BrandedIcon';
import { Props as SimpleIconProps, SimpleIcon } from '@/svgs/SimpleIcon';

const BrandedIconTypes: BrandedIconProps['type'][] = [
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',
  'checkmark',
  'house',
  'navigation-pin',
  'star',
  'video-camera',
  'close',
  'app',
  'business',
  'care-team',
  'cost',
  'clipboard',
  'doctor',
  'doctors-office',
  'firefly-nearby',
  'health-cross',
  'heart',
  'id',
  'navigation-compass',
  'navigation-map',
  'pill',
  'video-call',
];

const SimpleIcons: SimpleIconProps['type'][] = [
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',
  'checkmark',
  'house',
  'navigation-pin',
  'star',
  'video-camera',
  'close',
  'external-link',
  'information',
  'lock',
  'menu',
  'password',
  'paper-clip',
  'question-mark',
  'rotate',
  'sound-on',
  'sound-mute',
  'search',
  'wifi',
  'plus',
];

const SectionHeading: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h3 className="font-trust font-size-6 theme-text-color-primary mb-8">
      {children}
    </h3>
  );
};

const IconType: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className="font-roobert font-size-10 theme-text-color-primary">
      {children}
    </p>
  );
};

const ExampleIconInner = () => {
  return (
    <div className="bg-theme p-8">
      <SectionHeading>Branded Icons</SectionHeading>
      <div className="grid grid-rows-5 grid-flow-col gap-4 mb-16">
        {BrandedIconTypes.map((icon, index) => (
          <div key={index} className="flex flex-col space-y-2 items-center">
            <BrandedIcon type={`${icon}`} wrapperStyles="w-12" />
            <IconType>{icon}</IconType>
          </div>
        ))}
      </div>
      <SectionHeading>Simple Icons</SectionHeading>
      <div className="grid grid-rows-5 grid-flow-col gap-4">
        {SimpleIcons.map((icon, index) => (
          <div key={index} className="flex flex-col space-y-2 items-center">
            <SimpleIcon type={`${icon}`} />
            <IconType>{icon}</IconType>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta = {
  title: 'Atoms/Icon',
  component: ExampleIconInner,
  parameters: {},
} satisfies Meta<typeof ExampleIconInner>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
