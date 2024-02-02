import { defineType } from 'sanity';

export const HeaderArea = defineType({
  name: 'headerArea',
  title: 'Header Area',
  type: 'array',
  of: [{ type: 'videoHeader' }],
  validation: (Rule) =>
    Rule.required()
      .min(1)
      .max(1)
      .error(
        'Ony one header is allowed per page and is required to publish the page.',
      ),
});
