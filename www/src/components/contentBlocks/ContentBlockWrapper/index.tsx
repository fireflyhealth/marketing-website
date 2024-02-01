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
  Heading,
  Title,
  Description,
  CTAWrapper,
  ContentBlockContainer,
  MobileCTAWrapper,
} from './styles';

type ContentBlockHeaderProps = {
  header: ContentBlockHeaderType;
};

export const ContentBlockHeader: FC<ContentBlockHeaderProps> = ({ header }) => {
  const { title, description, cta } = header;
  return (
    <div className={cn(HeaderWrapper)}>
      <div className={cn(Heading)}>
        <h2 className={cn(Title)}>{title}</h2>

        {description ? (
          <div className={cn(Description)}>
            <RichText content={description} />
          </div>
        ) : null}
      </div>

      {cta ? (
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
};

export const ContentBlockWrapper: FC<ContentBlockWrapperProps> = ({
  header,
  children,
}) => {
  const cta = header?.cta;
  return (
    <div className={cn(ContentBlockContainer)}>
      {header ? <ContentBlockHeader header={header} /> : null}
      {children}
      {cta ? (
        <div className={cn(MobileCTAWrapper)}>
          <CTA cta={cta} />
        </div>
      ) : null}
    </div>
  );
};
