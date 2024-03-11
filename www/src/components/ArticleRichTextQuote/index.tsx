import { FC } from 'react';
import cn from 'classnames';
import { QuoteObject } from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type Props = {
  quoteObject: QuoteObject;
};

export const ArticleRichTextQuote: FC<Props> = ({ quoteObject }) => {
  const { quote, attribution, icon } = quoteObject;
  return (
    <div className={cn('ArticleRichTextQuote flex flex-col')}>
      {icon && (
        <BrandedIcon
          type={icon.icon}
          iconStyles="theme-white"
          wrapperStyles="w-12 mb-8"
        />
      )}
      <blockquote className={cn('font-size-5--quote font-trust text-sienna')}>
        {quote}
      </blockquote>
      <p
        className={cn(
          'ArticleRichTextQuote__author font-size-9 font-trust text-grey-darker',
        )}
      >
        <span>{attribution.label}</span>
        {attribution.labelSubtitle ? (
          <span>
            <br />
            {attribution.labelSubtitle}
          </span>
        ) : null}
      </p>
    </div>
  );
};
