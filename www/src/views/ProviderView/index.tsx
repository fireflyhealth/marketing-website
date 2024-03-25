import React, { FC } from 'react';
import cn from 'classnames';
import { LinkableDocumentData, Practitioner } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { Link } from '@/atoms/Link';
import { ColorTheme, Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import {
  Header,
  HeaderTextWrapper,
  HeaderSubtitle,
  HeaderTitle,
  Qualifications,
  QualificationSection,
  QualificationItem,
} from './styles';

export type ProviderPageViewProps = {
  provider: Practitioner;
  allProvidersBackLink: LinkableDocumentData;
};

export const ProviderPageView: FC<ProviderPageViewProps> = ({
  provider,
  allProvidersBackLink,
}) => {
  const {
    headerBgThemeColor,
    title,
    name,
    blurb,
    education,
    languagesSpoken,
    headshot,
    cta,
  } = provider;
  return (
    <div>
      <div className="Provider__Header">
        <Link
          link={allProvidersBackLink}
          className="simple-text-link border-black"
        >
          {`< All Providers`}
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
                  {/* Add 'Accepting Patients` status */}
                  {cta && <CTA cta={cta} />}
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
      {provider.contentArea && <ContentArea blocks={provider.contentArea} />}
    </div>
  );
};
