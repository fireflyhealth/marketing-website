import { defineType } from 'sanity';
import {
  defaultContentBlockTypes,
  childContentBlockTypes,
} from '../../lib/constants';

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
