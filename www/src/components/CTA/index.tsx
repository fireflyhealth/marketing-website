import React, { FC } from 'react';
import { CTA as CTAType } from '@/types/sanity';
import { LinkButton, ButtonProps } from '@/atoms/Button';

type CTAProps = Pick<ButtonProps, 'width'> & {
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
