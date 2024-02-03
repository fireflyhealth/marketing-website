import React, { FC } from 'react';
import cn from 'classnames';
import { Link as LinkType, Maybe } from '@/types/sanity';
import { Link } from '@/atoms/Link';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'textLink';

export type ButtonProps = {
  /* Used for analytics event tracking */
  id: string;
  label: string;
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
          width === 'full' ? 'w-full' : 'w-auto',
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
  link: LinkType;
};

export const LinkButton: FC<LinkButtonProps> = ({
  id,
  label,
  link,
  variant = 'primary',
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
          width === 'full' ? 'w-full' : 'w-auto',
        )}
        id={id}
      >
        <div className="cta__inner">
          <Link link={link} aria-label={ariaLabel || undefined}>
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
};
