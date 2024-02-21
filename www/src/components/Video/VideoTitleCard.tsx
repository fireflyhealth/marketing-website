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
  CTA,
} from './styles';

type Props = {
  eyebrow: string;
  heading: string;
  body: SanityTypes.RichText;
  onClick: () => void;
};

export const VideoTitleCard: FC<Props> = ({
  eyebrow,
  heading,
  body,
  onClick,
}) => {
  return (
    <div className={cn(TitleCardWrapper)}>
      <div className={cn(ContentWrapper)}>
        <p className={cn(Eyebrow)}>{eyebrow}</p>
        <h1 className={cn(Heading)}>{heading}</h1>
        <RichText content={body} />
      </div>
      <div className={cn(CTA)}>
        <SimpleIcon type="play" className="w-4 theme-text-color-primary" />
        <Button
          id="video-title-card-button"
          label="Play video"
          onClick={onClick}
          variant="textLink"
        />
      </div>
    </div>
  );
};
