import { FC, useState, useEffect } from 'react';
import cn from 'classnames';

import * as SanityTypes from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import { Link } from '@/atoms/Link';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';
import { useGetAnnouncementBannerHeight } from '@/hooks/useGetAnnouncementBannerHeight';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import {
  DESKTOP_NAV_HEIGHT,
  TABLET_NAV_HEIGHT,
  BREAK_POINTS_MD,
  BREAK_POINTS_LG,
} from '@/constants';

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
  DualCtaWrapperContainer,
} from './styles';

const DualCta: FC<{
  cta: SanityTypes.TextWithDualCtaHeaderCta;
  position: 'top' | 'bottom';
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActive: boolean;
  isInactive: boolean;
}> = ({ cta, position, onMouseEnter, onMouseLeave, isActive, isInactive }) => {
  const { image, eyebrow, label, link, ariaLabel, theme } = cta;
  const isTop = position === 'top';

  return (
    <Link
      className={cn(DualCtaStyles, isTop ? DualCtaTop : DualCtaBottom, {
        'TextWithDualCtaHeader__cta--active': isActive,
        'TextWithDualCtaHeader__cta--inactive': isInactive,
      })}
      link={link}
      ariaLabel={ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Theme className={cn(DualCtaTheme, 'relative rounded-2xl')} theme={theme}>
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
          rounded={false}
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
  const [windowHeightWithoutNav, setWindowHeightWithoutNav] =
    useState<string>('100vh');
  const [activeCta, setActiveCta] = useState<'top' | 'bottom' | null>(null);

  const announcementBannerHeight = useGetAnnouncementBannerHeight();
  const windowDimentions = useWindowDimensions();

  useEffect(() => {
    const announcementBannerHeightNumber = announcementBannerHeight ?? 0;
    const windowDimentionHeightNumber = windowDimentions?.height ?? 0;
    const windowDimentionWidthtNumber = windowDimentions?.width ?? 0;

    if (windowDimentionWidthtNumber >= BREAK_POINTS_LG) {
      setWindowHeightWithoutNav(
        `${
          windowDimentionHeightNumber -
          DESKTOP_NAV_HEIGHT -
          announcementBannerHeightNumber
        }px`,
      );
    } else if (windowDimentionWidthtNumber >= BREAK_POINTS_MD) {
      setWindowHeightWithoutNav(
        `${
          windowDimentionHeightNumber -
          TABLET_NAV_HEIGHT -
          announcementBannerHeightNumber
        }px`,
      );
    } else {
      setWindowHeightWithoutNav('unset');
    }
  }, [
    announcementBannerHeight,
    windowDimentions,
    DESKTOP_NAV_HEIGHT,
    TABLET_NAV_HEIGHT,
  ]);

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
      <div
        className={cn(DualCtaWrapperContainer)}
        style={{
          height: windowHeightWithoutNav,
        }}
      >
        <div className={cn(DualCtaWrapper)}>
          <DualCta
            cta={topCta}
            position="top"
            onMouseEnter={() => {
              setActiveCta('top');
            }}
            onMouseLeave={() => {
              setActiveCta(null);
            }}
            isActive={activeCta === 'top'}
            isInactive={activeCta === 'bottom'}
          />
          <DualCta
            cta={bottomCta}
            position="bottom"
            onMouseEnter={() => {
              setActiveCta('bottom');
            }}
            onMouseLeave={() => {
              setActiveCta(null);
            }}
            isActive={activeCta === 'bottom'}
            isInactive={activeCta === 'top'}
          />
        </div>
      </div>
    </Theme>
  );
};
