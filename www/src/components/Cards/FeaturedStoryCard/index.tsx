import React, { FC } from 'react';
import { BlogArticleLinkData } from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ColorTheme, Theme } from '@/components/Theme';
import { LinkButton } from '@/atoms/Button';
import { formatSanityDate } from '@/utils/text';

type FeaturedStoryCardProps = {
  story: BlogArticleLinkData;
};

export const FeaturedStoryCard: FC<FeaturedStoryCardProps> = ({ story }) => {
  const { title, thumbnail, publishDate, slug } = story;
  const linkButtonId = `featuredStoryCard-${slug.current}`;
  return (
    <Theme theme={ColorTheme.Sienna} className="h-full">
      <div className="theme-bg-color rounded-xl h-full overflow-hidden flex flex-col">
        {thumbnail ? (
          <div className="md:hidden">
            <Link link={story}>
              <SanityImage
                rounded={false}
                image={thumbnail}
                sizes={['100vw']}
              />
            </Link>
          </div>
        ) : null}
        <div className="hidden md:block flex-grow relative md:h-[430px]">
          {thumbnail ? (
            <Link link={story}>
              <SanityImage
                rounded={false}
                image={thumbnail}
                fill
                sizes={['100vw', '60vw']}
              />
            </Link>
          ) : null}
        </div>
        <div className="p-6 md:p-8">
          <h3 className="font-size-6 font-trust">{title}</h3>
          <div className="py-3 md:py-4 theme-text-color-secondary">
            {formatSanityDate(publishDate)}
          </div>
          <LinkButton
            id={linkButtonId}
            link={story}
            align="left"
            variant="textLink"
            label="Read this story"
          />
        </div>
      </div>
    </Theme>
  );
};
