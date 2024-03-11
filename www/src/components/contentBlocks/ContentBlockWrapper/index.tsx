import { FC } from 'react';
import cn from 'classnames';
import {
  ContentBlockHeader as ContentBlockHeaderType,
  Maybe,
} from '@/types/sanity';
import { CTA } from '@/components/CTA';
import { RichText } from '@/components/RichText';
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
              fontSize={cn('font-size-6--quote')}
              content={description}
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

  return (
    <div
      id={id || undefined}
      className={cn(wrapperPadding ? ContentBlockContainer : '', {
        'remove-between-component-margin': removeBetweenComponentMargin,
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
