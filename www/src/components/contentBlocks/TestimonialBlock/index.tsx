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
      <div
        className={cn('TestimonialBlock mt-8 md:mt-0 pb-4 md:pb-16', {
          'pt-12': !header,
        })}
      >
        <Carousel>
          {testimonials.map((quoteObject, index) => (
            <div
              key={quoteObject._key}
              className={cn(
                index === testimonials.length - 1
                  ? 'mr-grid-margin-sm md:mr-0'
                  : 'mr-grid-margin-sm md:-mr-10 lg:-mr-[38px]',
              )}
            >
              <TestimonialItem quoteObject={quoteObject} />
            </div>
          ))}
        </Carousel>
      </div>
    </ContentBlockWrapper>
  );
};
