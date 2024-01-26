import { defineType } from 'sanity';

export const ContentArea = defineType({
  name: 'contentArea',
  title: 'Content Area',
  type: 'array',
  of: [{ type: 'headerBlock' }],
});
