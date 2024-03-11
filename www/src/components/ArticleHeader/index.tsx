import { FC } from 'react';
import { format, isEqual } from 'date-fns';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';

type Props = {
  articleHeader: SanityTypes.BlogArticle;
};

export const ArticleHeader: FC<Props> = ({ articleHeader }) => {
  const {
    tags,
    title,
    authorName,
    publishDate,
    _createdAt,
    updatedDate,
    _updatedAt,
  } = articleHeader;
  const selectedPublishedDate = publishDate || _createdAt;
  let selectedUpdatedDate: string | null = updatedDate || _updatedAt;
  selectedUpdatedDate = isEqual(
    new Date(selectedUpdatedDate),
    new Date(selectedPublishedDate),
  )
    ? null
    : selectedUpdatedDate;

  return (
    <div
      className={cn(
        'ArticleHeader container-padding py-12 lg:py-24 mx-auto flex flex-row items-center justify-center',
      )}
    >
      <div
        className={cn(
          'ArticleHeader__text-content-wrapper max-w-[960px] flex flex-col items-center justify-center text-center text-midnight',
        )}
      >
        {tags?.length && (
          <div
            className={cn(
              'mb-12 border-grey-medium border pt-2 pb-2.5 px-5 rounded-[33px]',
            )}
          >
            <p className={cn()}>{tags[0].title}</p>
          </div>
        )}
        <h1 className={cn('font-size-3 font-trust')}>{title}</h1>
        <div
          className={cn(
            'mt-12 font-size-8 font-roobert flex flex-col items-center',
          )}
        >
          {authorName && <p className={cn('mb-2')}>by {authorName}</p>}
          <div
            className={cn(
              'text-grey-darker flex flex-row flex-wrap items-center justify-center',
            )}
          >
            <p className={cn('mx-3')}>
              Published{' '}
              {format(new Date(selectedPublishedDate), 'MMMM d, yyyy')}
            </p>
            {selectedUpdatedDate && (
              <p className={cn('mx-3')}>
                Updated {format(new Date(selectedUpdatedDate), 'MMMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
