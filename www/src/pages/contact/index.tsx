import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { ContactPage as ContactPageType } from '@/types/sanity';
import { ContactPageView } from '@/views/ContactPageView';
import * as Sanity from '@/lib/sanity';
import { ContactMetadata } from '@/components/Metadata/ContactMetadata';
import { QueryConfig } from '@/lib/sanity';

export type ContactPageProps = PageProps & {
  contactPage: ContactPageType;
};

const ContactPage: FC<ContactPageProps> = ({ contactPage }) => {
  return (
    <>
      <ContactMetadata contactPage={contactPage} />
      <ContactPageView contactPage={contactPage} />
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<ContactPageProps> =>
  async () => {
    const [siteSettings, contactPage] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.contactPage.get(config),
    ]);

    const navigationOverrides = contactPage?.navigationOverrides;

    if (!contactPage) {
      return { notFound: true };
    }
    return {
      props: {
        siteSettings,
        contactPage,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };
export const getStaticProps = createGetStaticProps();

export default ContactPage;
