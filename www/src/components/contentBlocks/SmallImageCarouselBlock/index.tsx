import { FC } from 'react';
import cn from 'classnames';
import {
  SmallImageCarouselBlock as SmallImageCarouselBlockType,
  RichImage,
} from '@/types/sanity';
import { Carousel } from '@/components/Carousel';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import {
  BlockWrapper,
  CarouselItem as CarouselItemStyle,
  Image,
} from './styles';

type Props = {
  smallImageCarouselBlock: SmallImageCarouselBlockType;
};

const CarouselItem: FC<{ image: RichImage }> = ({ image }) => {
  return (
    <div className={cn(CarouselItemStyle)}>
      <SanityImage
        className={cn(Image)}
        image={image}
        sizes={['90vw', '50vw', '25vw']}
      />
    </div>
  );
};

export const SmallImageCarouselBlock: FC<Props> = ({
  smallImageCarouselBlock,
}) => {
  const { header, subnav, images } = smallImageCarouselBlock;

  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <div
        className={cn(BlockWrapper, {
          'pt-12': !header,
        })}
      >
        <Carousel>
          {images.map((image) => (
            <CarouselItem key={image._key} image={image} />
          ))}
        </Carousel>
      </div>
    </ContentBlockWrapper>
  );
};
