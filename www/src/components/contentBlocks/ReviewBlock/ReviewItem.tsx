import { FC } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { ReviewItem as ReviewItemType } from '@/types/sanity';
import { StarRating } from '@/components/StarRating';
import { RichText } from '@/components/RichText';
import doctorsReviewLogo from '../../../../public/images/doctorsReviewLogo.png';
import { ReviewWrapper, ReviewTitle, Reviewee } from './styles';

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
      <h5 className={cn(ReviewTitle)}>{title}</h5>
      <RichText
        content={review}
        fontSize="font-roobert font-size-8"
        textColor="theme-text-color-secondary"
      />
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
