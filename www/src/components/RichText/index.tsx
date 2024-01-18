import React, { FC } from 'react';
import cx from 'classnames';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { RichText as RichTextType } from '@/types/sanity';

type RichTextProps = {
  /* Note: You can add more types & serializers for
   * other blocks that may be included in the future, i.e.:
   * content: (PortableTextBlock | ImageBlock)[] */
  content: PortableTextBlock[];
  className?: string;
};

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => {
      return <p className="font-trust">{children}</p>;
    },
  },

  types: {},
};

export const RichText: FC<RichTextProps> = ({ content, className }) => {
  console.log(content);
  return (
    <div className={cx('RichText', className)}>
      <PortableText value={content} components={components} />
    </div>
  );
};
