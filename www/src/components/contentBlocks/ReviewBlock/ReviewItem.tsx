import { FC } from 'react';
import cn from 'classnames';
import { ReviewItem as ReviewItemType } from '@/types/sanity';
import { LogoTypeDoctorsReviews } from '@/svgs/Logotype';
import { StarRating } from '@/components/StarRating';
import { ReviewWrapper, Title, Review, Reviewee } from './styles';

type Props = {
  reviewItem: ReviewItemType;
};

export const ReviewItem: FC<Props> = ({ reviewItem }) => {
  const { starRating, title, review, reviewer, date } = reviewItem;

  const formatedDate = new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className={cn(ReviewWrapper)}>
      <div className="flex flex-row">
        <StarRating starRating={starRating} />
        <div className="w-[114px]">
          <LogoTypeDoctorsReviews />
        </div>
      </div>
      <h5 className={cn(Title)}>{title}</h5>
      <p className={cn(Review)}>{review}</p>
      <div className={cn(Reviewee)}>
        <div>
          {reviewer.name}
          {reviewer.age && <span>, {reviewer.age}</span>}
        </div>
        <div className="theme-text-color-secondary">{formatedDate}</div>
      </div>
    </div>
  );
};
