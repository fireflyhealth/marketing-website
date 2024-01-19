import React, { FC } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Theme, ColorTheme } from '@/components/Theme';
import { Button } from './';

type ButtonGroupProps = ButtonsExampleProps & { theme: ColorTheme };

const ButtonGroup: FC<ButtonGroupProps> = ({ label, onClick, theme }) => (
  <Theme theme={theme}>
    <div className="bg-theme grid grid-cols-1 py-9 gap-y-9 p-4 rounded-md">
      <Button
        id={`${theme}-primary`}
        label={label}
        onClick={onClick}
        variant="primary"
      />
      <Button
        id={`${theme}-secondary`}
        label={label}
        onClick={onClick}
        variant="secondary"
      />
      <Button
        id={`${theme}-outlined`}
        label={label}
        onClick={onClick}
        variant="outlined"
      />
      <Button
        id={`${theme}-textLink`}
        label={label}
        onClick={onClick}
        variant="textLink"
      />
      <hr />
      <Button
        id={`${theme}-primary-disabled`}
        label={label}
        disabled
        onClick={onClick}
        variant="primary"
      />
      <Button
        id={`${theme}-secondary-disabled`}
        label={label}
        disabled
        onClick={onClick}
        variant="secondary"
      />
      <Button
        id={`${theme}-outlined-disabled`}
        label={label}
        disabled
        onClick={onClick}
        variant="outlined"
      />
      <Button
        id={`${theme}-textLink-disabled`}
        label={label}
        disabled
        onClick={onClick}
        variant="textLink"
      />
    </div>
  </Theme>
);

type ButtonsExampleProps = {
  label: string;
  onClick: () => void;
};

const ButtonsExample: FC<ButtonsExampleProps> = (buttonProps) => (
  <div className="grid grid-cols-5 gap-4">
    <ButtonGroup {...buttonProps} theme={ColorTheme.White} />
    <ButtonGroup {...buttonProps} theme={ColorTheme.Grey} />
    <ButtonGroup {...buttonProps} theme={ColorTheme.Sienna} />
    <ButtonGroup {...buttonProps} theme={ColorTheme.Midnight} />
    <ButtonGroup {...buttonProps} theme={ColorTheme.Sky} />
  </div>
);

const meta = {
  title: 'Atoms/Button',
  component: ButtonsExample,
  parameters: {
    controls: { exclude: ['onClick'] },
    docs: {
      controls: { exclude: ['onClick'] },
    },
  },
} satisfies Meta<typeof ButtonsExample>;

type Story = StoryObj<typeof meta>;

const handleClick = () => alert('button clicked');

export const Primary: Story = {
  args: { label: 'Get Started', onClick: handleClick },
};

export default meta;
