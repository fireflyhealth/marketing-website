import React, { FC } from 'react';
import cx from 'classnames';
import { Meta, StoryObj } from '@storybook/react';

const sampleText =
  'Healthcare on your own terms. An app to get questions answered and manage your needs. By building trust and rapport with your members, we become their go-to healthcare resource. That opens the door to better experiences, improved health outcomes, and meaningful savings.';

const Example = ({
  className,
  textWrap,
  wordCount = 100,
  maxWidth = '',
}: {
  className: string;
  textWrap: boolean;
  wordCount?: number;
  maxWidth?: string;
}) => {
  const text = sampleText.split(' ').slice(0, wordCount).join(' ');
  return (
    <div className="flex mb-5 p-2 border-2 border-theme rounded">
      <div className="font-size-9 font-mono text-theme-secondary w-[180px] pr-4 flex-shrink-0 tracking-tight">
        .{className}
      </div>
      <span
        className={cx(
          className,
          'text-theme-primary',
          textWrap ? maxWidth : 'whitespace-nowrap',
        )}
      >
        {text}
      </span>
    </div>
  );
};

enum FontOption {
  Trust = 'font-trust',
  Roobert = 'font-roobert',
}

type FontSizesProps = {
  textWrap: boolean;
  font: FontOption;
};

const FontSizes: FC<FontSizesProps> = ({ textWrap, font }) => {
  return (
    <div className={cx(font, textWrap ? '' : 'overflow-x-scroll')}>
      <Example textWrap={textWrap} className="font-size-1" wordCount={5} />
      <Example textWrap={textWrap} className="font-size-2" wordCount={12} />
      <Example textWrap={textWrap} className="font-size-3" wordCount={20} />
      <Example textWrap={textWrap} className="font-size-4" wordCount={31} />
      <Example textWrap={textWrap} className="font-size-5" wordCount={38} />
      <Example
        textWrap={textWrap}
        className="font-size-5--quote"
        wordCount={38}
      />
      <Example
        textWrap={textWrap}
        className="font-size-6"
        maxWidth="max-w-[700px]"
      />
      <Example
        textWrap={textWrap}
        className="font-size-6--quote"
        maxWidth="max-w-[700px]"
      />

      <Example
        textWrap={textWrap}
        className="font-size-7"
        maxWidth="max-w-[600px]"
      />
      <Example
        textWrap={textWrap}
        className="font-size-8"
        maxWidth="max-w-[500px]"
      />
      <Example
        textWrap={textWrap}
        className="font-size-8--cta"
        maxWidth="max-w-[500px]"
      />

      <Example
        textWrap={textWrap}
        className="font-size-9"
        maxWidth="max-w-[400px]"
      />
      <Example
        textWrap={textWrap}
        className="font-size-10"
        maxWidth="max-w-[300px]"
      />
    </div>
  );
};

const meta = {
  title: 'Atoms/Font Sizes',
  component: FontSizes,
  argTypes: {
    font: {
      options: [FontOption.Trust, FontOption.Roobert],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof FontSizes>;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { textWrap: false, font: FontOption.Trust },
};

export default meta;
