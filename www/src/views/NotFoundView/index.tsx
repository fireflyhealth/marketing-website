import React, { FC } from 'react';
import cn from 'classnames';
import { NotFoundPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';
import {
  Wrapper,
  DecorativeImageWrapper,
  Image,
  DecorativeImageWrapperContainer,
} from './styles';

type NotFoundPageViewProps = {
  notFoundPage: NotFoundPage;
};

export const NotFoundPageView: FC<NotFoundPageViewProps> = ({
  notFoundPage,
}) => {
  return (
    <div className={cn(Wrapper)}>
      <HeaderArea block={notFoundPage.header} />
      <ContentArea blocks={notFoundPage.content} />
      <div className={cn(DecorativeImageWrapperContainer)}>
        <div className={cn(DecorativeImageWrapper)}>
          <div className={cn(Image)}>
            <ResponsiveSanityImage
              imageSet={notFoundPage.decorativeImage}
              sizes={['321px']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
