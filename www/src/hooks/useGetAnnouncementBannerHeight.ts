import { useEffect, useState } from 'react';

export const useGetAnnouncementBannerHeight = () => {
  const [state, setState] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    /* Debounce updating state for 150ms */
    const debouncedHandleResize = () => {
      const announcementBanner =
        document.getElementsByClassName('AnnouncementBanner')[0];

      if (announcementBanner) {
        const height = announcementBanner.clientHeight;

        timer = setTimeout(() => {
          setState(height);
        }, 150);
      }
    };

    window.addEventListener('resize', debouncedHandleResize);
    debouncedHandleResize();

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return state;
};
