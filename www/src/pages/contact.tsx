import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { ContactPage as ContactPageType } from '@/types/sanity';
import { ContactPageView } from '@/views/ContactPageView';
import * as Sanity from '@/lib/sanity';

type ContactPageProps = {
  contactPage: ContactPageType;
};

const ContactPage: FC<ContactPageProps> = ({ contactPage }) => {
  return <ContactPageView contactPage={contactPage} />;
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  const contactPage = await Sanity.contactPage.get();
  if (!contactPage) {
    return { notFound: true };
  }
  return {
    props: { contactPage },
  };
};

export default ContactPage;
