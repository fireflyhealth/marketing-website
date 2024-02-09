import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/atoms/Button';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ColorTheme, Theme } from './';

const Annotation: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col justify-center text-[0.6rem] theme-text-color-primary">
    {children}
  </div>
);

const handleClick = () => alert('button clicked');

const ExampleInner = () => {
  return (
    <div
      className="text-left grid gap-4 grid-cols-2 theme-bg-color p-2"
      style={{ gridTemplateColumns: '200px 1fr' }}
    >
      <Annotation>bg-color</Annotation>
      <div />

      <Annotation>theme-text-color-primary</Annotation>
      <p className="font-trust text-xl theme-text-color-primary">
        Aa Firefly Health
      </p>

      <Annotation>theme-text-color-secondary</Annotation>
      <p className="font-trust text-xl theme-text-color-secondary">
        Aa Firefly Health
      </p>

      <Annotation>theme-text-color-decorative</Annotation>
      <p className="font-trust text-xl theme-text-color-decorative">
        Aa Firefly Health
      </p>

      <Annotation>
        theme-cta-text-color-primary
        <br /> theme-cta-bg-color-primary
      </Annotation>
      <Button
        id="button-primary"
        align="left"
        width="auto"
        label="Get Started"
        onClick={handleClick}
      />

      <Annotation>
        theme-cta-text-color-secondary <br />
        theme-cta-bg-color-secondary
      </Annotation>
      <Button
        id="button-secondary"
        align="left"
        width="auto"
        label="Get Started"
        variant="secondary"
        onClick={handleClick}
      />

      <Annotation>outline</Annotation>
      <div className="w-[100px] h-[100px] border-[2px] theme-border-color rounded" />
      <Annotation>icon-base icon-overlap</Annotation>
      <div className="flex">
        <BrandedIcon type="clipboard" wrapperStyles="w-12" />
        <BrandedIcon type="checkmark" wrapperStyles="w-12" />
        <BrandedIcon type="pill" wrapperStyles="w-12" />
      </div>
    </div>
  );
};

const meta = {
  title: 'Components/Theme',
  component: ExampleInner,
  parameters: {
    controls: { exclude: ['children', 'theme'] },
    docs: {
      controls: { exclude: ['children', 'theme'] },
    },
  },
} satisfies Meta<typeof ExampleInner>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export default meta;
