import React, { FC } from 'react';
import cn from 'classnames';
import { HeaderContentChildBlock as HeaderContentChildBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import {
  Eyebrow,
  EyebrowImage,
  Heading,
  Body,
  CtaWrapper,
  Wrapper,
} from './styles';

type HeaderContentChildBlockProps = {
  headerContentChildBlock: HeaderContentChildBlockType;
  imagePriority?: boolean;
};

export const HeaderContentChildBlock: FC<HeaderContentChildBlockProps> = ({
  headerContentChildBlock,
  imagePriority,
}) => {
  const { eyebrow, eyebrowImage, heading, body, cta, size } =
    headerContentChildBlock;

  return (
    <div
      className={cn(Wrapper, {
        'lg:min-h-[676px]': size === 'small',
        'lg:min-h-[800px]': size === 'large',
      })}
    >
      {eyebrowImage && (
        <SanityImage
          className={cn(EyebrowImage)}
          image={eyebrowImage}
          sizes={['30vw', '70vw']}
          priority={imagePriority}
        />
      )}
      {eyebrow && <p className={cn(Eyebrow)}>{eyebrow}</p>}
      <h1 className={cn(Heading)}>{heading}</h1>
      {body && <RichText className={cn(Body)} content={body} />}
      {cta && (
        <div className={cn(CtaWrapper)}>
          <CTA cta={cta} />
        </div>
      )}
    </div>
  );
};
