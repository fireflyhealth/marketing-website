import React, { FC } from 'react';
import cn from 'classnames';
import { Link as LinkType, LinkableDocumentData, Maybe } from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { tab } from '@testing-library/user-event/dist/cjs/setup/directApi.js';

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
  ariaSelected?: boolean;
  tabIndex?: number | undefined;
} & (
  | {
      /* aria-selected can only be applied to elements with the
       * roles "gridcell" | "option" | "row" | "tab"
       * (we only use "option" here)*/

      /* NOTE: if you use this option, the buttons must be contained
       * within a role="listbox" element */
      role: 'option';
      ariaSelected: boolean;
    }
  | {
      role?: undefined;
      ariaSelected?: undefined;
    }
);

export const Button: FC<ButtonProps> = ({
  id,
  label,
  variant = 'primary',
  active,
  onClick,
  align = 'center',
  disabled = false,
  ariaLabel,
  ariaSelected,
  role,
  bgColorOverride,
  width = 'full',
  tabIndex,
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
          'cta transition-all',
          `cta--${variant}`,
          active && 'cta--active',
          /* TextLink width should always be auto */
          variant === 'textLink' || width === 'auto' ? 'w-auto' : 'w-full',
        )}
        aria-selected={ariaSelected}
        role={role}
        aria-label={ariaLabel || undefined}
        id={id}
        onClick={onClick}
        disabled={disabled}
        tabIndex={tabIndex || undefined}
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
          /* TextLink width should always be auto */
          variant === 'textLink' || width === 'auto' ? 'w-auto' : 'w-full',
        )}
        id={id}
      >
        <Link
          className={cn(
            'cta transition-all',
            `cta--${variant}`,
            disabled && 'cta--disabled',
            active && 'cta--active',
          )}
          link={link}
          ariaLabel={ariaLabel || undefined}
        >
          {label}
        </Link>
      </div>
    </div>
  );
};
