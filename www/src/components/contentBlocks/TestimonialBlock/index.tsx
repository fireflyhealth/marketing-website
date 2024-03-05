import { FC } from 'react';
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
      <Carousel>
        {testimonials.map((testimonial) => (
          <TestimonialItem
            key={testimonial._key}
            testimonialItem={testimonial}
          />
        ))}
      </Carousel>
    </ContentBlockWrapper>
  );
};
