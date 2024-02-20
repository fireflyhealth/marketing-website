import { FC } from 'react';
import cn from 'classnames';
import { Card as CardType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { CardItem, Header, Title, Description, ImageWrapper } from './styles';

type Props = {
  card: CardType;
};

export const Card: FC<Props> = ({ card }) => {
  const { title, description, media, cta } = card;

  return (
    <div className={cn(CardItem)}>
      <div className={cn(Header)}>
        <h4 className={cn(Title)}>{title}</h4>
        {/* Update description to be richText */}
        <p className={cn(Description)}>{description}</p>
      </div>
      <div className={cn(ImageWrapper)}>
        <SanityImage image={media.image} sizes={['']} />
      </div>
    </div>
  );
};
