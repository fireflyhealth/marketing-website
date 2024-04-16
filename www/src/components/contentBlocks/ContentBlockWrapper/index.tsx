import { FC, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import {
  ContentBlockHeader as ContentBlockHeaderType,
  Maybe,
} from '@/types/sanity';
import { CTA } from '@/components/CTA';
import { RichText } from '@/components/RichText';
import { useUIProvider } from '@/context/UIProvider';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
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
  const { isIntersecting } = useIntersectionObserver(contentBlockWrapperRef, {
    threshold: 0.2,
    rootMargin: '0px 0px -50% 0px',
  });

  useEffect(() => {
    if (!contentBlockWrapperRef.current || !id) return;

    if (isIntersecting && id) {
      setCurrentContentBlock(id);
    } else setCurrentContentBlock(null);
  }, [isIntersecting, id, setCurrentContentBlock]);

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
