import React, { FC } from 'react';
import cn from 'classnames';
import { TwoUpBlock as TwoUpBlockType } from '@/types/sanity';
import { ChildContentBlock } from '@/components/childContentBlocks/ChildContentBlock';
import { ColorTheme, Theme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type TwoUpBlockProps = {
  twoUpBlock: TwoUpBlockType;
};

export const TwoUpBlock: FC<TwoUpBlockProps> = ({ twoUpBlock }) => {
  const {
    header,
    layout,
    mobileReverseBlockOrder,
    blockOne,
    blockTwo,
    blockThemes,
    subnav,
  } = twoUpBlock;
  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div
        className={cn(
          'TwoUpBlock',
          `TwoUpBlock--layout-${layout}`,
          mobileReverseBlockOrder
            ? 'TwoUpBlock--mobileReverse'
            : 'TwoUpBlock--mobileNormal',
        )}
      >
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockOne._type}`,
          )}
        >
          <Theme
            theme={
              (layout === 'overlap-50-50' && blockThemes?.blockOneTheme) ||
              ColorTheme.White
            }
          >
            <ChildContentBlock block={blockOne} />
          </Theme>
        </div>
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockTwo._type}`,
          )}
        >
          <Theme
            theme={
              (layout === 'overlap-50-50' && blockThemes?.blockTwoTheme) ||
              ColorTheme.White
            }
          >
            <ChildContentBlock block={blockTwo} />
          </Theme>
        </div>
      </div>
    </ContentBlockWrapper>
  );
};
