import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { CTACardWrapper, CardLabel, CTA, Label, CTACardLink } from './styles';

type Props = {
  cta: SanityTypes.LargeCtaCard;
};

export const LargeCtaCard: FC<Props> = ({ cta }) => {
  const { link, eyebrow, label, ariaLabel, id } = cta;
  return (
    <div className={cn(CTACardWrapper)}>
      <Link
        className={cn(CTACardLink)}
        link={link}
        ariaLabel={ariaLabel}
        id={id}
      >
        <div className={cn(CardLabel)}>{eyebrow}</div>
        <div className={cn(CTA)}>
          <div className={cn(Label)}>{label}</div>
          <BrandedIcon
            type="arrow-right"
            wrapperStyles="w-12"
            iconStyles="theme-white"
          />
        </div>
      </Link>
    </div>
  );
};
