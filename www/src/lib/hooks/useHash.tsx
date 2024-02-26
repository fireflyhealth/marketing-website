import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () =>
  typeof window !== 'undefined' ? window.location.hash : undefined;

export const useHash = () => {
  const [isClient, setIsClient] = useState(false);
  const [hash, setHash] = useState(getHash());
  const params = useParams();

  useEffect(() => {
    setIsClient(true);
    setHash(getHash());

    const onHashChanged = () => {
      setHash(getHash());
    };

    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  }, [params]);

  return isClient ? hash?.slice(1) : null;
};
