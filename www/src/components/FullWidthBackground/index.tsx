import React, { FC } from 'react';
import cn from 'classnames';
import { ColorTheme } from '../Theme';

type Props = {
  backgroundColor: ColorTheme;
};

export const FullWidthBackground: FC<Props> = ({ backgroundColor }) => {
  return <div className={cn(`full-width-background bg-${backgroundColor}`)} />;
};
