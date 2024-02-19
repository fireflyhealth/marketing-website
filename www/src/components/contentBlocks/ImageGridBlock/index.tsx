import { FC } from 'react';
import cn from 'classnames';
import { ImageGridBlock as ImageGridBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockHeader } from '@/components/contentBlocks/ContentBlockWrapper';
import { Wrapper, Header, ImagesContainer, ImageWrapper } from './styles';

type Props = {
  imageGridBlock: ImageGridBlockType;
};

export const ImageGridBlock: FC<Props> = ({ imageGridBlock }) => {
  const { header, images } = imageGridBlock;

  return (
    <div className={cn(Wrapper)}>
      <div className={cn(Header)}>
        {header && <ContentBlockHeader header={header} />}
      </div>
      <div className={cn(ImagesContainer)}>
        {images.map((image) => (
          <div key={image._key} className={cn(ImageWrapper)}>
            <SanityImage image={image} sizes={['126px']} width={126} />
          </div>
        ))}
      </div>
    </div>
  );
};
