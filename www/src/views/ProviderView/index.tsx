import React, { FC } from 'react';
import Link from 'next/link';
import { Practitioner } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';

export type ProviderPageViewProps = {
  provider: Practitioner;
};

export const ProviderPageView: FC<ProviderPageViewProps> = ({ provider }) => {
  return (
    <div>
      <div>
        <Link href="/about/care-team">{`< All Providers`}</Link>
      </div>
      <div>{provider.name}</div>
      {provider.contentArea && <ContentArea blocks={provider.contentArea} />}
    </div>
  );
};
