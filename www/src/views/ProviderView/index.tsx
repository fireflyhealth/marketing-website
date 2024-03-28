import React, { FC } from 'react';
import cn from 'classnames';
import { Practitioner } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { Link } from '@/atoms/Link';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { ColorTheme, Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import {
  Header,
  HeaderTextWrapper,
  AvailabilityIndicator,
  AvailabilityIndicatorDot,
  HeaderSubtitle,
  HeaderTitle,
  Qualifications,
  QualificationSection,
  QualificationItem,
  PCPBlurbWrapper,
} from './styles';
import { TestimonialBlock } from '@/components/contentBlocks/TestimonialBlock';
import { DoubleCTA } from '@/components/DoubleCTA';

export type ProviderPageViewProps = {
  provider: Practitioner;
};

export const ProviderPageView: FC<ProviderPageViewProps> = ({ provider }) => {
  const {
    providerPageSettings,
    isAvailable,
    headerBgThemeColor,
    title,
    name,
    blurb,
    education,
    languagesSpoken,
    headshot,
  } = provider;
  const { allProvidersBackLink, headerCta, pcpBlurb, stories, footer } =
    providerPageSettings;
  console.log('provider page settings: ', providerPageSettings);
  return (
    <div>
      <div className="Provider__Header">
        <Link
          link={allProvidersBackLink}
          className="simple-text-link border-black w-max flex flex-row items-center"
        >
          <SimpleIcon type="arrow-left" wrapperStyles="w-3 h-3 mr-3" />
          All Providers
        </Link>
        <div className={cn(Header)}>
          <div
            className={cn(
              'TwoUpBlock TwoUpBlock--layout-overlap-50-50 TwoUpBlock--mobileReverse',
            )}
          >
            <div
              className={cn(
                'TwoUpBlock__child',
                `TwoUpBlock__child--richTextChildBlock`,
              )}
            >
              <Theme theme={headerBgThemeColor || ColorTheme.Midnight}>
                <div className={cn(HeaderTextWrapper)}>
                  <div className={cn(AvailabilityIndicator)}>
                    <div
                      className={cn(
                        AvailabilityIndicatorDot,
                        isAvailable ? 'bg-orange-medium' : 'bg-sky-dark',
                      )}
                    />
                    {isAvailable
                      ? 'Accepting new patients'
                      : 'Not accepting new patients'}
                  </div>
                  <p className={cn(HeaderSubtitle)}>{title}</p>
                  <h1 className={cn(HeaderTitle)}>{name}</h1>
                  <RichText
                    content={blurb}
                    fontSize="font-size-8 font-roobert"
                  />
                  <div className={cn(Qualifications)}>
                    {education && (
                      <div className={cn(QualificationSection)}>
                        <BrandedIcon
                          type="education"
                          wrapperStyles="w-6 h-6"
                          iconStyles="text-color-primary"
                        />
                        {education.map((institution, index) => (
                          <span
                            key={institution._key}
                            className={cn(QualificationItem)}
                          >
                            {institution.name}
                            {education.length > 0 &&
                              index < education.length - 1 &&
                              ` ,`}
                          </span>
                        ))}
                      </div>
                    )}
                    {languagesSpoken && (
                      <div className={cn(QualificationSection)}>
                        <BrandedIcon
                          type="languages"
                          wrapperStyles="w-6 h-6"
                          iconStyles="text-color-primary"
                        />
                        {languagesSpoken.map((language, index) => (
                          <span key={index} className={cn(QualificationItem)}>
                            {language}
                            {languagesSpoken.length > 0 &&
                              index < languagesSpoken.length - 1 &&
                              `, `}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <CTA cta={headerCta} />
                </div>
              </Theme>
            </div>
            <div
              className={cn(
                'TwoUpBlock__child',
                `TwoUpBlock__child--imageChildBlock`,
              )}
            >
              <Theme theme={headerBgThemeColor || ColorTheme.Midnight}>
                <div className={cn('theme-bg-color rounded-2xl')}>
                  {headshot && (
                    <SanityImage
                      sizes={['100vw', '50vw']}
                      image={headshot}
                      rounded={false}
                      className={cn('rounded-2xl')}
                    />
                  )}
                </div>
              </Theme>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(PCPBlurbWrapper)}>
        <RichText content={pcpBlurb} fontSize="font-trust font-size-6" />
      </div>
      {provider.contentArea && <ContentArea blocks={provider.contentArea} />}
      <TestimonialBlock testimonialBlock={stories} />
      <div className="">
        <Link
          link={allProvidersBackLink}
          className="my-24 mx-auto flex flex-row items-center cta transition-all cta--primary lg:w-max"
        >
          <SimpleIcon type="arrow-left" wrapperStyles="w-3 h-3 mr-3" />
          Care team
        </Link>
      </div>
      <Theme theme={ColorTheme.Grey} className="relative p-4 lg:p-12">
        <div className="full-width-background theme-bg-color" />
        <DoubleCTA doubleCta={footer} />
      </Theme>
    </div>
  );
};
