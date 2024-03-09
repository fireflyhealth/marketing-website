import React, { FC } from 'react';
import cn from 'classnames';
import { Link as LinkType, LinkableDocumentData, Maybe } from '@/types/sanity';
import { Link } from '@/atoms/Link';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'textLink';

export type ButtonProps = {
  /* Used for analytics event tracking */
  id: string;
  label: string;
  active?: boolean;
  ariaLabel?: Maybe<string>;
  variant?: ButtonVariant;
  onClick: React.MouseEventHandler;
  align?: 'left' | 'center' | 'right';
  disabled?: boolean;
  bgColorOverride?: string;
  width?: 'auto' | 'full';
};

export const Button: FC<ButtonProps> = ({
  id,
  label,
  variant = 'primary',
  active,
  onClick,
  align = 'center',
  disabled = false,
  ariaLabel,
  bgColorOverride,
  width = 'full',
}) => {
  return (
    <div
      className={cn('flex', {
        'justify-center': align === 'center',
        'justify-start': align === 'left',
        'justify-end': align === 'right',
      })}
    >
      <button
        /* CTA styles are defined in global.css */
        className={cn(
          bgColorOverride,
          'cta',
          `cta--${variant}`,
          active && 'cta--active',
          /* TextLink width should always be auto */
          variant === 'textLink' || width === 'auto' ? 'w-auto' : 'w-full',
        )}
        aria-label={ariaLabel || undefined}
        id={id}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="cta__inner">{label}</div>
      </button>
    </div>
  );
};

type LinkButtonProps = Omit<ButtonProps, 'onClick'> & {
  link: LinkType | LinkableDocumentData;
};

export const LinkButton: FC<LinkButtonProps> = ({
  id,
  label,
  link,
  variant = 'primary',
  active,
  ariaLabel,
  align = 'center',
  disabled,
  width = 'full',
}) => {
  return (
    <div
      className={cn('flex', {
        'justify-center': align === 'center',
        'justify-start': align === 'left',
        'justify-end': align === 'right',
      })}
    >
      <div
        className={cn(
          'cta',
          `cta--${variant}`,
          disabled && 'cta--disabled',
          active && 'cta--active',

          /* TextLink width should always be auto */
          variant === 'textLink' || width === 'auto' ? 'w-auto' : 'w-full',
        )}
        id={id}
      >
        <div className="cta__inner">
          <Link link={link} ariaLabel={ariaLabel || undefined}>
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
};
