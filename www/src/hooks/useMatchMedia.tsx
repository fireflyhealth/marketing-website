import { useEffect, useState } from 'react';

export function useMatchMedia(mediaQuery: string) {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    const mediaQueryList = window.matchMedia(mediaQuery);

    setMatches(mediaQueryList.matches);

    /**
     * Before Safari 14, MediaQueryList is based on EventTarget
     * and only supports addListener/removeListener for media queries.
     */
    if (mediaQueryList?.addEventListener) {
      mediaQueryList.addEventListener('change', onChange);
    } else {
      mediaQueryList.addListener(onChange);
    }

    return () => {
      if (mediaQueryList?.removeEventListener) {
        mediaQueryList.removeEventListener('change', onChange);
      } else {
        mediaQueryList.removeListener(onChange);
      }
    };
  }, [mediaQuery]);

  return matches;
}
