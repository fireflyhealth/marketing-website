import React, { FC } from 'react';
import { PractitionerLinkData } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { RichText } from '@/components/RichText';
import { ColorTheme, Theme } from '@/components/Theme';
import { Link } from '@/atoms/Link';
import { GenericImage } from '@/atoms/Image/GenericImage';
import fallbackProfile from '@/assets/images/fallbackProfile.png';

type PractitionerCardProps = {
  practitioner: PractitionerLinkData;
};

export const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
}) => {
  return (
    <div>
      <div className="PractitionerCard__headshot rounded-[1rem] overflow-hidden relative">
        <Link
          link={practitioner}
          ariaLabel={`View ${practitioner.name}'s profile page`}
        >
          {practitioner.headshot ? (
            <SanityImage
              aspectRatio={408 / 300}
              image={practitioner.headshot}
              sizes={['50vw', '50vw', '25vw']}
            />
          ) : (
            <GenericImage
              aspectRatio={408 / 300}
              src={fallbackProfile}
              alt="Generic profile photo"
              sizes={['50vw', '50vw', '25vw']}
            />
          )}
          <div className="PractitionerCard__blurb">
            <Theme
              className="p-4 h-full md:p-6 theme-bg-color overflow-scroll"
              theme={ColorTheme.Midnight}
            >
              <RichText content={practitioner.blurb} />
            </Theme>
          </div>
        </Link>
      </div>
      <div className="font-trust font-size-6 pt-4">
        {practitioner.name}{' '}
        <span className="font-roobert font-size-7 ml-[0.1em]">
          {practitioner.qualifications}
        </span>
      </div>
      <div className="font-size-8 theme-text-color-secondary">
        {practitioner.title},{' '}
        <span className="whitespace-nowrap">{practitioner.pronouns}</span>
      </div>
    </div>
  );
};
