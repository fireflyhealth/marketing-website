import React, { FC } from 'react';
import cn from 'classnames';

type Props = {
  backgroundColor: string;
};

export const FullWidthBackground: FC<Props> = ({ backgroundColor }) => {
  return <div className={cn(`full-width-background bg-${backgroundColor}`)} />;
};
