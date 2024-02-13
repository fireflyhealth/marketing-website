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
import { ColorTheme, Theme } from '@/components/Theme';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

/**
 * List Item
 */

type DrawerListItemProps = {
  blockHeaderTitle?: string;
  drawerListItem: DrawerListItemType;
  isFirst: boolean;
  isLast: boolean;
  isExpanded: boolean;
  expand: () => void;
};

export const DrawerListItem: FC<DrawerListItemProps> = ({
  isFirst,
  isLast,
  blockHeaderTitle,
  isExpanded,
  expand,
  drawerListItem,
}) => {
  const { title, body, ctaLink, featuredImage } = drawerListItem;
  const backgroundColor =
    'backgroundColor' in drawerListItem
      ? drawerListItem.backgroundColor
      : undefined;
  const backgroundImage =
    'backgroundImage' in drawerListItem
      ? drawerListItem.backgroundImage
      : undefined;
  const linkButtonId = filterMaybes([
    'drawer-list-item',
    blockHeaderTitle,
    title,
    ctaLink?.label,
  ])
    .map(slugify)
    .join('-');
  return (
    <Theme theme={ColorTheme.Midnight}>
      <div
        className={cn(
          'p-6 md:p-12 relative rounded-lg',
          /* All list items except the last have extra padding at the
           * bottom to account for sibling overlap */
          isLast ? 'pb-6 md:pb-12' : 'pb-16 md:pb-24',
          /* All list items except the first are nudged up to overlap
           * extra bottom padding on the previous card */
          isFirst ? '' : 'mt-[-2.5rem] md:mt-[-3.5rem]',
          isExpanded ? 'grid grid-cols-1 md:grid-cols-2' : 'block',
        )}
        style={{
          backgroundColor: backgroundColor?.value || '#131D2B',
        }}
      >
        {isExpanded ? (
          <>
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
          </>
        ) : (
          <button
            onClick={expand}
            disabled={isExpanded}
            className="text-left"
            aria-label={`Expand "${title}" content`}
          >
            <h3 className="font-size-5 font-trust">{title}</h3>
          </button>
        )}
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
