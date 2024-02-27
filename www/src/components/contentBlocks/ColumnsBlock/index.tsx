import React, { FC } from 'react';
import cn from 'classnames';
import { ColumnsBlock as ColumnsBlockType } from '@/types/sanity';
import { ChildContentBlock } from '@/components/childContentBlocks/ChildContentBlock';
import { ColorTheme, Theme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

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
  const { subnav, header, theme, columnCount, content } = columnsBlock;
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <Theme theme={theme}>
        <div
          className={cn(
            'grid gap-y-12',
            getColumnCountClassName(columnCount),
            'md:gap-y-24 md:gap-x-12',
            theme == ColorTheme.White
              ? ''
              : 'py-12 px-5 md:py-12 md:px-12 theme-bg-color rounded-xl',
          )}
        >
          {content.map((content) => (
            <div key={content._key}>
              <ChildContentBlock block={content} />
            </div>
          ))}
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
