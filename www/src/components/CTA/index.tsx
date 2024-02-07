import React, { FC } from 'react';
import { CTA as CTAType } from '@/types/sanity';
import { LinkButton, ButtonProps } from '@/atoms/Button';

type CTAProps = Pick<ButtonProps, 'width' | 'align'> & {
  cta: CTAType;
};

export const CTA: FC<CTAProps> = ({ cta, width, align }) => {
  const { label, variant, ariaLabel, id, link } = cta;
  return (
    <LinkButton
      id={id}
      link={link}
      ariaLabel={ariaLabel}
      variant={variant}
      label={label}
      width={width}
      align={align}
    />
  );
};
