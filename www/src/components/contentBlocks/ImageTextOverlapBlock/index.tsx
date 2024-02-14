import { FC } from 'react';
import cn from 'classnames';
import { ImageTextOverlapBlock as ImageTextOverlapBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { Theme, ColorTheme } from '@/components/Theme';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { Wrapper, ImageWrapper, TextContainer } from './styles';

type Props = {
  imageTextOverlapBlock: ImageTextOverlapBlockType;
};

export const ImageTextOverlapBlock: FC<Props> = ({ imageTextOverlapBlock }) => {
  const { header, image, copy } = imageTextOverlapBlock;

  return (
    <ContentBlockWrapper header={header}>
      <div className={cn(Wrapper, 'image-text-overlap-block')}>
        <div className={cn(ImageWrapper)}>
          <SanityImage image={image} sizes={['100vw, 85vw']} />
        </div>
        <Theme theme={ColorTheme.Grey}>
          <div className={cn(TextContainer)}>
            <RichText content={copy} />
          </div>
        </Theme>
      </div>
    </ContentBlockWrapper>
  );
};
