import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { FullWidthBackground } from '@/components/FullWidthBackground';

import { ThemeWrapper, Heading } from './styles';

type Props = {
  simpleTextHeader: SanityTypes.SimpleTextHeader;
};

export const SimpleTextHeader: FC<Props> = ({ simpleTextHeader }) => {
  const { heading, theme } = simpleTextHeader;

  return (
    <Theme theme={theme} className={cn(ThemeWrapper)}>
      <FullWidthBackground backgroundColor={theme} />
      <h1 className={cn(Heading)}>{heading}</h1>
    </Theme>
  );
};
