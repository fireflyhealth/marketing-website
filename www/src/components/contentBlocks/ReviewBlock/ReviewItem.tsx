import { FC } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { ReviewItem as ReviewItemType } from '@/types/sanity';
import { StarRating } from '@/components/StarRating';
import doctorsReviewLogo from '../../../../public/images/doctorsReviewLogo.png';
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
      <div className="flex flex-row justify-between">
        <StarRating starRating={starRating} />
        <Image src={doctorsReviewLogo} width={114} alt="doctors.com logo" />
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
