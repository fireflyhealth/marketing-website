import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { RichText } from '../RichText';
import { Wrapper } from './styles';

export type Props = {
  announcementBanner: SanityTypes.AnnouncementBanner;
};

export const AnnouncementBanner: FC<Props> = ({ announcementBanner }) => {
  const { text } = announcementBanner;

  return (
    <>
      {announcementBanner && text && (
        <div className={cn(Wrapper)}>
          {text && (
            <RichText
              content={text}
              className="text-center font-trust"
              textColor="text-yellow-light"
              fontSize="font-size-9"
              alignCenter
            />
          )}
        </div>
      )}
    </>
  );
};
