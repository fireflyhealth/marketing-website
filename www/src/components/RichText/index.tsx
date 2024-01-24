import React, { FC } from 'react';
import cx from 'classnames';
import {
  PortableTextComponent,
  PortableText,
  PortableTextReactComponents,
} from '@portabletext/react';
import {
  PortableTextBlock,
  PortableTextListItemBlock,
} from '@portabletext/types';
import { RichText as RichTextType } from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type RichTextProps = {
  /* Note: You can add more types & serializers for
   * other blocks that may be included in the future, i.e.:
   * content: (PortableTextBlock | ImageBlock)[] */
  content: PortableTextBlock[];
  className?: string;
};

type BlockRendererArgs = {
  children: React.ReactNode;
  node: PortableTextBlock | PortableTextListItemBlock;
};

const BlockRenderer: PortableTextComponent<PortableTextBlock> = ({
  children,
  value,
}) => {
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
      return <p className="font-size-8">{children}</p>;
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
  },
};

export const RichText: FC<RichTextProps> = ({ content, className }) => {
  return (
    <div className={cx('RichText theme-text-color-primary', className)}>
      <PortableText value={content} components={components} />
    </div>
  );
};
