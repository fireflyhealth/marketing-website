import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Theme } from '@/components/Theme';

import { ThemeWrapper, Heading } from './styles';

type Props = {
  simpleTextHeader: SanityTypes.SimpleTextHeader;
};

export const SimpleTextHeader: FC<Props> = ({ simpleTextHeader }) => {
  const { heading, theme } = simpleTextHeader;

  return (
    <Theme theme={theme} className={cn(ThemeWrapper)}>
      <h1 className={cn(Heading)}>{heading}</h1>
    </Theme>
  );
};
