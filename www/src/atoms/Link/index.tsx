import React, { FC } from 'react';
import NextLink from 'next/link';
import { Link as LinkType, LinkableDocumentData, Maybe } from '@/types/sanity';
import { getLinkableDocumentPath } from '@/utils/linking';

type LinkProps = {
  link: LinkType | LinkableDocumentData;
  ariaLabel?: Maybe<string>;
  id?: Maybe<string>;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Link: FC<LinkProps> = ({
  link,
  children,
  ariaLabel,
  id,
  ...props
}) => {
  if ('externalUrl' in link && link.externalUrl) {
    const url = link.externalUrl;
    const target =
      url.startsWith('mailto:') || url.startsWith('tel:') ? '_self' : '_blank';

    return (
      <a
        href={url}
        id={id || undefined}
        aria-label={ariaLabel || undefined}
        target={target}
      >
        {children}
      </a>
    );
  }
  if ('file' in link && link.file) {
    return (
      <a
        href={link.file.asset.url}
        id={id || undefined}
        aria-label={ariaLabel || undefined}
      >
        {children}
      </a>
    );
  }
  const documentLink = link._type == 'link' ? link.documentLink : link;
  if (!documentLink) {
    throw new Error(
      '<Link> was provided an object with no externalUrl, file, or linkable document',
    );
  }
  const href = getLinkableDocumentPath(documentLink);
  return (
    <NextLink
      id={id || undefined}
      aria-label={ariaLabel || undefined}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
};
