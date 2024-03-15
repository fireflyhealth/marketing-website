import { FC } from 'react';
import cn from 'classnames';
import { ReviewItem as ReviewItemType } from '@/types/sanity';
import { StarRating } from '@/components/StarRating';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ReviewWrapper, ReviewTitle, Reviewee } from './styles';

type Props = {
  reviewItem: ReviewItemType;
};

export const ReviewItem: FC<Props> = ({ reviewItem }) => {
  const { starRating, title, reviewQuote, date } = reviewItem;
  const { quote, badgeImage, attribution } = reviewQuote;

  const formatedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const attributionText = [attribution.label, attribution.labelSubtitle]
    .filter(Boolean)
    .join(', ');

  return (
    <div className={cn(ReviewWrapper)}>
      <div className="flex flex-row justify-between items-center">
        <StarRating starRating={starRating} />
        {badgeImage && (
          <SanityImage image={badgeImage} sizes={['114px']} width={114} />
        )}
      </div>
      <h5 className={cn(ReviewTitle)}>{title}</h5>
      <p className="font-roobert font-size-8">{quote}</p>
      <div className={cn(Reviewee)}>
        <div>{attributionText}</div>
        <div className="theme-text-color-secondary">{formatedDate(date)}</div>
      </div>
    </div>
  );
};
