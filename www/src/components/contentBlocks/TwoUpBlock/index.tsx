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
};

export const TwoUpObject: FC<TwoUpObjectProps> = ({ twoUpObject }) => {
  const {
    layout,
    mobileReverseBlockOrder,
    normalLayoutTheme,
    blockOne,
    blockTwo,
    blockThemes,
  } = twoUpObject;

  if (layout === 'overlap-50-50') {
    /* 50-50 overlap wraps themes around each child block */
    return (
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
          <Theme theme={blockThemes?.blockOneTheme || ColorTheme.White}>
            <div className={cn('theme-bg-color rounded-2xl')}>
              <ChildContentBlock block={blockOne} />
            </div>
          </Theme>
        </div>
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockTwo._type}`,
          )}
        >
          <Theme theme={blockThemes?.blockTwoTheme || ColorTheme.White}>
            <div className={cn('theme-bg-color rounded-2xl')}>
              <ChildContentBlock block={blockTwo} />
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
          theme === ColorTheme.White ? '' : 'rounded-xl p-6 md:p-12',
        )}
      >
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockOne._type}`,
          )}
        >
          <ChildContentBlock block={blockOne} />
        </div>
        <div
          className={cn(
            'TwoUpBlock__child',
            `TwoUpBlock__child--${blockTwo._type}`,
          )}
        >
          <ChildContentBlock block={blockTwo} />
        </div>
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
