import { defineType } from 'sanity';
import {
  defaultContentBlockTypes,
  providerPageBlockTypes,
} from '../../lib/constants';

/**
 * Content blocks that are used as children within
 * the 2-up block.
 */
const childContentBlockTypes = [
  { type: 'richTextChildBlock' },
  { type: 'imageChildBlock' },
  { type: 'bigNumbers' },
  { type: 'quoteChildBlock' },
  { type: 'videoChildBlock' },
];

export const ChildContentBlock = defineType({
  name: 'childContentBlock',
  title: 'Content Block',
  type: 'array',
  of: childContentBlockTypes,
  validation: (Rule) => Rule.required().max(1),
});

export const ContentArea = defineType({
  name: 'contentArea',
  title: 'Content Area',
  type: 'array',
  of: defaultContentBlockTypes,
});

export const ProviderPageContentArea = defineType({
  name: 'providerPageContentArea',
  title: 'Content Area',
  type: 'array',
  of: providerPageBlockTypes,
});
