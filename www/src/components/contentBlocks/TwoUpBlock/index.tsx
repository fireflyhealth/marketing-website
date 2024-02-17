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
  const { header, layout, blockOne, blockTwo, blockThemes } = twoUpBlock;
  return (
    <ContentBlockWrapper header={header}>
      <div
        className={cn('TwoUpBlock__wrapper', `TwoUpBlock--layout-${layout}`)}
      >
        <div className="TwoUpBlock__child">
          <Theme
            theme={
              (layout === 'overlap-50-50' && blockThemes?.blockOneTheme) ||
              ColorTheme.White
            }
          >
            <div className="theme-bg-color">
              <ChildContentBlock block={blockOne} />
            </div>
          </Theme>
        </div>
        <div className="TwoUpBlock__child">
          <Theme
            theme={
              (layout === 'overlap-50-50' && blockThemes?.blockOneTheme) ||
              ColorTheme.White
            }
          >
            <div className="theme-bg-color">
              <ChildContentBlock block={blockTwo} />
            </div>
          </Theme>
        </div>
      </div>
    </ContentBlockWrapper>
  );
};
