import React, { FC } from 'react';
import cn from 'classnames';
import {
  TwoUpBlock as TwoUpBlockType,
  TwoUpObject as TwoUpObjectType,
} from '@/types/sanity';
import { ChildContentBlock } from '@/components/childContentBlocks/ChildContentBlock';
import { ColorTheme, Theme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type TwoUpObjectProps = {
  twoUpObject: TwoUpObjectType;
  imagePriority?: boolean;
  isTabContent?: boolean;
};

export const TwoUpObject: FC<TwoUpObjectProps> = ({
  twoUpObject,
  imagePriority,
  isTabContent,
}) => {
  const {
    layout,
    mobileReverseBlockOrder,
    normalLayoutTheme,
    blockOne,
    blockTwo,
    blockThemes,
  } = twoUpObject;

  const blockOneTheme = blockThemes?.blockOneTheme || ColorTheme.White;
  const blockTwoTheme = blockThemes?.blockTwoTheme || ColorTheme.White;

  if (layout === 'overlap-50-50') {
    /* 50-50 overlap wraps themes around each child block */
    return (
      <div
        className={cn(
          'TwoUpBlock',
          `TwoUpBlock--layout-${layout}`,
          'lg:py-grid-margin-lg',
          mobileReverseBlockOrder
            ? 'TwoUpBlock--mobileReverse'
            : 'TwoUpBlock--mobileNormal',
          {
            'TwoUpBlock--tab-content': isTabContent,
          },
        )}
      >
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockOne._type}`,
          )}
        >
          <Theme theme={blockOneTheme}>
            <div className={cn('theme-bg-color rounded-2xl')}>
              <ChildContentBlock
                imagePriority={imagePriority}
                block={blockOne}
              />
            </div>
          </Theme>
        </div>
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockTwo._type}`,
          )}
        >
          <Theme theme={blockTwoTheme}>
            <div className={cn('theme-bg-color rounded-2xl')}>
              <ChildContentBlock
                imagePriority={imagePriority}
                block={blockTwo}
              />
            </div>
          </Theme>
        </div>
      </div>
    );
  }
  const theme = normalLayoutTheme || ColorTheme.White;
  /* Normal layouts wraps one theme around the whole block */
  return (
    <Theme theme={theme}>
      <div
        className={cn(
          'theme-bg-color',
          'TwoUpBlock',
          `TwoUpBlock--layout-${layout}`,
          mobileReverseBlockOrder
            ? 'TwoUpBlock--mobileReverse'
            : 'TwoUpBlock--mobileNormal',
          theme === ColorTheme.White
            ? 'py-12'
            : 'rounded-2xl p-6 md:py-12 md:px-grid-margin-lg',
          {
            'TwoUpBlock--tab-content': isTabContent,
          },
        )}
      >
        <Theme
          theme={normalLayoutTheme ? normalLayoutTheme : blockOneTheme}
          className={cn(
            'TwoUpBlock__child theme-bg-color rounded-2xl',
            `TwoUpBlock__child--${blockOne._type}`,
          )}
        >
          <ChildContentBlock imagePriority={imagePriority} block={blockOne} />
        </Theme>
        <Theme
          theme={normalLayoutTheme ? normalLayoutTheme : blockTwoTheme}
          className={cn(
            'TwoUpBlock__child theme-bg-color rounded-2xl',
            `TwoUpBlock__child--${blockTwo._type}`,
          )}
        >
          <ChildContentBlock imagePriority={imagePriority} block={blockTwo} />
        </Theme>
      </div>
    </Theme>
  );
};

type TwoUpBlockProps = {
  twoUpBlock: TwoUpBlockType;
};

export const TwoUpBlock: FC<TwoUpBlockProps> = ({ twoUpBlock }) => {
  return (
    <ContentBlockWrapper
      header={twoUpBlock.header}
      id={twoUpBlock.subnav?.contentBlockId}
    >
      <TwoUpObject
        twoUpObject={{
          ...twoUpBlock,
          _type: 'twoUpObject',
        }}
      />
    </ContentBlockWrapper>
  );
};
