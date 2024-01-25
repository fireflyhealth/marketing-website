import { LinkWithLabel } from '@/types/sanity';

export const linkWithLabelExamples: LinkWithLabel[] = [
  {
    _type: 'linkWithLabel',
    label: 'To External URL',
    link: {
      _type: 'link',
      externalUrl: 'https://www.sanctuary.computer',
      file: null,
      documentLink: null,
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'File Download',
    link: {
      _type: 'link',
      externalUrl: null,
      file: {
        asset: {
          url: 'https://cdn.sanity.io/files/xgbrv2vi/production/30de3ea5e39fd240e183acae6a11bd2df3a91b0e.zip',
          extension: 'zip',
          size: 19092790,
          _type: 'sanity.fileAsset',
          _id: 'file-30de3ea5e39fd240e183acae6a11bd2df3a91b0e-zip',
          originalFilename: 'firefly-images.zip',
        },
      },
      documentLink: null,
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Homepage',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'homepage',
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Contact Page',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'contactPage',
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Download Page',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'downloadPage',
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To FAQ Page',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'faqPage',
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Generic Page',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'genericPage',
        slug: {
          current: 'how-it-works',
          _type: 'slug',
        },
        title: 'How It Works',
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Subpage',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'subPage',
        slug: {
          _type: 'slug',
          current: 'care-team',
        },
        title: 'Care Team',
        parentPage: {
          _type: 'genericPage',
          title: 'About',
          slug: {
            current: 'about',
            _type: 'slug',
          },
        },
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Blog',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'blog',
        slug: {
          _type: 'slug',
          current: 'for-members',
        },
        title: 'For Members',
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Blog Article',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'blogArticle',
        slug: {
          _type: 'slug',
          current: 'the-many-health-benefits-of-fiber',
        },
        title: 'The Many Health Benefits of Fiber',
        category: {
          _type: 'blog',
          slug: {
            current: 'for-members',
            _type: 'slug',
          },
          title: 'For Members',
        },
      },
    },
  },
  {
    _type: 'linkWithLabel',
    label: 'To Client Page',
    link: {
      _type: 'link',
      externalUrl: null,
      file: null,
      documentLink: {
        _type: 'clientPage',
        slug: {
          current: 'massachusetts-blue-cross',
          _type: 'slug',
        },
        clientName: 'Massachusetts Blue Cross',
      },
    },
  },
];
