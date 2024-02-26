import { FC } from 'react';
import cn from 'classnames';
import { ImageGridBlock as ImageGridBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '@/components/contentBlocks/ContentBlockWrapper';
import { Theme } from '@/components/Theme';
import { getColorTheme } from '@/utils/theme';
import { Wrapper, ImagesContainer, ImageWrapper } from './styles';

type Props = {
  imageGridBlock: ImageGridBlockType;
};

export const ImageGridBlock: FC<Props> = ({ imageGridBlock }) => {
  const { header, theme, images, subnav } = imageGridBlock;

  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <Theme theme={getColorTheme(theme)}>
        <div className={cn(Wrapper)}>
          <div className={cn(ImagesContainer)}>
            {images.map((image) => (
              <div key={image._key} className={cn(ImageWrapper)}>
                <SanityImage image={image} sizes={['126px']} width={126} />
              </div>
            ))}
          </div>
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
