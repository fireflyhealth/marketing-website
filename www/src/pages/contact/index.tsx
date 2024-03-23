import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { ContactPage as ContactPageType } from '@/types/sanity';
import { ContactPageView } from '@/views/ContactPageView';
import * as Sanity from '@/lib/sanity';
import { ContactMetadata } from '@/components/Metadata/ContactMetadata';

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

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const [siteSettings, contactPage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.contactPage.get(),
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

export default ContactPage;
