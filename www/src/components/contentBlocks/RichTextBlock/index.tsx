import { FC } from 'react';
import cn from 'classnames';
import { RichTextBlock as RichTextBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { Theme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { ThemeWrapper, RichTextWrapper } from './style';

type Props = {
  richTextBlock: RichTextBlockType;
};

export const RichTextBlock: FC<Props> = ({ richTextBlock }) => {
  const { theme, text, header, subnav, largerPadding, width } = richTextBlock;

  return (
    <ContentBlockWrapper
      id={subnav?.contentBlockId}
      header={header}
      wrapperPadding={false}
    >
      <Theme theme={theme} className={cn(ThemeWrapper)}>
        <div
          className={cn(RichTextWrapper, {
            'md:py-24': !largerPadding,
            'md:py-40': largerPadding,
            'lg:w-1/2': width === '1-2',
            'lg:w-2/3': width === '2-3',
          })}
        >
          <RichText content={text} />
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
