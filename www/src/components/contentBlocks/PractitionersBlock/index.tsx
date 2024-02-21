import React, { FC, useState } from 'react';
import cn from 'classnames';

import { PractitionersBlock as PractitionersBlockType } from '@/types/sanity';
import { PractitionerCard } from '@/components/Cards/PractitionerCard';
import { Button } from '@/atoms/Button';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { PractitionersBlockCards } from './styles';

type PractitionersBlockProps = {
  practitionersBlock: PractitionersBlockType;
};

export const PractitionersBlock: FC<PractitionersBlockProps> = ({
  practitionersBlock,
}) => {
  const [showMoreEnabled, setShowMoreEnabled] = useState(false);
  const { header, practitioners, id } = practitionersBlock;

  const enableShowMore = () => setShowMoreEnabled(true);
  return (
    <ContentBlockWrapper id={id} header={header}>
      <div
        className={cn(
          'PractitionersBlock',
          /* The amount of initially visible practitioners differs on
           * mobile, so instead of slicing our array we can use CSS
           * to hide the extra ones. See styles/contentBlocks */
          showMoreEnabled ? '' : 'PractitionersBlock--unexpanded',
        )}
      >
        <div className={cn(PractitionersBlockCards)}>
          {practitioners.map((practitioner, index) => (
            <div
              key={practitioner._id}
              className={cn(
                'PractitionerCardWrapper',
                showMoreEnabled === false && index >= 12
                  ? 'hidden'
                  : showMoreEnabled === false && index >= 8
                    ? 'hidden md:block'
                    : 'block',
              )}
            >
              <PractitionerCard practitioner={practitioner} />
            </div>
          ))}
        </div>
        <div
          data-testid="showMoreButton--desktop"
          className={cn(
            showMoreEnabled === false && practitioners.length > 12
              ? 'hidden md:block'
              : 'hidden',
          )}
        >
          <Button
            variant="secondary"
            label="Show more"
            align="center"
            width="auto"
            id="practitionersblock-show-more-desktop"
            onClick={enableShowMore}
          />
        </div>
        <div
          data-testid="showMoreButton--mobile"
          className={cn(
            showMoreEnabled === false && practitioners.length > 8
              ? 'md:hidden'
              : 'hidden',
          )}
        >
          <Button
            variant="secondary"
            label="Show more"
            align="center"
            width="auto"
            id="practitionersblock-show-more-mobile"
            onClick={enableShowMore}
          />
        </div>
      </div>
    </ContentBlockWrapper>
  );
};
