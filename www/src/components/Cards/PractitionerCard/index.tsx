import React, { FC } from 'react';
import { PractitionerLinkData } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';

type PractitionerCardProps = {
  practitioner: PractitionerLinkData;
};

export const PractitionerCard: FC<PractitionerCardProps> = ({
  practitioner,
}) => {
  return (
    <div>
      <div className="rounded-[1rem] overflow-hidden mb-4">
        <SanityImage
          aspectRatio={408 / 300}
          image={practitioner.headshot}
          sizes={['50vw', '50vw', '25vw']}
        />
      </div>
      <div className="font-trust font-size-6">
        {practitioner.name}
        <span className="font-roobert font-size-7 ml-[0.3em]">
          {practitioner.qualifications}
        </span>
      </div>
      <div className="font-size-8 theme-text-color-secondary">
        {practitioner.title}, {practitioner.pronouns}
      </div>
    </div>
  );
};
