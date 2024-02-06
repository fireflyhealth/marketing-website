import { FC } from 'react';
import { useHubspotForm } from 'next-hubspot';
import cn from 'classnames';
import { Wrapper } from './styles';

type Props = {
  formId: string;
  // pageContext determines the theme for the form
  pageContext: 'articleRichText' | 'contactPage';
};

export const HubspotForm: FC<Props> = ({ formId, pageContext }) => {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId: '5975513',
    formId: formId,
    target: '#hubspot-form-wrapper',
  });

  return (
    <div
      className={cn(
        Wrapper,
        pageContext === 'articleRichText' ? 'theme-grey' : 'theme-white',
      )}
    >
      {/* Form styling handled in globals.css */}
      <div id="hubspot-form-wrapper" />
    </div>
  );
};
