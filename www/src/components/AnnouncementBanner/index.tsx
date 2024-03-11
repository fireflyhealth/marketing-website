import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper } from './styles';
import { RichText } from '../RichText';

export type Props = {
  announcementBanner: SanityTypes.AnnouncementBanner;
};

export const AnnouncementBanner: FC<Props> = ({ announcementBanner }) => {
  const { body } = announcementBanner;

  return (
    <>
      {announcementBanner && (
        <div className={cn(Wrapper)}>
          {body && (
            <RichText
              content={body}
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
