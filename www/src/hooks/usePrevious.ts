import { useRef, useEffect } from 'react';

/**
 * Returns the previous value. This can be useful when you need to know
 * when a state has transitioned from one value to the next.
 *
 * Adapted from:
 * https://www.developerway.com/posts/implementing-advanced-use-previous-hook
 */

export const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || null;
};
