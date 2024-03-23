import { useRef } from 'react';
import { SanityClient, SourceClientOptions, useClient } from 'sanity';

export const useMemoizedClient = (
  options?: SourceClientOptions,
): SanityClient => {
  const client = useClient(options);
  const clientRef = useRef(client);
  return clientRef.current;
};
