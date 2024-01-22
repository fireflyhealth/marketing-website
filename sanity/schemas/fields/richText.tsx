import { defineField } from 'sanity';

/**
 * A simple rich text field type that does not allow
 * for headings (just bold, italics, links)
 *
 * Mostly used within smaller components.
 */
export const SimpleRichText = defineField({
  name: 'simpleRichText',
  title: 'Rich Text',
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
          { title: 'Underline', value: 'underline' },
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

export const ArticleRichText = defineField({
  name: 'articleRichText',
  title: 'Article Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Paragraph', value: 'normal' },
        /* Note: custom editor styling for this is in lib/styles.css */
        { title: 'Quote (L)', value: 'blockquote-large' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
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
