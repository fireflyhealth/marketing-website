import React, { FC } from 'react';
import cn from 'classnames';
import { ContactPage } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { HubspotForm } from '@/components/HubspotForm';
import {
  Wrapper,
  HeaderWrapper,
  Header,
  PageTitle,
  ContactForm,
  BackgroundColor,
  BackgroundImage,
} from './styles';

type ContactPageViewProps = {
  contactPage: ContactPage;
};

export const ContactPageView: FC<ContactPageViewProps> = ({ contactPage }) => {
  const {
    pageTitle,
    pageDescription,
    contactForm,
    backgroundColor,
    backgroundImage,
  } = contactPage;

  return (
    <div className={cn(Wrapper)}>
      <div className={cn(HeaderWrapper)}>
        <div className={cn(Header)}>
          <h1 className={cn(PageTitle)}>{pageTitle}</h1>
          <RichText
            content={pageDescription}
            fontSize="font-size-8 font-roobert theme-text-color-primary"
          />
        </div>
        <div className={cn(ContactForm)}>
          <HubspotForm formId={contactForm.formId} />
        </div>
      </div>
      {backgroundColor && (
        <div
          className={cn(BackgroundColor)}
          style={{ backgroundColor: `${backgroundColor}` }}
        />
      )}
      {backgroundImage && (
        <div className={cn(BackgroundImage)}>
          <SanityImage
            image={backgroundImage}
            sizes={['100vw']}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};
