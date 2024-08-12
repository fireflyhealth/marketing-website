import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import {
  PortableTextComponent,
  PortableText,
  PortableTextReactComponents,
} from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { RichText as RichTextType } from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { Link } from '@/atoms/Link';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { BarGraph } from '@/components/BarGraph';
import { BigNumbers } from '../BigNumber';
import { TwoColumnUnorderedList } from '../TwoColumnUnorderedList';
import { OverlapDoubleImages } from '../OverlapDoubleImages';
import { ArticleRichTextQuote } from '../ArticleRichTextQuote';
import { Footnotes } from '../Footnotes';
import { RichTextCtaRow } from './RichTextCtaRow';
import { BigOrderedList } from './BigOrderedList';

const HubspotForm = dynamic(() => import('@/components/HubspotForm'), {
  ssr: false,
});

const Video = dynamic(() => import('@/components/Video'), {
  ssr: false,
});

type RichTextProps = {
  content: RichTextType;
  /* a font-size class name. This allows us to override the default
   * font size for <p> tags within SimpleRichText in scenarios where
   * it should not be the usual font-size-8 (i.e. Contnent Block Header
   * descriptions). */
  fontSize?: string;
  /* a theme-text-color className.
   * Defaults to theme-text-color-primary */
  textColor?: string;
  className?: string;
  alignCenter?: boolean;
  isTabContent?: boolean;
};

const BlockRenderer: PortableTextComponent<PortableTextBlock> = ({
  children,
  value,
}) => {
  if (!value.style) return null;
  switch (value.style) {
    case 'h2':
      return <h2 className="font-size-4 font-trust">{children}</h2>;
    case 'h3':
      return <h3 className="font-size-5 font-trust">{children}</h3>;
    case 'h4':
      return <h4 className="font-size-6 font-trust">{children}</h4>;
    case 'blockquote-large':
      return (
        <blockquote className="font-size-5--quote font-trust theme-text-color-decorative">
          {children}
        </blockquote>
      );
    case 'blockquote':
      return (
        <blockquote className="font-size-6--quote font-trust theme-text-color-decorative">
          {children}
        </blockquote>
      );
    case 'normal':
      /* Font size is inherited from the parent element. See the note above
       * about the custom fontSize prop. */
      return <p>{children}</p>;
    default:
      console.warn(`No block renderer config for ${value.style}`, { value });
      return null;
  }
};

const components: Partial<PortableTextReactComponents> = {
  block: BlockRenderer,

  list: {
    bullet: ({ children }) => <ul className="font-size-8">{children}</ul>,
    number: ({ children }) => <ol className="font-size-8">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    icon: (props) => {
      return <BrandedIcon type={props.value.icon} wrapperStyles="w-12" />;
    },
    richImage: (props) => {
      return (
        <SanityImage image={props.value} sizes={['100vw', '100vw', '900px']} />
      );
    },
    form: (props) => {
      return <HubspotForm formId={props.value.formId} renderInRichtext />;
    },
    barGraphObject: (props) => {
      return <BarGraph barGraph={props.value} />;
    },
    bigNumbers: (props) => {
      return <BigNumbers bigNumbers={props.value} />;
    },
    twoColumnUnorderedList: (props) => {
      return <TwoColumnUnorderedList twoColumnUnorderedList={props.value} />;
    },
    richTextCtaRow: (props) => {
      return <RichTextCtaRow richTextCtaRow={props.value} />;
    },
    bigOrderedList: (props) => {
      return <BigOrderedList bigOrderedList={props.value} />;
    },
    overlapDoubleImages: (props) => {
      return <OverlapDoubleImages overlapDoubleImages={props.value} />;
    },
    quoteObject: (props) => {
      return <ArticleRichTextQuote quoteObject={props.value} />;
    },
    video: (props) => {
      return (
        <div className={cn('my-24')}>
          <Video video={props.value} posterSizes={['100vw']} />
        </div>
      );
    },
    footnotes: (props) => {
      return <Footnotes footnotes={props.value} />;
    },
  },
  marks: {
    link: (props) => {
      return (
        <Link
          className="break-all"
          link={props.value.link}
          id={props.value.id || undefined}
          ariaLabel={props.value.ariaLabel || undefined}
        >
          {props.children}
        </Link>
      );
    },
    textHighlight: (props) => {
      return (
        <span
          className={cn({
            'text-white': props.value.textHighlight === 'white',
            'text-grey': props.value.textHighlight === 'grey',
            'text-sienna': props.value.textHighlight === 'sienna',
            'text-midnight': props.value.textHighlight === 'midnight',
            'text-sky': props.value.textHighlight === 'sky',
          })}
        >
          {props.children}
        </span>
      );
    },
    sub: (props) => <sub>{props.children}</sub>,
    super: (props) => <sup>{props.children}</sup>,
  },
};

export const RichText: FC<RichTextProps> = ({
  content,
  className,
  fontSize,
  textColor,
  alignCenter,
  isTabContent,
}) => {
  return (
    <div
      className={cn(
        'RichText',
        textColor || 'theme-text-color-primary',
        fontSize || 'font-size-8',
        className,
        {
          'RichText--align-center flex flex-col items-center text-center':
            alignCenter,
          'mt-0': isTabContent,
        },
      )}
    >
      <PortableText value={content} components={components} />
    </div>
  );
};
