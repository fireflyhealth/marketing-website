import React, { FC } from 'react';

import { LinkableDocumentData, Practitioner } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { Link } from '@/atoms/Link';

export type ProviderPageViewProps = {
  provider: Practitioner;
  allProvidersBackLink: LinkableDocumentData;
};

export const ProviderPageView: FC<ProviderPageViewProps> = ({
  provider,
  allProvidersBackLink,
}) => {
  return (
    <div>
      <div>
        <Link link={allProvidersBackLink}>{`<All Providers`}</Link>
      </div>
      <div>{provider.name}</div>
      {provider.contentArea && <ContentArea blocks={provider.contentArea} />}
    </div>
  );
};
