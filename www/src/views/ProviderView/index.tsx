import React, { FC } from 'react';
import cn from 'classnames';
import { Practitioner } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { Link } from '@/atoms/Link';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { ColorTheme, Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { ProviderHeader } from './ProviderHeader';
import { PCPBlurbWrapper } from './styles';
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
    isAVeteran,
    headshot,
  } = provider;
  const { allProvidersBackLink, headerCta, pcpBlurb, stories, footer } =
    providerPageSettings;
  return (
    <div>
      <ProviderHeader
        allProvidersBackLink={allProvidersBackLink}
        headerBgThemeColor={headerBgThemeColor}
        isAvailable={isAvailable}
        title={title}
        name={name}
        blurb={blurb}
        education={education}
        languagesSpoken={languagesSpoken}
        isAVeteran={isAVeteran}
        headerCta={headerCta}
        headshot={headshot}
      />
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
