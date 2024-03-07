import { FC } from 'react';
import cn from 'classnames';
import { RichQuote as RichQuoteType } from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type Props = {
  richQuote: RichQuoteType;
};

export const RichQuote: FC<Props> = ({ richQuote }) => {
  const { quote, author, icon } = richQuote;
  return (
    <div className={cn('RichQuote flex flex-col')}>
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
      {author && (
        <p
          className={cn(
            'RichQuote__author font-size-9 font-trust text-grey-darker',
          )}
        >
          {author}
        </p>
      )}
    </div>
  );
};
