import { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/atoms/Button';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ColorTheme, Theme } from './';

type ThemeExampleComponentProps = {
  theme: ColorTheme;
  borderStyle?: BorderStyle;
};

enum BorderStyle {
  None = 'none',
  Hidden = 'hidden',
  Dotted = 'dotted',
  Solid = 'solid',
}

const Annotation: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col justify-center text-[0.6rem] text-theme-primary">
    {children}
  </div>
);

const handleClick = () => alert('button clicked');

const ExampleInner = () => {
  return (
    <div
      className="text-left grid gap-4 grid-cols-2"
      style={{ gridTemplateColumns: '200px 1fr' }}
    >
      <Annotation>bg-color</Annotation>
      <div />

      <Annotation>text-theme-primary</Annotation>
      <p className="font-trust text-xl text-theme-primary">Aa Firefly Health</p>

      <Annotation>text-theme-secondary</Annotation>
      <p className="font-trust text-xl text-theme-secondary">
        Aa Firefly Health
      </p>

      <Annotation>text-theme-decorative</Annotation>
      <p className="font-trust text-xl text-theme-decorative">
        Aa Firefly Health
      </p>

      <Annotation>
        cta-text-theme-primary
        <br /> cta-bg-theme-primary
      </Annotation>
      <Button align="left" label="Get Started" onClick={handleClick} />

      <Annotation>
        cta-text-theme-secondary <br />
        cta-bg-theme-secondary
      </Annotation>
      <Button
        align="left"
        label="Get Started"
        variant="secondary"
        onClick={handleClick}
      />

      <Annotation>outline</Annotation>
      <div className="w-[100px] h-[100px] border-[2px] border-theme rounded" />
      <Annotation>icon-base icon-overlap</Annotation>
      <div className="flex">
        <BrandedIcon type="clipboard" />
        <BrandedIcon type="checkmark" />
        <BrandedIcon type="pill" />
      </div>
    </div>
  );
};

const meta = {
  title: 'Components/Theme',
  component: Theme,
  parameters: {
    controls: { exclude: ['children', 'theme'] },
    docs: {
      controls: { exclude: ['children', 'theme'] },
    },
  },
} satisfies Meta<typeof Theme>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: ColorTheme.White, children: <ExampleInner /> },
};

export default meta;
