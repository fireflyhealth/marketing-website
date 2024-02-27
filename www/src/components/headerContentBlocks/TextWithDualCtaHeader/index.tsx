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
  CTAsWrapper,
} from './styles';

type Props = {
  texWithDualCtaHeader: SanityTypes.TextWithDualCtaHeader;
};

export const TexWithDualCtaHeader: FC<Props> = ({ texWithDualCtaHeader }) => {
  const { eyebrow, heading, body, theme, ctas } = texWithDualCtaHeader;

  return (
    <Theme theme={theme} className={cn(ThemeWrapper)}>
      <div className={cn(Wrapper)}>
        <div className={cn(WarpperInner)}>
          {eyebrow && <p className={cn(Eyebrow)}>{eyebrow}</p>}
          <h1 className={cn(Heading)}>{heading}</h1>
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
