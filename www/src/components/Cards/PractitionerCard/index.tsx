import React, { FC } from 'react';
import { PractitionerLinkData } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { MaybeLink } from '@/atoms/Link';
import { GenericImage } from '@/atoms/Image/GenericImage';
import fallbackProfile from '@/assets/images/fallbackProfile.png';

type PractitionerCardProps = {
  practitioner: PractitionerLinkData;
};

export const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
}) => {
  console.log('practioner card: ', practitioner);
  return (
    <div className="PractitionerCard">
      <div className="rounded-[1rem] overflow-hidden relative">
        <MaybeLink
          className="PractitionerCard__link"
          link={practitioner.renderProviderPage ? practitioner : null}
          ariaLabel={`View ${practitioner.name}'s profile page`}
        >
          {practitioner.headshot ? (
            <SanityImage
              aspectRatio={408 / 300}
              image={practitioner.headshot}
              sizes={['50vw', '50vw', '25vw']}
              className="rounded-xl"
            />
          ) : (
            <GenericImage
              aspectRatio={408 / 300}
              src={fallbackProfile}
              alt="Generic profile photo"
              sizes={['50vw', '50vw', '25vw']}
              className="rounded-xl"
            />
          )}
        </MaybeLink>
      </div>
      <div className="font-trust font-size-6 pt-4">
        {practitioner.name}{' '}
        <span className="font-roobert font-size-7 ml-[0.1em]">
          {practitioner.qualifications}
        </span>
      </div>
      <div className="font-size-8 theme-text-color-secondary">
        {practitioner.role.role},{' '}
        <span className="whitespace-nowrap">{practitioner.pronouns}</span>
      </div>
    </div>
  );
};
