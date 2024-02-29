import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper } from './styles';

export type Props = {
  announcementBanner: SanityTypes.AnnouncementBanner;
};

export const AnnouncementBanner: FC<Props> = ({ announcementBanner }) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [bannerHeight, setBannerHeight] = useState<number>(0);

  // dynamically set height of announcement banner
  useEffect(() => {
    if (!bannerRef.current) return;

    if (bannerHeight === 0) {
      setBannerHeight(bannerRef.current.offsetHeight);
    }

    if (announcementBanner) {
      bannerRef.current.offsetHeight &&
        document.documentElement.style.setProperty(
          '--announcement-banner-height',
          `${bannerRef.current.offsetHeight}px`,
        );
    } else
      document.documentElement.style.setProperty(
        '--announcement-banner-height',
        '0px',
      );

    // reset bannerHeight and value of '--announcement-banner-height' as the window resizes
    window.addEventListener('resize', () => {
      if (!bannerRef.current) return;
      if (bannerHeight != bannerRef.current.offsetHeight) {
        setBannerHeight(bannerRef.current.offsetHeight);
        document.documentElement.style.setProperty(
          '--announcement-banner-height',
          `${bannerRef.current.offsetHeight}px`,
        );
      }
    });
  }, [bannerRef, announcementBanner, bannerHeight]);
  return (
    <>
      {announcementBanner && (
        <div
          ref={bannerRef}
          className={cn(Wrapper, announcementBanner ? 'absolute' : 'hidden')}
        >
          <p>{announcementBanner.body}</p>
        </div>
      )}
    </>
  );
};
