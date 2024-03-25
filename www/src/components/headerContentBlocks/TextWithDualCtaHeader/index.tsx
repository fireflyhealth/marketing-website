import { FC } from 'react';
import cn from 'classnames';

import * as SanityTypes from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import { Link } from '@/atoms/Link';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';

import {
  ThemeWrapper,
  Wrapper,
  WarpperInner,
  Eyebrow,
  Heading,
  Body,
  CTAWrapper,
  CTAsWrapper,
  DualCtaWrapper,
  DualCta as DualCtaStyles,
  DualCtaImage,
  DualCtaImageTop,
  DualCtaImageBottom,
  ButtonEyebrow,
  ButtonLabel,
  ButtonTextContentWrapper,
  ButtonContentWrapper,
  DualCtaTop,
  DualCtaBottom,
  DualCtaTheme,
} from './styles';

const DualCta: FC<{
  cta: SanityTypes.TextWithDualCtaHeaderCta;
  position: 'top' | 'bottom';
}> = ({ cta, position }) => {
  const { image, eyebrow, label, link, ariaLabel, theme } = cta;
  const isTop = position === 'top';

  return (
    <Link
      className={cn(DualCtaStyles, isTop ? DualCtaTop : DualCtaBottom)}
      link={link}
      ariaLabel={ariaLabel}
    >
      <Theme className={cn(DualCtaTheme, 'relative')} theme={theme}>
        <div className={cn(ButtonContentWrapper)}>
          {eyebrow && <p className={cn(ButtonEyebrow)}>{eyebrow}</p>}
          <div className={cn(ButtonTextContentWrapper)}>
            <p className={cn(ButtonLabel)}>{label}</p>
            <BrandedIcon
              type="arrow-right"
              wrapperStyles="w-12"
              iconStyles="theme-white"
            />
          </div>
        </div>
        <ResponsiveSanityImage
          imageSet={image}
          sizes={['42vw, 50vw, 100vw']}
          className={cn(
            DualCtaImage,
            isTop ? DualCtaImageTop : DualCtaImageBottom,
          )}
          priority
        />
      </Theme>
    </Link>
  );
};

type Props = {
  textWithDualCtaHeader: SanityTypes.TextWithDualCtaHeader;
};

export const TextWithDualCtaHeader: FC<Props> = ({ textWithDualCtaHeader }) => {
  const { eyebrow, heading, body, theme, ctas, topCta, bottomCta } =
    textWithDualCtaHeader;

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
      <div className={cn(DualCtaWrapper)}>
        <DualCta cta={topCta} position="top" />
        <DualCta cta={bottomCta} position="bottom" />
      </div>
    </Theme>
  );
};
