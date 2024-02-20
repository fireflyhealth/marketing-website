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

  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true);
  // State handling the number of reviews to show at a time
  const [reviewListIndex, setReviewListIndex] = useState(3);

  // Slice reviews so it's length = reviewListIndex
  const initialReviewList = reviews.slice(0, reviewListIndex);

  const handleLoadMore = () => {
    setReviewListIndex(reviewListIndex + 6);
  };

  // only show the load more button if the number of reviews on
  // display are less than the full list of reviews
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
    </>
  );
};
