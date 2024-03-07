import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper } from './styles';

export type Props = {
  announcementBanner: SanityTypes.AnnouncementBanner;
};

export const AnnouncementBanner: FC<Props> = ({ announcementBanner }) => {
  return (
    <>
      {announcementBanner && (
        <div className={cn(Wrapper)}>
          <p>{announcementBanner.body}</p>
        </div>
      )}
    </>
  );
};
