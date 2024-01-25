import { CTA } from '@/types/sanity';

export const ctaExamples: CTA[] = [
  {
    _type: 'cta',
    label: 'Learn More',
    ariaLabel: null,
    variant: 'primary',
    id: 'learn-more-example',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'genericPage',
        slug: {
          current: 'about',
          _type: 'slug',
        },
        title: 'About',
      },
    },
  },
  {
    link: {
      _type: 'link',
      externalUrl: null,
      file: {
        asset: {
          _type: 'sanity.fileAsset',
          _id: 'file-30de3ea5e39fd240e183acae6a11bd2df3a91b0e-zip',
          originalFilename: 'firefly-images.zip',
          url: 'https://cdn.sanity.io/files/xgbrv2vi/production/30de3ea5e39fd240e183acae6a11bd2df3a91b0e.zip',
          extension: 'zip',
          size: 19092790,
        },
      },
      documentLink: null,
    },
    _type: 'cta',
    label: 'Get the Goods',
    ariaLabel: null,
    variant: 'secondary',
    id: 'cta-secondary-example',
  },
  {
    _type: 'cta',
    label: 'Download',
    ariaLabel: 'Download the Firefly Mobile app',
    variant: 'outlined',
    id: 'cta-example-outlined',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'downloadPage',
      },
    },
  },
];
