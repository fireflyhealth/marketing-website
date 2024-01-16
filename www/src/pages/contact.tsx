import React, { FC } from 'react';

import { GetStaticProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { ContactPage as ContactPageType } from '@/types/sanity';
import { ContactPageView } from '@/views/ContactPageView';
import * as Sanity from '@/lib/sanity';
import { ContactMetadata } from '@/components/Metadata/ContactMetadata';

type ContactPageProps = {
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
  if (!contactPage) {
    return { notFound: true };
  }
  return {
    props: { siteSettings, contactPage },
    revalidate: RevalidationTime.Medium,
  };
};

export default ContactPage;
