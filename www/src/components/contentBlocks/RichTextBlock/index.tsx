import { FC } from 'react';
import cn from 'classnames';
import { RichTextBlock as RichTextBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { Theme, ColorTheme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type Props = {
  richTextBlock: RichTextBlockType;
};

export const RichTextBlock: FC<Props> = ({ richTextBlock }) => {
  const { theme, text, header, subnav, largerPadding } = richTextBlock;

  return (
    <ContentBlockWrapper
      id={subnav?.contentBlockId}
      header={header}
      wrapperPadding={false}
    >
      <Theme theme={theme} className={cn('theme-bg-color')}>
        <div
          className={cn('py-12 px-4 md:px-12 w-1/2', {
            'md:py-24': !largerPadding,
            'md:py-40': largerPadding,
          })}
        >
          <RichText content={text} />
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
