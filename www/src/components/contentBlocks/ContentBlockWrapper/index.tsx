import { FC, useRef, useEffect } from 'react';
import cn from 'classnames';
import {
  ContentBlockHeader as ContentBlockHeaderType,
  Maybe,
} from '@/types/sanity';
import { CTA } from '@/components/CTA';
import { RichText } from '@/components/RichText';
import { useUIProvider } from '@/context/UIProvider';
import {
  HeaderWrapper,
  Title,
  Description,
  CTAWrapper,
  ContentBlockContainer,
  MobileCTAWrapper,
  ContentBlockInner,
  HeaderBody,
} from './styles';

type ContentBlockHeaderProps = {
  header: ContentBlockHeaderType;
};

export const ContentBlockHeader: FC<ContentBlockHeaderProps> = ({ header }) => {
  const { title, description, cta } = header;

  return (
    <div className={cn(HeaderWrapper)}>
      <div className={cn(HeaderBody)}>
        <h2 className={cn(Title)}>{title}</h2>

        {description ? (
          <div className={cn(Description)}>
            <RichText
              fontSize={cn('font-size-8')}
              content={description}
              textColor="theme-text-color-secondary"
            />
          </div>
        ) : null}
      </div>

      {cta?.label ? (
        <div className={cn(CTAWrapper)}>
          <CTA cta={cta} />
        </div>
      ) : null}
    </div>
  );
};

type ContentBlockWrapperProps = {
  header: Maybe<ContentBlockHeaderType>;
  children: React.ReactNode;
  id: Maybe<string>;
  background?: React.ReactNode;
  wrapperPadding?: boolean;
  removeBetweenComponentMargin?: boolean;
};

export const ContentBlockWrapper: FC<ContentBlockWrapperProps> = ({
  header,
  children,
  id,
  background,
  wrapperPadding = true,
  removeBetweenComponentMargin = false,
}) => {
  const cta = header?.cta && header?.cta?.label ? header.cta : null;
  const headerHasContent = header?.title || header?.description || cta;

  const contentBlockWrapperRef = useRef<HTMLDivElement | null>(null);
  const { setCurrentContentBlock } = useUIProvider();

  // set current content block based on
  // top of content block < the middle of the viewport &&
  // the bottom of the content block is > the middle of the viewport
  useEffect(() => {
    if (!contentBlockWrapperRef.current || !id) return;

    // create an array of content blocks that have a
    // corresponding subnav items (denoted by divs with an #id)
    const contentAreaContainerArray = Array.prototype.slice
      .call(document.getElementById('content-area')?.children)
      .filter(
        (childElement) =>
          !childElement.id.includes('subnav') && childElement.id,
      );

    // get index of each child within the contentAreaContainerArray array
    const contentBlockIndex = contentAreaContainerArray.indexOf(
      contentBlockWrapperRef.current,
    );

    /**
     * This function handles the active and inactive state within the subnav.
     * Subnav items become active when their corresponding content block crosses
     * the page threshold (half of the viewport height).  Subnav items remain inactive
     * when their corresponding content block passes outside of that threshold.
     */
    const handleSetCurrentContentBlock = () => {
      const contentBlockTop =
        contentBlockWrapperRef.current?.getBoundingClientRect().top;
      const contentBlockBottom =
        contentBlockWrapperRef.current?.getBoundingClientRect().bottom;
      const viewportMiddle = window.innerHeight / 2;

      if (contentBlockTop && contentBlockBottom) {
        if (
          contentBlockTop < viewportMiddle &&
          contentBlockBottom > viewportMiddle
        ) {
          setCurrentContentBlock(id);
        }

        // all subnav items should be inactive when the first content block is
        // below the threshold of the page (half the height of the viewport) and
        // when the last content block is above the threshold of the page.
        if (contentBlockIndex === 0 && contentBlockTop > viewportMiddle) {
          setCurrentContentBlock(null);
        }

        if (
          contentBlockIndex === contentAreaContainerArray.length - 1 &&
          contentBlockBottom < viewportMiddle
        ) {
          setCurrentContentBlock(null);
        }
      }
    };

    document.addEventListener('scroll', handleSetCurrentContentBlock);

    return () => {
      document.removeEventListener('scroll', handleSetCurrentContentBlock);
    };
  }, [contentBlockWrapperRef, id, setCurrentContentBlock]);

  return (
    <div
      // only add ref if content block has a corresponding subnav item
      ref={id && contentBlockWrapperRef}
      id={id || undefined}
      className={cn({
        [`${ContentBlockContainer}`]: wrapperPadding,
        'remove-between-component-margin': removeBetweenComponentMargin,
        'scroll-mt-16 lg:scroll-mt-7': id,
      })}
    >
      {background ? background : null}
      {header && headerHasContent ? (
        <ContentBlockHeader header={header} />
      ) : null}
      <div className={cn(ContentBlockInner)}>{children}</div>
      {cta ? (
        <div className={cn(MobileCTAWrapper)}>
          <CTA cta={cta} width="full" />
        </div>
      ) : null}
    </div>
  );
};
