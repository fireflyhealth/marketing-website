import { FC } from 'react';
import cn from 'classnames';
import { RichTextBlock as RichTextBlockType } from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { RichTextChildBlock } from '@/components/childContentBlocks/RichTextChildBlock';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { ThemeWrapper, RichTextWrapper } from './style';

type Props = {
  richTextBlock: RichTextBlockType;
};

// TODO: add FullWidthBackground component after #179 gets merged
export const RichTextBlock: FC<Props> = ({ richTextBlock }) => {
  const {
    theme,
    header,
    subnav,
    richTextChildBlock,
    containerLayout,
    removeContainerSpacing,
  } = richTextBlock;

  return (
    <ContentBlockWrapper
      id={subnav?.contentBlockId}
      header={header}
      wrapperPadding={false}
      removeBetweenComponentMargin={true}
    >
      <Theme
        theme={theme}
        className={cn(ThemeWrapper, {
          'md:min-h-[520px]': !removeContainerSpacing,
        })}
      >
        <div
          className={cn(RichTextWrapper, {
            'RichTextBlock__text-wrapper--50-center':
              containerLayout === '50-center',
            'RichTextBlock__text-wrapper--80-left':
              containerLayout === '80-left',
            'py-12 md:py-40': !removeContainerSpacing,
          })}
        >
          {richTextChildBlock && (
            <RichTextChildBlock richTextChildBlock={richTextChildBlock} />
          )}
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
