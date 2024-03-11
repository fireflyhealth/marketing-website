import React, { FC } from 'react';
import cn from 'classnames';
import {
  ColumnsObject as ColumnsObjectType,
  ColumnsBlock as ColumnsBlockType,
} from '@/types/sanity';
import { ChildContentBlock } from '@/components/childContentBlocks/ChildContentBlock';
import { ColorTheme, Theme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type ColumnsObjectProps = {
  columnsObject: ColumnsBlockType | ColumnsObjectType;
};

export const ColumnsObject: FC<ColumnsObjectProps> = ({ columnsObject }) => {
  const { theme, columnCount, content } = columnsObject;
  return (
    <Theme theme={theme}>
      <div
        className={cn(
          'grid gap-y-12',
          getColumnCountClassName(columnCount),
          'md:gap-y-24 md:gap-x-12',
          theme == ColorTheme.White
            ? ''
            : 'py-12 md:p-12 theme-bg-color rounded-xl container-padding-bleed-mobile-only',
        )}
      >
        {content.map((content, index) => (
          <div key={`${content._key}-${index}`}>
            <ChildContentBlock block={content} />
          </div>
        ))}
      </div>
    </Theme>
  );
};

type ColumnsBlockProps = {
  columnsBlock: ColumnsBlockType;
};

const getColumnCountClassName = (
  columnCount: ColumnsBlockType['columnCount'],
): string => {
  switch (columnCount) {
    case 4:
      return 'lg:grid-cols-4';
    case 3:
      return 'lg:grid-cols-3';
    case 2:
      return 'lg:grid-cols-2';
    default:
      // @ts-expect-error
      console.warn(`${columnCount.toString()} is not a valid column count`);
      return '';
  }
};

export const ColumnsBlock: FC<ColumnsBlockProps> = ({ columnsBlock }) => {
  const { subnav, header } = columnsBlock;
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <ColumnsObject columnsObject={columnsBlock} />
    </ContentBlockWrapper>
  );
};
