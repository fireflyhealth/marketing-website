import { FC } from 'react';
import cn from 'classnames';
import { ReviewItem as ReviewItemType } from '@/types/sanity';
import { StarRating } from '@/components/StarRating';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { RichText } from '@/components/RichText';
import { ReviewWrapper, ReviewTitle, Reviewee } from './styles';

type Props = {
  reviewItem: ReviewItemType;
};

export const ReviewItem: FC<Props> = ({ reviewItem }) => {
  const { starRating, title, review, reviewer, date, logo } = reviewItem;

  const formatedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className={cn(ReviewWrapper)}>
      <div className="flex flex-row justify-between items-center">
        <StarRating starRating={starRating} />
        {logo && <SanityImage image={logo} sizes={['114px']} width={114} />}
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
        <div className="theme-text-color-secondary">{formatedDate(date)}</div>
      </div>
    </div>
  );
};
