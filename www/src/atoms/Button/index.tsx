import React, { FC } from 'react';
import cn from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'textLink';

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  onClick: React.MouseEventHandler;
  align?: 'left' | 'center' | 'right';
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onClick,
  align = 'center',
  disabled = false,
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
        className={cn('cta', `cta--${variant}`)}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="cta__inner">{label}</div>
      </button>
    </div>
  );
};
