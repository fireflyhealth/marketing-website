import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { formatSanityDate } from '@/utils/text';
import {
  Wrapper,
  TextContentWrapper,
  Tag,
  Title,
  Author,
  DateWrapper,
  Date as DateStyle,
  Image,
} from './styles';

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
    articleImage,
  } = articleHeader;
  const selectedPublishedDate = publishDate || _createdAt;
  const selectedUpdatedDate = updatedDate || _updatedAt;
  const formattedPublishDate = formatSanityDate(selectedPublishedDate);
  const formattedUpdatedDate = formatSanityDate(selectedUpdatedDate);
  return (
    <div className={cn(Wrapper)}>
      <div
        className={cn(TextContentWrapper, {
          'lg:w-1/2': articleImage,
        })}
      >
        {tags?.length && (
          <div className={cn(Tag)}>
            <p className={cn()}>{tags[0].title}</p>
          </div>
        )}
        <h1 className={cn('font-size-3 font-trust')}>{title}</h1>
        <div className={cn(Title)}>
          {authorName && <p className={cn(Author)}>by {authorName}</p>}
          <div className={cn(DateWrapper)}>
            <p className={cn(DateStyle)}>Published {formattedPublishDate}</p>
            {formattedUpdatedDate !== formattedPublishDate && (
              <p className={cn(DateStyle)}>Updated {formattedUpdatedDate}</p>
            )}
          </div>
        </div>
      </div>
      {articleImage && (
        <SanityImage
          className={cn(Image)}
          image={articleImage}
          sizes={['100vw', '50vw']}
        />
      )}
    </div>
  );
};