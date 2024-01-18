import React, { FC } from 'react';

type ThemeProps = {
  theme: ColorTheme;
  children: React.ReactNode;
};

export enum ColorTheme {
  White = 'white',
  Grey = 'grey',
  Sienna = 'sienna',
  Midnight = 'midnight',
  Sky = 'sky',
}

export const Theme: FC<ThemeProps> = ({ theme, children }) => {
  return <div className={`theme-wrapper theme-${theme}`}>{children}</div>;
};
