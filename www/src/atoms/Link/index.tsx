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
  tabindex?: number;
};

export const Link: FC<LinkProps> = ({
  link,
  children,
  ariaLabel,
  id,
  className,
  tabindex,
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
        className={className}
        tabIndex={tabindex}
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
        className={className}
        tabIndex={tabindex}
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
      className={className}
      tabIndex={tabindex}
      {...props}
    >
      {children}
    </NextLink>
  );
};

type MaybeLinkProps = Omit<LinkProps, 'link'> & {
  link: Maybe<LinkType | LinkableDocumentData>;
};

export const MaybeLink: FC<MaybeLinkProps> = ({ link, children, ...rest }) =>
  link ? (
    <Link link={link} {...rest}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
