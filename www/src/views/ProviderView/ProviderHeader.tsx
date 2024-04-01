import { FC } from 'react';
import cn from 'classnames';
import {
  Institution,
  KeyedArray,
  LinkableDocumentData,
  Maybe,
  RichText as RichTextType,
  CTA as CTAType,
  RichImage,
} from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { Theme } from '@/components/Theme';
import { ColorTheme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import { SanityImage } from '@/atoms/Image/SanityImage';
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
} from './styles';

type Props = {
  allProvidersBackLink: LinkableDocumentData;
  headerBgThemeColor: Maybe<ColorTheme>;
  isAvailable: Maybe<boolean>;
  role: string;
  name: string;
  blurb: RichTextType;
  education?: Maybe<KeyedArray<Institution>>;
  languagesSpoken: string[];
  isAVeteran?: Maybe<boolean>;
  headerCta: CTAType;
  headshot: Maybe<RichImage>;
};

export const ProviderHeader: FC<Props> = ({
  allProvidersBackLink,
  headerBgThemeColor,
  isAvailable,
  role,
  name,
  blurb,
  education,
  languagesSpoken,
  isAVeteran,
  headerCta,
  headshot,
}) => {
  return (
    <div className="Provider__Header">
      <Link
        link={allProvidersBackLink}
        className="theme-white simple-text-link--with-underline w-max flex flex-row items-center"
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
                <p className={cn(HeaderSubtitle)}>{role}</p>
                <h1 className={cn(HeaderTitle)}>{name}</h1>
                <RichText content={blurb} fontSize="font-size-8 font-roobert" />
                <div className={cn(Qualifications)}>
                  {education && (
                    <div className={cn(QualificationSection)}>
                      <div>
                        <BrandedIcon
                          type="education"
                          wrapperStyles="min-w-6 min-h-6 w-6 h-6 mr-2 inline-block -mb-1"
                          iconStyles="text-color-primary"
                        />
                        {education.map((institution, index) => (
                          <span
                            key={`${institution._key}-${index}`}
                            className={cn(QualificationItem)}
                          >
                            {institution.name}
                            {education.length > 0 &&
                              index < education.length - 1 &&
                              `, `}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {languagesSpoken && (
                    <div className={cn(QualificationSection)}>
                      <BrandedIcon
                        type="languages"
                        wrapperStyles="w-6 h-6"
                        iconStyles="text-color-primary"
                      />
                      <div>
                        {languagesSpoken.map((language, index) => (
                          <span key={index} className={cn(QualificationItem)}>
                            {language}
                            {languagesSpoken.length > 0 &&
                              index < languagesSpoken.length - 1 &&
                              `, `}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {isAVeteran && (
                    <div className={cn(QualificationSection)}>
                      <SimpleIcon
                        type="plus"
                        wrapperStyles="w-6 h-6"
                        iconStyles="theme-text-color-primary"
                      />
                      <span className={cn(QualificationItem)}>Veteran</span>
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
  );
};
