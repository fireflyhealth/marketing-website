import { FC } from 'react';
import cn from 'classnames';
import { QuoteObject as QuoteObjectType } from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { SanityImage } from '@/atoms/Image/SanityImage';
import {
  Wrapper,
  Quote,
  AttributionContainer,
  Headshot,
  Attribution,
  Name,
  About,
} from './styles';

type Props = {
  quoteObject: QuoteObjectType;
};

/**
 * QuoteObject color theme is handled by it's parent component.
 * This keeps the QuoteObject flexible to use within various components/contexts.
 */
export const QuoteObject: FC<Props> = ({ quoteObject }) => {
  const { quote, attribution } = quoteObject;
  return (
    <div className={cn(Wrapper, 'space-y-6 md:space-y-[43px]')}>
      <div className={cn(Quote)}>{quote}</div>
      <Link link={attribution}>
        <div className={cn(AttributionContainer)}>
          {attribution.headshot && (
            <div className={cn(Headshot)}>
              <SanityImage image={attribution.headshot} sizes={['48px']} />
            </div>
          )}
          <div className={cn(Attribution)}>
            <div className={cn(Name)}>{attribution.name}</div>
            <div className={cn(About)}>
              {attribution.title}
              {attribution.qualifications && `, ${attribution.qualifications}`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
