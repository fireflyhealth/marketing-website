import { defineField } from 'sanity';

/**
 * A simple rich text field type that does not allow
 * for headings (just bold, italics, links)
 *
 * Mostly used within smaller components.
 */
export const SimpleRichText = defineField({
  name: 'simpleRichText',
  title: 'RichText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          // {
          //   name: 'link',
          //   type: 'object',
          //   title: 'Link',
          //   fields: [
          //     {
          //       name: 'link',
          //       type: 'link',
          //       title: 'Linked Page, URL, or File',
          //     },
          //   ],
          // },
        ],
      },
    },
  ],
});
