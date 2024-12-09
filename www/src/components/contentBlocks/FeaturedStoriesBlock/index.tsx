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
  const { header, stories, subnav } = featuredStoriesBlock;

  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div className={cn(FeaturedStoriesGrid)}>
        {stories.map((story, index) => (
          <div
            key={story.slug.current}
            className={cn(
              FeaturedStoriesCardWrapper(index % 4 === 0 || index % 4 === 5),
            )}
          >
            <FeaturedStoryCard story={story} />
          </div>
        ))}
      </div>
    </ContentBlockWrapper>
  );
};
