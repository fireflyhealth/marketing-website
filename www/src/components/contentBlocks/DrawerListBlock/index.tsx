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
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { BREAK_POINTS } from 'tailwind.config';
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
  const innerContentRef = useRef<HTMLDivElement>(null);
  const windowDimensions = useWindowDimensions();
  const [windowWidth, setWindowWidth] = useState<number>(
    windowDimensions ? windowDimensions.width : 0,
  );
  const [expandedContentHeight, setExpandedContentHeight] = useState<number>(0);
  const linkButtonId = filterMaybes([
    'drawer-list-item',
    blockHeaderTitle,
    title,
    ctaLink?.label,
  ])
    .map(slugify)
    .join('-');

  useEffect(() => {
    if (windowDimensions) {
      setWindowWidth(windowDimensions.width);
    }

    /* Calculate and set the inner content height whenever the element
     * is expanded or when the window is resized. */
    const innerContentRefCurrent = innerContentRef.current;

    if (isExpanded) {
      if (!innerContentRefCurrent || !windowDimensions) return;
      const innerContentMaxHeight = windowDimensions.width * 0.6 - 140;
      const innerContentHeight = innerContentRefCurrent.offsetHeight;

      /* We only want to run comparison logic for desktop breakpoints */
      if (windowDimensions.width >= BREAK_POINTS.MD) {
        /* Calculate height of inner content.
         * Set height of inner content to it's true size
         * if it is less than the 60vh (60% of the viewport height) */
        const newHeight =
          innerContentHeight < innerContentMaxHeight
            ? innerContentHeight
            : innerContentMaxHeight;

        setExpandedContentHeight(newHeight);
      } else {
        setExpandedContentHeight(innerContentHeight);
      }

      /* Set tabindex to 0 for all links in the expanded content to be focusable */
      innerContentRefCurrent.querySelectorAll('a').forEach((link) => {
        link.setAttribute('tabindex', '0');
      });
    } else {
      setExpandedContentHeight(0);

      if (!innerContentRefCurrent) return;
      /* Set tabindex to -1 for all links in the expanded content to not be focusable */
      innerContentRefCurrent.querySelectorAll('a').forEach((link) => {
        link.setAttribute('tabindex', '-1');
      });
    }
  }, [isExpanded, windowDimensions, windowDimensions?.width]);

  return (
    <Theme
      theme={theme}
      className={cn('relative transition-all', {
        'hover:-translate-y-5': !isExpanded,
      })}
      style={{
        zIndex: `${index}`,
      }}
    >
      <div
        className={cn(
          'DrawerListItem relative rounded-2xl z-[10] overflow-hidden theme-bg-color',
          /* All list items except the last have extra padding at the
           * bottom to account for sibling overlap */
          isLast ? '' : 'pb-[2.5rem] md:pb-[3.5rem]',
          /* All list items except the first are nudged up to overlap
           * extra bottom padding on the previous card */
          isFirst ? '' : 'mt-[-2.5rem] md:mt-[-3.5rem]',
        )}
      >
        {backgroundImage ? (
          <div
            className={cn(
              'DrawerListItem__background',
              'absolute top-0 left-0 w-full z-[10] h-full',
              /* Items with background images have a min-height of 60vh,
               * this height accounts for that plus padding. It must be set
               * explicitly to avoid the position of the background image
               * shifting when the drawer is open. */
              Boolean(backgroundImage && !featuredImage) ? 'min-h-[60vh]' : '',
            )}
          >
            <ResponsiveSanityImage
              className="DrawerList_Background_Img w-full h-full"
              imageSet={backgroundImage}
              sizes={['100vw']}
            />
          </div>
        ) : null}
        <div className="relative z-[20]" aria-hidden={isExpanded}>
          <button
            onClick={expand}
            onFocus={expand}
            disabled={isExpanded}
            className="DrawerListItem__button text-left w-full"
            aria-label={`Expand drawer ${index}: ${title}`}
          >
            <div className="p-8 transition-all flex flex-row justify-between items-center">
              <h3
                className={cn(
                  'font-size-5 font-trust leading-[1em] transition-all',
                )}
              >
                {title}
              </h3>
              <SimpleIcon
                type="arrow-down"
                wrapperStyles={cn(
                  'w-6 h-6 theme-text-color-primary transition-all ease-in-out duration-300',
                  {
                    'rotate-180': !isExpanded,
                  },
                )}
              />
            </div>
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
              'innerContent flex flex-col space-y-12 md:flex-row md:space-y-0 md:space-x-12 md:justify-between',
              'p-8 pt-0 relative z-[20]',
              isExpanded ? '' : 'opacity-0',
              Boolean(backgroundImage && isExpanded && !featuredImage)
                ? 'min-h-[30vh] lg:min-h-[60vh]'
                : '',
            )}
          >
            <div
              className={cn(
                'DrawerListItem__content',
                'pb-20 overflow-hidden overflow-y-scroll hide-scrollbar md:w-1/2',
              )}
              style={{
                maxHeight: `${
                  windowWidth >= BREAK_POINTS.MD
                    ? `${expandedContentHeight - 32}px`
                    : '150px'
                }`,
                WebkitMaskImage: `linear-gradient(to bottom, black 75%, transparent 100%)`,
                maskImage: `linear-gradient(to bottom, black 75%, transparent 100%)`,
              }}
            >
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
              <div className="h-full md:w-1/2">
                <SanityImage
                  image={featuredImage}
                  sizes={['100vw', '50vw']}
                  className="w-auto h-auto mx-auto"
                />
              </div>
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
