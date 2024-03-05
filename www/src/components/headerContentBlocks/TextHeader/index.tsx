import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { FullWidthBackground } from '@/components/FullWidthBackground';
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
  CTAsWrapper,
  Glow,
} from './styles';

type Props = {
  textHeader: SanityTypes.TextHeader;
};

export const TextHeader: FC<Props> = ({ textHeader }) => {
  const { eyebrow, heading, body, theme, ctas, gradientBackground } =
    textHeader;

  const lines = heading.split('\n');

  return (
    <Theme theme={theme} className={cn(ThemeWrapper)}>
      {gradientBackground && <div className={cn(Glow)}></div>}
      {theme && !gradientBackground && (
        <FullWidthBackground backgroundColor={theme} />
      )}
      <div className={cn(Wrapper)}>
        <div className={cn(WarpperInner)}>
          {eyebrow && <p className={cn(Eyebrow)}>{eyebrow}</p>}
          <h1 className={cn(Heading)}>
            {lines.map((line, index) => (
              <span key={index} className="inline-block w-full">
                {line}
              </span>
            ))}
          </h1>
          {body && <RichText className={cn(Body)} content={body} />}
          {ctas?.length > 0 ? (
            <div className={cn(CTAsWrapper)}>
              {ctas.map((cta) => (
                <div key={cta.id} className={cn(CTAWrapper)}>
                  <CTA cta={cta} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Theme>
  );
};
