import React, { FC } from 'react';
import cn from 'classnames';
import { NotFoundPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';

type NotFoundPageViewProps = {
  notFoundPage: NotFoundPage;
};

export const NotFoundPageView: FC<NotFoundPageViewProps> = ({
  notFoundPage,
}) => {
  return (
    <div className="relative">
      <HeaderArea block={notFoundPage.header} />
      <ContentArea blocks={notFoundPage.content} />
      <div className={cn('w-full block', 'lg:absolute lg:left-0 lg:top-1/4')}>
        <div
          className={cn(
            'relative w-[321px] h-[321px] mx-auto',
            'lg:m-0 lg:h-[613px]',
          )}
        >
          <ResponsiveSanityImage
            imageSet={notFoundPage.decorativeImage}
            sizes={['100vw']}
          />
        </div>
      </div>
    </div>
  );
};
