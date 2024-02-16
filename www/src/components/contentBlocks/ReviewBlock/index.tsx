import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { ReviewBlock as ReviewBlockType } from '@/types/sanity';
import { Button } from '@/atoms/Button';
import { ContentBlockHeader } from '../ContentBlockWrapper';
import { ReviewItem } from './ReviewItem';
import { Wrapper, Header, Reviews } from './styles';

type Props = {
  reviewBlock: ReviewBlockType;
};

export const ReviewBlock: FC<Props> = ({ reviewBlock }) => {
  const { header, reviews } = reviewBlock;

  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true);
  // State handling the number of reviews to show at a time
  const [reviewListIndex, setReviewListIndex] = useState(3);

  // Slice reviews so it's length = reviewListIndex
  const initialReviewList = reviews.slice(0, reviewListIndex);

  const handleLoadMore = () => {
    setReviewListIndex(reviewListIndex + 6);
  };

  // only show the load more button if there are more than 3 reviews
  useEffect(() => {
    if (reviews.length > 3) {
      setIsLoadMoreVisible(true);
    } else setIsLoadMoreVisible(false);
  }, [reviews]);

  // Hide 'Load more' button when all reviews are shown
  useEffect(() => {
    if (reviewListIndex >= reviews.length) {
      setIsLoadMoreVisible(false);
    }
  }, [reviewListIndex, reviews.length]);

  return (
    <div className={cn(Wrapper)}>
      {header && (
        <div className={cn(Header)}>
          <ContentBlockHeader
            header={header}
            descriptionOverrides="theme-text-color-secondary font-size-8 font-roobert"
          />
        </div>
      )}
      <div className={cn(Reviews)}>
        {initialReviewList.map((review) => (
          <ReviewItem key={review._key} reviewItem={review} />
        ))}
        {isLoadMoreVisible && (
          <Button
            id=""
            label="Load more"
            onClick={handleLoadMore}
            width="auto"
            align="left"
          />
        )}
      </div>
    </div>
  );
};
