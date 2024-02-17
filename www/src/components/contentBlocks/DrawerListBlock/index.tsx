import React, { FC, useState } from 'react';
import cn from 'classnames';
import {
  DrawerListItem as DrawerListItemType,
  DrawerListBlock as DrawerListBlockType,
} from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { LinkButton } from '@/atoms/Button';
import { slugify } from '@/utils/text';
import { filterMaybes } from '@/utils/arrays';
import { Theme } from '@/components/Theme';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

/**
 * List Item
 */

type DrawerListItemProps = {
  blockHeaderTitle?: string;
  drawerListItem: DrawerListItemType;
  isFirst: boolean;
  isLast: boolean;
  index: number;
  isExpanded: boolean;
  expand: () => void;
};

export const DrawerListItem: FC<DrawerListItemProps> = ({
  isFirst,
  isLast,
  blockHeaderTitle,
  isExpanded,
  expand,
  index,
  drawerListItem,
}) => {
  const { title, body, ctaLink, featuredImage, theme, backgroundImage } =
    drawerListItem;
  const linkButtonId = filterMaybes([
    'drawer-list-item',
    blockHeaderTitle,
    title,
    ctaLink?.label,
  ])
    .map(slugify)
    .join('-');
  return (
    <Theme theme={theme}>
      <div
        className={cn(
          'p-6 md:p-12 relative rounded-lg z-[10] overflow-hidden theme-bg-color',
          /* All list items except the last have extra padding at the
           * bottom to account for sibling overlap */
          isLast ? 'pb-6 md:pb-12' : 'pb-16 md:pb-24',
          /* All list items except the first are nudged up to overlap
           * extra bottom padding on the previous card */
          isFirst ? '' : 'mt-[-2.5rem] md:mt-[-3.5rem]',
        )}
      >
        {backgroundImage ? (
          <div
            className={cn(
              'DrawerListItem__background',
              'absolute top-0 left-0 w-full z-[10]',
              /* Items with background images have a min-height of 600px,
               * this height accounts for that plus padding. It must be set
               * explicitly to avoid the position of the background image
               * shifting when the drawer is open. */
              'h-[550px] md:h-[744px]',
            )}
          >
            <ResponsiveSanityImage
              imageSet={backgroundImage}
              sizes={['100vw']}
            />
          </div>
        ) : null}
        <div
          className={cn('relative z-[20]', isExpanded ? 'hidden' : '')}
          aria-hidden={isExpanded}
        >
          <button
            onClick={expand}
            disabled={isExpanded}
            className="text-left"
            aria-label={`Expand drawer ${index}: ${title}`}
          >
            <h3 className="font-size-5 font-trust">{title}</h3>
          </button>
        </div>

        <div
          aria-hidden={!isExpanded}
          className={cn(
            isExpanded
              ? 'grid grid-cols-1 gap-12 lg:grid-cols-2 md:pb-6 relative z-[20]'
              : 'opacity-0 h-0',
            Boolean(backgroundImage && isExpanded)
              ? 'min-h-[450px] md:min-h-[600px]'
              : '',
          )}
        >
          <div>
            <h3 className="font-size-5 font-trust pb-5">{title}</h3>
            <div className={isExpanded ? 'block' : 'hidden'}>
              <RichText fontSize="font-size-8" content={body} />
              {ctaLink ? (
                <div className="pt-5">
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
          </div>
          {featuredImage ? (
            <SanityImage image={featuredImage} sizes={['100vw', '50vw']} />
          ) : null}
        </div>
      </div>
    </Theme>
  );
};

/**
 * Main component
 */

type DrawerListBlockProps = {
  drawerListBlock: DrawerListBlockType;
};

export const DrawerListBlock: FC<DrawerListBlockProps> = ({
  drawerListBlock,
}) => {
  const { header, drawerListItems } = drawerListBlock;
  const [currentListItem, setCurrentListItem] = useState<string>(
    drawerListItems[0]._key,
  );
  const createExpandListItem = (key: string) => () => setCurrentListItem(key);
  return (
    <ContentBlockWrapper header={header}>
      {drawerListItems.map((drawerListItem, index) => (
        <DrawerListItem
          blockHeaderTitle={header?.title}
          key={drawerListItem._key}
          index={index}
          isFirst={index === 0}
          isLast={index === drawerListItems.length - 1}
          isExpanded={drawerListItem._key === currentListItem}
          expand={createExpandListItem(drawerListItem._key)}
          drawerListItem={drawerListItem}
        />
      ))}
    </ContentBlockWrapper>
  );
};
