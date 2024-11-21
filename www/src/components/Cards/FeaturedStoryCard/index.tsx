import React, { FC } from 'react';
import { BlogArticleLinkData } from '@/types/sanity';
import { Link } from '@/atoms/Link';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ColorTheme, Theme } from '@/components/Theme';
import { LinkButton } from '@/atoms/Button';
import { formatSanityDate } from '@/utils/text';
import { language } from '@/language';

type FeaturedStoryCardProps = {
  story: BlogArticleLinkData;
};

export const FeaturedStoryCard: FC<FeaturedStoryCardProps> = ({ story }) => {
  const { title, thumbnail, publishDate, slug } = story;
  const linkButtonId = `featuredStoryCard-${slug.current}`;
  return (
    <Theme theme={ColorTheme.Sienna} className="h-full">
      <div className="theme-bg-color rounded-xl h-full overflow-hidden flex flex-col">
        <div className="md:hidden">
          <Link link={story}>
            <SanityImage
              rounded={false}
              image={thumbnail}
              sizes={['100vw']}
              noCaption={true}
            />
          </Link>
        </div>
        <div className="hidden md:block flex-grow relative md:h-[260px]">
          <Link className="element-focus" link={story} tabindex={-1}>
            <SanityImage
              rounded={false}
              image={thumbnail}
              fill
              sizes={['100vw', '60vw']}
              className="h-full w-full"
              noCaption={true}
            />
          </Link>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="font-size-7 font-trust">{title}</h3>
          <div className="font-size-9 py-3 md:py-4 theme-text-color-secondary">
            {formatSanityDate(publishDate)}
          </div>
          <LinkButton
            id={linkButtonId}
            link={story}
            align="left"
            variant="textLink"
            label={language.featuredStoryCard.readMoreLabel.en}
          />
        </div>
      </div>
    </Theme>
  );
};
