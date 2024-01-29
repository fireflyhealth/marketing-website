import { FC, useEffect, useRef } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper } from './styles';

export type Props = {
  announcementBanner: SanityTypes.AnnouncementBanner;
};

export const AnnouncementBanner: FC<Props> = ({ announcementBanner }) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // dynamically set height of announcement banner
  useEffect(() => {
    if (!bannerRef.current) return;

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
  }, [bannerRef, announcementBanner]);
  return (
    <div
      ref={bannerRef}
      className={cn(Wrapper, announcementBanner ? 'absolute' : 'hidden')}
    >
      <p>{announcementBanner.body}</p>
    </div>
  );
};
