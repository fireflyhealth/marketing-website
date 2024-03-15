import { FC } from 'react';
import cn from 'classnames';
import { slugify } from '@/utils/text';
import { filterMaybes } from '@/utils/arrays';
import { DrawerListItem } from '@/types/sanity';
import { Theme } from '@/components/Theme';
import { getColorTheme } from '@/utils/theme';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { RichText } from '@/components/RichText';
import { LinkButton } from '@/atoms/Button';
import {
  CardItem,
  BackgroundImage,
  Header,
  Title,
  ImageWrapper,
  CardItemWrapper,
} from './styles';

type Props = {
  card: DrawerListItem;
};

export const Card: FC<Props> = ({ card }) => {
  const { title, body, ctaLink, featuredImage, theme, backgroundImage } = card;
  const linkButtonId = filterMaybes(['drawer-list-item', title, ctaLink?.label])
    .map(slugify)
    .join('-');

  return (
    <div className={cn(CardItemWrapper)}>
      <Theme theme={getColorTheme(theme)} className={cn('w-full h-full')}>
        <div className={cn(CardItem)}>
          {backgroundImage ? (
            <div className={cn(BackgroundImage)}>
              <ResponsiveSanityImage
                imageSet={backgroundImage}
                sizes={['100vw']}
              />
            </div>
          ) : null}
          <div className={cn(Header)}>
            <h4 className={cn(Title)}>{title}</h4>
            {/* Update description to be richText */}
            <RichText
              content={body}
              fontSize="font-size-10 font-roobert"
              textColor="theme-text-color-primary"
            />
          </div>
          {featuredImage ? (
            <div className={cn(ImageWrapper)}>
              <SanityImage image={featuredImage} sizes={['100vw', '50vw']} />
            </div>
          ) : null}
          {ctaLink ? (
            <div className="pt-5 absolute left-6 bottom-6 z-20 theme-cta-text-color-primary">
              <LinkButton
                id={linkButtonId}
                link={ctaLink.link}
                variant="textLink"
                width="auto"
                align="left"
                label={ctaLink.label}
              />
            </div>
          ) : null}
        </div>
      </Theme>
    </div>
  );
};
