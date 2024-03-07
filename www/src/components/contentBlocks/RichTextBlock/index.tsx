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
  const { theme, header, subnav, richTextChildBlock } = richTextBlock;

  return (
    <ContentBlockWrapper
      id={subnav?.contentBlockId}
      header={header}
      wrapperPadding={false}
    >
      <Theme theme={theme} className={cn(ThemeWrapper)}>
        <div className={cn(RichTextWrapper)}>
          {richTextChildBlock && (
            <RichTextChildBlock richTextChildBlock={richTextChildBlock} />
          )}
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
