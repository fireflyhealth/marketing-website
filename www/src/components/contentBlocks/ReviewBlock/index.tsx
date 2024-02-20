import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { ReviewBlock as ReviewBlockType } from '@/types/sanity';
import { Button } from '@/atoms/Button';
import { RichText } from '@/components/RichText';
import { ContentBlockHeader } from '../ContentBlockWrapper';
import { ReviewItem } from './ReviewItem';
import { Wrapper, Header, Title, Description, Reviews } from './styles';

type Props = {
  reviewBlock: ReviewBlockType;
};

export const ReviewBlock: FC<Props> = ({ reviewBlock }) => {
  const { header, reviewHeading, reviews } = reviewBlock;

  // State handling the number of reviews to show at a time
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);

  // Slice reviews so it's length = visibleReviewsCount
  const visibleReviews = reviews.slice(0, visibleReviewsCount);

  const handleLoadMore = () => {
    setVisibleReviewsCount(visibleReviewsCount + 6);
  };

  const isLoadMoreVisible = reviews.length > visibleReviewsCount;

  return (
    <>
      {header && <ContentBlockHeader header={header} />}
      <div className={cn(Wrapper)}>
        <div className={cn(Header)}>
          <h2 className={cn(Title)}>{reviewHeading.title}</h2>
          <div className={cn(Description)}>
            <RichText
              content={reviewHeading.description}
              fontSize="font-size-8 font-roobert"
              textColor="theme-text-color-secondary"
            />
          </div>
        </div>
        <div className={cn(Reviews)}>
          {visibleReviews.map((review) => (
            <ReviewItem key={review._key} reviewItem={review} />
          ))}
          {isLoadMoreVisible && (
            <Button
              id="load-more-reviews"
              label="Load more"
              onClick={handleLoadMore}
              width="auto"
              align="left"
            />
          )}
        </div>
      </div>
    </>
  );
};
