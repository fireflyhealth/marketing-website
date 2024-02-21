import React, { FC } from 'react';
import cn from 'classnames';
import { FeaturedStoriesBlock as FeaturedStoriesBlockType } from '@/types/sanity';
import { FeaturedStoryCard } from '@/components/Cards/FeaturedStoryCard';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { FeaturedStoriesCardWrapper, FeaturedStoriesGrid } from './styles';

type FeaturedStoriesBlockProps = {
  featuredStoriesBlock: FeaturedStoriesBlockType;
};

export const FeaturedStoriesBlock: FC<FeaturedStoriesBlockProps> = ({
  featuredStoriesBlock,
}) => {
  const { header, stories } = featuredStoriesBlock;

  return (
    <ContentBlockWrapper header={header}>
      <div className={cn(FeaturedStoriesGrid)}>
        {stories.map((story, index) => (
          <div
            key={story.slug.current}
            className={cn(
              FeaturedStoriesCardWrapper(
                /* isWide? */
                /* Every 2nd & 3rd */
                index % 4 === 1 || index % 4 === 2,
              ),
            )}
          >
            <FeaturedStoryCard story={story} />
          </div>
        ))}
      </div>
    </ContentBlockWrapper>
  );
};
