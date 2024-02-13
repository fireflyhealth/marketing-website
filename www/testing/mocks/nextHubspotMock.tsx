import { FC, ReactNode } from 'react';

const HubspotProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

const useHubspotForm = (args: {
  portalId: string;
  formId: string;
  target: string;
}) => {
  return undefined;
};

const mock = {
  HubspotProvider,
  useHubspotForm,
};

export default mock;
