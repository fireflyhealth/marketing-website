import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';

import {
  ThemeWrapper,
  Wrapper,
  WarpperInner,
  Eyebrow,
  Heading,
  Body,
  CTAWrapper,
  Glow,
} from './styles';

type Props = {
  textHeader: SanityTypes.TextHeader;
};

export const TextHeader: FC<Props> = ({ textHeader }) => {
  const { eyebrow, heading, body, theme, cta, gradientBackground } = textHeader;

  return (
    <Theme theme={theme} className={cn(ThemeWrapper)}>
      {gradientBackground && <div className={cn(Glow)}></div>}
      <div className={cn(Wrapper)}>
        <div className={cn(WarpperInner)}>
          {eyebrow && <p className={cn(Eyebrow)}>{eyebrow}</p>}
          <h1 className={cn(Heading)}>{heading}</h1>
          {body && <RichText className={cn(Body)} content={body} />}
          {cta ? (
            <div className={cn(CTAWrapper)}>
              <CTA cta={cta} />
            </div>
          ) : null}
        </div>
      </div>
    </Theme>
  );
};
