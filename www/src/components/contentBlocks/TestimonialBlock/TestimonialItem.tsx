import { FC } from 'react';
import cn from 'classnames';
import { TestimonialItem as TestimonialItemType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { RichText } from '@/components/RichText';
import { Testimonial, Image, Attestant } from './styles';

type Props = {
  testimonialItem: TestimonialItemType;
};

export const TestimonialItem: FC<Props> = ({ testimonialItem }) => {
  const { image, testimonial, name, age, description } = testimonialItem;
  return (
    <div className={cn(Testimonial, image && 'mt-[100px] md:mt-[140px]')}>
      {image && (
        <div className={cn(Image)}>
          <SanityImage image={image} sizes={['']} />
        </div>
      )}
      <RichText content={testimonial} fontSize="font-roobert font-size-8" />
      <div className={cn(Attestant)}>
        {name}
        {age && `, ${age}`}
      </div>
      {description && (
        <RichText
          content={description}
          fontSize="font-trust font-size-9 text-grey-darker"
        />
      )}
    </div>
  );
};
