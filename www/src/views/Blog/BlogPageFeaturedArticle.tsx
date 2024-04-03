import React, { FC } from 'react';
import cn from 'classnames';
import { BlogArticle } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ColorTheme, Theme } from '@/components/Theme';
import { RichText } from '@/components/RichText';
import { LinkButton } from '@/atoms/Button';
import {
  FeaturedArticleContainer,
  FeaturedArticleTextContainer,
  FeaturedArticleImageContainer,
  FeaturedArticleTextInner,
} from './styles';

type BlogPageFeaturedArticleProps = {
  article: BlogArticle;
};

export const BlogPageFeaturedArticle: FC<BlogPageFeaturedArticleProps> = ({
  article,
}) => {
  const linkButtonId = ['featured-read-more', article.slug.current].join('-');
  return (
    <Theme theme={ColorTheme.Grey}>
      <div className={cn(FeaturedArticleContainer)}>
        <div className={cn(FeaturedArticleImageContainer)}>
          <SanityImage
            sizes={['100vw', '50vw']}
            image={article.thumbnail}
            aspectRatio={3 / 4}
          />
        </div>
        <div className={cn(FeaturedArticleTextContainer)}>
          <div className={cn(FeaturedArticleTextInner)}>
            <div className="font-size-8">Featured</div>
            <div className="py-4 font-size-5 font-trust md:py-6">
              {article.title}
            </div>
            <div className="pb-4 md:pb-6">
              <RichText
                fontSize="font-size-8"
                textColor="theme-text-color-secondary"
                content={article.blurb}
              />
            </div>
            <LinkButton
              width="auto"
              id={linkButtonId}
              link={article}
              align="left"
              label="Read More"
              variant="secondary"
              ariaLabel={`Navigate to article: ${article.title}`}
            />
          </div>
        </div>
      </div>
    </Theme>
  );
};
