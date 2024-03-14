import React, { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import {
  DrawerListItem as DrawerListItemType,
  DrawerListBlock as DrawerListBlockType,
  CardListBlock,
} from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { LinkButton } from '@/atoms/Button';
import { slugify } from '@/utils/text';
import { filterMaybes } from '@/utils/arrays';
import { Theme } from '@/components/Theme';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ResponsiveSanityImage } from '@/atoms/Image/ResponsiveSanityImage';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
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
  const innerContentRef = useRef<HTMLDivElement>(null);
  const windowDimensions = useWindowDimensions();
  const [expandedContentHeight, setExpandedContentHeight] = useState<
    string | number
  >(
    /* Set the initial state to 'auto' if isExpanded is true upon first render.
     * The effect below will set this to a number (which will match the natural height)
     * when it first runs. */
    isExpanded ? 'auto' : 0,
  );
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

  useEffect(() => {
    /* Calculate and set the inner content height whenever the element
     * is expanded or when the window is resized. */
    if (isExpanded) {
      if (!innerContentRef.current) return;
      const innerContentHeight = innerContentRef.current.offsetHeight;
      setExpandedContentHeight(innerContentHeight);
    } else {
      setExpandedContentHeight(0);
    }
  }, [isExpanded, windowDimensions]);
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
        <div className="relative z-[20]" aria-hidden={isExpanded}>
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
          className={cn(isExpanded ? '' : 'pointer-events-none')}
          style={{
            transition: 'height 0.3s ease',
            /* We cannot transition between height: 0 and height: auto,
             * so we need to set an explicit number height for the animation.
             * The effect above will calculate the height of the inner content
             * when the item is expanded, and then apply that number to this
             * wrapping div, animating from 0px to <some-number>px. */
            height: expandedContentHeight,
          }}
        >
          <div
            ref={innerContentRef}
            style={{
              transition: 'opacity 0.3s ease',
            }}
            className={cn(
              'grid grid-cols-1 gap-12 lg:grid-cols-2 md:pb-6 pt-5 relative z-[20]',
              isExpanded ? '' : 'opacity-0',
              Boolean(backgroundImage && isExpanded)
                ? 'min-h-[450px] md:min-h-[600px]'
                : '',
            )}
          >
            <div>
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
            {featuredImage ? (
              <SanityImage image={featuredImage} sizes={['100vw', '50vw']} />
            ) : null}
          </div>
        </div>
      </div>
    </Theme>
  );
};

/**
 * Main component
 */

type DrawerListBlockProps = {
  drawerListBlock: DrawerListBlockType | CardListBlock;
};

export const DrawerListBlock: FC<DrawerListBlockProps> = ({
  drawerListBlock,
}) => {
  const { header, drawerListItems, subnav } = drawerListBlock;
  const [currentListItem, setCurrentListItem] = useState<string>(
    drawerListItems[0]._key,
  );
  const createExpandListItem = (key: string) => () => setCurrentListItem(key);
  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
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
