import React, { FC } from 'react';
import cx from 'classnames';
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
import { HubspotForm } from '@/components/Forms';

type RichTextProps = {
  content: RichTextType;
  /* a font-size class name. This allows us to override the default
   * font size for <p> tags within SimpleRichText in scenarios where
   * it should not be the usual font-size-8 (i.e. Contnent Block Header
   * descriptions). */
  fontSize?: string;
  className?: string;
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
  },
  marks: {
    link: (props) => {
      return <Link link={props.value.link}>{props.children}</Link>;
    },
  },
};

export const RichText: FC<RichTextProps> = ({
  content,
  className,
  fontSize,
}) => {
  return (
    <div className={cx('RichText', className, fontSize || 'font-size-8')}>
      <PortableText value={content} components={components} />
    </div>
  );
};
