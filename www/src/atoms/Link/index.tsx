import React, { FC } from 'react';
import NextLink from 'next/link';
import { Link as LinkType, LinkableDocumentData, Maybe } from '@/types/sanity';
import { getLinkableDocumentPath } from '@/utils/linking';

type LinkProps = {
  link: LinkType | LinkableDocumentData;
  ariaLabel?: Maybe<string>;
  children: React.ReactNode;
};

export const Link: FC<LinkProps> = ({ link, children, ariaLabel }) => {
  if ('externalUrl' in link && link.externalUrl) {
    return <a href={link.externalUrl}>{children}</a>;
  }
  if ('file' in link && link.file) {
    return <a href={link.file.asset.url}>{children}</a>;
  }
  const documentLink = link._type == 'link' ? link.documentLink : link;
  if (!documentLink) {
    throw new Error(
      '<Link> was provided an object with no externalUrl, file, or linkable document',
    );
  }
  const href = getLinkableDocumentPath(documentLink);
  return (
    <NextLink aria-label={ariaLabel || undefined} href={href}>
      {children}
    </NextLink>
  );
};
