import { FC } from 'react';
import cn from 'classnames';
import { QuoteObject } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { toQuotation } from '@/utils/text';
import { Testimonial, Image, Attestant } from './styles';

type Props = {
  quoteObject: QuoteObject;
};

export const TestimonialItem: FC<Props> = ({ quoteObject }) => {
  const { attribution, quote } = quoteObject;

  return (
    <div className={cn(Testimonial, attribution.image && 'mt-[100px] md:mt-0')}>
      {attribution.image && (
        <div className={cn(Image)}>
          <SanityImage
            image={attribution.image}
            sizes={['125px', '175px', '135px']}
          />
        </div>
      )}
      <p className="font-roobert font-size-8">{toQuotation(quote)}</p>
      <div className={cn(Attestant)}>{attribution.label}</div>
      {attribution.labelSubtitle ? (
        <div className="font-trust font-size-9 theme-text-color-secondary">
          {attribution.labelSubtitle}
        </div>
      ) : null}
    </div>
  );
};
