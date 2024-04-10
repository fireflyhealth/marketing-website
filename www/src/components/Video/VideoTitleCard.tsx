import { FC } from 'react';
import cn from 'classnames';
import { Button } from '@/atoms/Button';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as SanityTypes from '@/types/sanity';
import { RichText } from '../RichText';
import {
  TitleCardWrapper,
  ContentWrapper,
  Eyebrow,
  Heading,
  Body,
  CTA,
} from './styles';

type Props = {
  eyebrow: string;
  heading: string;
  body: SanityTypes.RichText;
  onClick: () => void;
  isPlaying: boolean;
  wrapperClassName?: string;
};

export const VideoTitleCard: FC<Props> = ({
  eyebrow,
  heading,
  body,
  onClick,
  isPlaying,
  wrapperClassName,
}) => {
  return (
    <div className={cn(TitleCardWrapper, wrapperClassName)}>
      <div className={cn(ContentWrapper)}>
        <p className={cn(Eyebrow)}>{eyebrow}</p>
        <h1 className={cn(Heading)}>{heading}</h1>
        <RichText className={cn(Body)} content={body} />
      </div>
      <div className={cn(CTA)}>
        <SimpleIcon
          type={isPlaying ? 'pause' : 'play'}
          wrapperStyles="w-4 theme-text-color-primary"
        />
        <Button
          id="video-title-card-button"
          label={isPlaying ? 'Pause video' : 'Play video'}
          onClick={onClick}
          variant="textLink"
        />
      </div>
    </div>
  );
};
