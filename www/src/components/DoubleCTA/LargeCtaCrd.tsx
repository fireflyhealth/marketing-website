import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { CTA_Card_Wrapper, CTA_Card, Card_Label, CTA, Label } from './styles';

type Props = {
  cta: SanityTypes.LargeCtaCard;
};

export const LargeCtaCard: FC<Props> = ({ cta }) => {
  const { link, eyebrow, label } = cta;
  return (
    <div className={cn(CTA_Card_Wrapper)}>
      <Link link={link}>
        <div className={cn(CTA_Card)}>
          <div className={cn(Card_Label)}>{eyebrow}</div>
          <div className={cn(CTA)}>
            <div className={cn(Label)}>{label}</div>
            <BrandedIcon
              type="arrow-right"
              wrapperStyles="w-12"
              iconStyles="theme-white"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
