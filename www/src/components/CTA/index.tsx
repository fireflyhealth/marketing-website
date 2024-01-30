import React, { FC } from 'react';
import { CTA as CTAType } from '@/types/sanity';
import { LinkButton } from '@/atoms/Button';

type CTAProps = {
  cta: CTAType;
};

export const CTA: FC<CTAProps> = ({ cta }) => {
  const { label, variant, ariaLabel, id, link } = cta;
  return (
    <LinkButton
      id={id}
      link={link}
      ariaLabel={ariaLabel}
      variant={variant}
      label={label}
    />
  );
};
