import { FC } from 'react';
import cn from 'classnames';
import { ReviewBlock as ReviewBlockType } from '@/types/sanity';
import { ContentBlockHeader } from '../ContentBlockWrapper';
import { ReviewItem } from './ReviewItem';
import { Wrapper, Header, Reviews } from './styles';

type Props = {
  reviewBlock: ReviewBlockType;
};

export const ReviewBlock: FC<Props> = ({ reviewBlock }) => {
  const { header, reviews } = reviewBlock;
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
        {reviews.map((review) => (
          <ReviewItem key={review._key} reviewItem={review} />
        ))}
      </div>
    </div>
  );
};
