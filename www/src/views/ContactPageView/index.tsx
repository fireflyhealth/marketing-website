import React, { FC } from 'react';
import { ContactPage } from '@/types/sanity';

type ContactPageViewProps = {
  contactPage: ContactPage;
};

export const ContactPageView: FC<ContactPageViewProps> = ({ contactPage }) => {
  return <div>{contactPage.title}</div>;
};
