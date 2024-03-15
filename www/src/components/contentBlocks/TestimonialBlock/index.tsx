import { FC } from 'react';
import cn from 'classnames';
import { Carousel } from '@/components/Carousel';
import { TestimonialBlock as TestimonialBlockType } from '@/types/sanity';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { TestimonialItem } from './TestimonialItem';

type Props = {
  testimonialBlock: TestimonialBlockType;
};

export const TestimonialBlock: FC<Props> = ({ testimonialBlock }) => {
  const { header, subnav, testimonials } = testimonialBlock;

  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <div className={cn('mt-8 md:mt-0')}>
        <Carousel>
          {testimonials.map((testimonial) => (
            <TestimonialItem
              key={testimonial._key}
              testimonialItem={testimonial}
            />
          ))}
        </Carousel>
      </div>
    </ContentBlockWrapper>
  );
};
