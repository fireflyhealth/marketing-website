import React, { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
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
  linkRef?: React.Ref<HTMLAnchorElement>;
  navItem?: boolean;
};

export const Link: FC<LinkProps> = ({
  link,
  children,
  ariaLabel,
  id,
  className,
  tabindex,
  linkRef,
  navItem,
  ...props
}) => {
  const router = useRouter();
  // We should not not have link since we have cms validation for this to block publish
  // However, for preview, editor does not need to publish (which means the validation is not enforced) so adding checker here.
  if (!link) {
    return <>{children}</>;
  }

  if ('externalUrl' in link && link.externalUrl) {
    const url = link.externalUrl;
    const target =
      url.startsWith('mailto:') || url.startsWith('tel:') ? '_self' : '_blank';

    return (
      <a
        ref={linkRef}
        href={url}
        id={id || undefined}
        aria-label={ariaLabel || undefined}
        target={target}
        className={cn(className, {
          'theme-cta-border-color': navItem && router.asPath.includes(url),
        })}
        tabIndex={tabindex}
      >
        {children}
      </a>
    );
  }
  if ('file' in link && link.file) {
    return (
      <a
        ref={linkRef}
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
      ref={linkRef}
      id={id || undefined}
      aria-label={ariaLabel || undefined}
      href={href}
      className={cn(className, {
        'theme-cta-border-color': navItem && router.asPath.includes(href),
      })}
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
