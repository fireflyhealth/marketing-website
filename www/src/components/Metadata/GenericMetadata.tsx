import React, { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Metadata } from '@/types/sanity';
import { config } from '@/config';
import { imageBuilder } from '@/lib/sanity';

import { isIndexingAllowed } from '@/config';

type GenericMetadataProps = Metadata & {
  noIndex?: boolean;
  children?: React.ReactNode;
};

export const GenericMetadata: FC<GenericMetadataProps> = ({
  title,
  description,
  shareTitle,
  shareDescription,
  shareGraphic,
  noIndex = false,
  children = null,
}) => {
  const router = useRouter();
  const ogDescription = shareDescription || description;
  const canonicalUrl = config.metadata.productionUrl.concat(
    router.asPath.split('?')[0],
  );
  const shareGraphicUrl = shareGraphic
    ? imageBuilder.image(shareGraphic).width(1200).height(630).url()
    : null;

  return (
    /* NOTE: If you add new fields here, be sure to include the 'key'
     * attribute to avoid duplicate tags. See:
     * https://nextjs.org/docs/pages/api-reference/components/head#avoid-duplicated-tags
     */
    <Head>
      {(noIndex || !isIndexingAllowed) && (
        <meta key="robots-noindex" name="robots" content="noindex" />
      )}
      <title key="title">{title || config.metadata.defaultTitle}</title>
      {/* TODO: Add Locale tags. See: https://ogp.me/#optional */}
      {description ? (
        <meta key="description" name="description" content={description} />
      ) : null}
      <meta
        key="og:site_name"
        property="og:site_name"
        content={config.metadata.siteName}
      />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      <meta key="og:type" property="og:type" content="website" />
      <meta
        key="og:title"
        property="og:title"
        content={shareTitle || title || config.metadata.defaultTitle}
      />
      {shareGraphicUrl ? (
        <>
          <meta key="og:image" property="og:image" content={shareGraphicUrl} />
          <meta
            key="og:image:alt"
            property="og:image:alt"
            content={shareTitle || title}
          />
          <meta key="og:image:width" property="og:image:width" content="1200" />
          <meta
            key="og:image:height"
            property="og:image:height"
            content="600"
          />
        </>
      ) : null}

      {ogDescription ? (
        <meta
          key="og:description"
          property="og:description"
          content={ogDescription}
        />
      ) : null}
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      {children}
    </Head>
  );
};
