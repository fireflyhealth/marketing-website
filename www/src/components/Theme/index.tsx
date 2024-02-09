import React, { FC } from 'react';
import cn from 'classnames';

type ThemeProps = {
  theme: ColorTheme;
  className?: string;
  children: React.ReactNode;
};

export enum ColorTheme {
  White = 'white',
  Grey = 'grey',
  Sienna = 'sienna',
  Midnight = 'midnight',
  Sky = 'sky',
}

export const Theme: FC<ThemeProps> = ({ theme, children, className }) => {
  return (
    <div
      className={cn(
        `theme-wrapper theme-${theme}`,
        'theme-text-color-primary',
        className,
      )}
    >
      {children}
    </div>
  );
};
