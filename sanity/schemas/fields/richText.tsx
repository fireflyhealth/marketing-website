import { defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';

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
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'link',
                type: 'link',
                title: 'Linked Page, URL, or File',
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    },
  ],
});

/**
 * Rich text blocks that are used within ChildBlockRichText
 * and ArticleRichText
 **/
const commonRichTextBlocks = [
  { name: 'barGraphObject', type: 'barGraphItems', title: 'Bar Graph' },
  { name: 'bigNumbers', type: 'bigNumbers', title: 'Big Numbers' },
  { name: 'richTextCtaRow', type: 'richTextCtaRow', title: 'CTAs' },
  {
    name: 'bigOrderedList',
    type: 'bigOrderedList',
    title: 'Big Ordered List',
  },
];

/**
 * A Rich Text block with some, but not all, rich text options.
 * This is used in places that have limited space, i.e., as a child
 * of a 2-Up block. */
export const LimitedRichText = defineField({
  name: 'limitedRichText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        /* Note: custom editor styling for this is in lib/styles.css */
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
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'link',
                type: 'link',
                title: 'Linked Page, URL, or File',
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    },
    ...commonRichTextBlocks,
  ],
});

/**
 * A rich text block with more, but not *all* article
 * rich text settings. This is used within the Tabs component.
 *
 * TODO: Align with design to determine what fields should be
 * included here. Maybe this will just be { body: ArticleRichText }
 *
 * NOTE: this needs to be an object with an inner field for the
 * actual rich text. This block is used as an array member within
 * the Tabs component, and sanity schemas do not allow for nested
 * arrays.
 * (i.e. (array of tabs blocks)->(array of 'block' | ...richTextBlocks))
 */
export const ContentBlockRichText = defineField({
  name: 'contentBlockRichText',
  title: 'Rich Text',
  icon: icons.Article,
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
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
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'link',
                    type: 'link',
                    title: 'Linked Page, URL, or File',
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
        { name: 'icon', type: 'icon', title: 'Icon' },
        { name: 'richImage', type: 'richImage', title: 'Image' },
        {
          name: 'twoColumnUnorderedList',
          type: 'twoColumnUnorderedList',
          title: '2 Column Unordered List',
        },
        ...commonRichTextBlocks,
      ],
    }),
  ],
  preview: {
    select: { body: 'body' },
    prepare: ({ body }) => {
      return {
        title: 'Rich Text',
        subtitle: body ? richTextToString(body) : undefined,
      };
    },
  },
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
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'link',
                type: 'link',
                title: 'Linked Page, URL, or File',
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    },
    { name: 'icon', type: 'icon', title: 'Icon' },
    { name: 'richImage', type: 'richImage', title: 'Image' },
    { name: 'form', type: 'hubspotForm', title: 'Form' },
    { name: 'quoteObject', type: 'quoteObject', title: 'Quote' },
    {
      name: 'overlapDoubleImages',
      type: 'overlapDoubleImages',
      title: 'Overlap Double Images',
    },
    { name: 'video', type: 'video', title: 'Video' },
    {
      name: 'twoColumnUnorderedList',
      type: 'twoColumnUnorderedList',
      title: '2 Column Unordered List',
    },
    ...commonRichTextBlocks,
  ],
});
