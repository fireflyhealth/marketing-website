import { FC } from 'react';
import cn from 'classnames';
import { Wrapper } from './styles';

export type Props = {
  announcementBanner: string;
};

export const AnnouncementBanner: FC<Props> = ({ announcementBanner }) => {
  return (
    <div className={cn(Wrapper)}>
      <p>{announcementBanner}</p>
    </div>
  );
};
