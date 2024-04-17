import { useEffect } from 'react';

export function useBodyLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [lock]);
}
