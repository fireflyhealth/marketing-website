import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { Link } from '@/atoms/Link';
import { formatSanityDate } from '@/utils/text';
import {
  Wrapper,
  TextContentWrapper,
  Tag,
  Info,
  Author,
  DateWrapper,
  Date as DateStyle,
  Image,
} from './styles';

type Props = {
  articleHeader: SanityTypes.BlogArticle;
};

const ArticleTag = ({
  tags,
}: {
  tags?: SanityTypes.Maybe<SanityTypes.BlogArticleTag[]>;
}) => {
  if (!tags?.length) {
    return null;
  }

  const tag = tags[0];

  if (tag.link) {
    return (
      <Link
        className={cn(Tag, 'transition hover:border-grey-darker')}
        link={tag.link}
        ariaLabel={`Navigate to ${tag.title}`}
      >
        <p className="-mb-1">{tag.title}</p>
      </Link>
    );
  }

  return (
    <div className={cn(Tag)}>
      <p className="-mb-1">{tag.title}</p>
    </div>
  );
};

export const ArticleHeader: FC<Props> = ({ articleHeader }) => {
  const { tags, title, authorName, publishDate, updatedDate, articleImage } =
    articleHeader;
  const selectedPublishedDate = publishDate;
  const formattedPublishDate = formatSanityDate(selectedPublishedDate);
  return (
    <div className={cn(Wrapper)}>
      <div
        className={cn(TextContentWrapper, {
          'lg:w-1/2': articleImage,
        })}
      >
        <ArticleTag tags={tags} />
        <h1 className={cn('font-size-3 font-trust')}>{title}</h1>
        <div className={cn(Info)}>
          {authorName && <p className={cn(Author)}>by {authorName}</p>}
          <div className={cn(DateWrapper)}>
            <p className={cn(DateStyle)}>Published {formattedPublishDate}</p>
            {updatedDate && (
              <p className={cn(DateStyle)}>
                Updated {formatSanityDate(updatedDate)}
              </p>
            )}
          </div>
        </div>
      </div>
      {articleImage && (
        <SanityImage
          className={cn(Image)}
          image={articleImage}
          sizes={['100vw', '50vw']}
          priority
        />
      )}
    </div>
  );
};
