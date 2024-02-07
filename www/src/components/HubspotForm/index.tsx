// next-hubspot documentation: https://github.com/snelsi/next-hubspot?tab=readme-ov-file

import { FC } from 'react';
import { useHubspotForm } from 'next-hubspot';
import cn from 'classnames';
import { Wrapper } from './styles';

type Props = {
  formId: string;
  // renderInRichtext gives component context to render specific styles
  renderInRichtext?: boolean;
};

export const HubspotForm: FC<Props> = ({ formId, renderInRichtext }) => {
  // injects Hubspot
  useHubspotForm({
    portalId: '5975513',
    formId: formId,
    // CSS selector where form should be embedded
    target: '#hubspot-form-wrapper',
  });

  return (
    <div
      id="hubspot"
      className={cn(Wrapper, renderInRichtext ? 'theme-grey' : 'theme-white')}
    >
      {/* Form styling handled in globals.css */}
      <div id="hubspot-form-wrapper" />
    </div>
  );
};
