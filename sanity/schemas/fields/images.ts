import { FieldDefinition, defineField } from 'sanity';

const sharedImageFields: FieldDefinition<'string'>[] = [
  {
    name: 'altText',
    title: 'Alternative Text',
    type: 'string',
    description:
      '(Accessibility) A description of the contents of the image. This should describe the visual contents of the image, i.e. "A person practicing yoga", and not cta-type text such as "Learn more about Yoga".',
    validation: (Rule) =>
      Rule.custom((value, context) => {
        // @ts-ignore
        if (!context?.parent?.asset && value) {
          return 'Must be removed when there is no image';
        }
        if (!context?.parent) {
          return true;
        }
        if (!value) {
          return 'Required';
        }
        return true;
      }),
  },
];

const options = {
  /*
   * Enables the user interface for selecting what areas of an image
   * should always be cropped, what areas should never be cropped,
   * and the center of the area to crop around when resizing.
   * The hotspot data is stored in the image field itself, not in
   * the image asset, so images can have different crops for each
   * place they are used.
   *
   * see: https://www.sanity.io/docs/image-type#hotspot-3e6da78954a8 */
  hotspot: true,
};

export const RichImage = defineField({
  name: 'richImage',
  title: 'Rich Image',
  type: 'image',
  fields: [...sharedImageFields],
  options,
  preview: {
    select: {
      altText: 'altText',
      image: 'image',
      asset: 'asset',
    },
    prepare: ({ altText, asset }) => {
      return { title: altText, media: asset };
    },
  },
});

/**
 * An image with an additional caption field
 * and enabled hotspot/cropping
 */

export const RichImageWithCaption = defineField({
  name: 'richImageWithCaption',
  title: 'Rich Image With Caption',
  type: 'image',
  fields: [
    /**
     * These two validation rules ensure that when an image is removed,
     * the other fields must be as well. This prevents our frontend from
     * receiving a richImage that looks like:
     * {
     *   featuredImage: {
     *     altText: "A cute dog",
     *     asset: null
     *   }
     * }
     *
     * Once the caption & altText are removed, the frontend will receive:
     *
     * {
     *   featuredImage: null
     * }
     *
     * And we will not render an empty <SanityImage /> without an asset.
     */

    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          if (!context.parent.asset && value) {
            return 'Must be removed when there is no image';
          }
          return true;
        }),
    },
    ...sharedImageFields,
  ],
  options,
  preview: {
    select: {
      caption: 'caption',
      altText: 'altText',
      image: 'image',
      asset: 'asset',
    },
    prepare: ({ caption, altText, asset }) => {
      return caption
        ? {
            title: caption,
            media: asset,
            subtitle: altText,
          }
        : { title: altText, media: asset };
    },
  },
});

export const ResponsiveImageSet = defineField({
  name: 'responsiveImageSet',
  title: 'Responsive Image Set',
  type: 'object',
  description:
    'Provide alternate images to use at different screen sizes. Only one is required.',
  fields: [
    defineField({
      name: 'desktop',
      type: 'richImage',
    }),
    defineField({ name: 'tablet', type: 'richImage' }),
    defineField({ name: 'mobile', type: 'richImage' }),
  ],
});
