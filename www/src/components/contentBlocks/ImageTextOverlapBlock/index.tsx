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
  const { header, image, copy, subnav } = imageTextOverlapBlock;

  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div
        className={cn(
          Wrapper,
          'ImageTextOverlapBlock container-padding-bleed--margin-only-mobile-only',
        )}
      >
        <div className={cn(ImageWrapper)}>
          <SanityImage image={image} sizes={['100vw, 85vw']} />
        </div>
        <Theme theme={ColorTheme.Grey}>
          <div className={cn(TextContainer)}>
            {copy?.body && <RichText content={copy.body} />}
          </div>
        </Theme>
      </div>
    </ContentBlockWrapper>
  );
};
