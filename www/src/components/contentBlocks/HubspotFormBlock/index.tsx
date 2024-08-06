import React, { FC } from 'react';
import { HubspotFormBlock as HubspotFormBlockType } from '@/types/sanity';
import HubspotForm from '@/components/HubspotForm';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type FeaturedStoriesBlockProps = {
  hubspotFormBlock: HubspotFormBlockType;
};

export const HubspotFormBlock: FC<FeaturedStoriesBlockProps> = ({
  hubspotFormBlock,
}) => {
  const { header, form, subnav } = hubspotFormBlock;

  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <HubspotForm formId={form.formId} renderInRichtext />
    </ContentBlockWrapper>
  );
};
