import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { validateNotOrphanedSubpage } from '../fields/linking';

export const FeaturedStoriesBlock = defineType({
  name: 'featuredStoriesBlock',
  title: 'Featured Stories Block',
  type: 'object',
  icon: icons.Article,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'stories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'blogArticle' }],
          // @ts-ignore
          validation: validateNotOrphanedSubpage,
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      header: 'header',
      story1title: 'stories.0.title',
      stories: 'stories',
    },
    prepare: ({ header, story1title, stories }) => {
      /* Weird - when you query a referenced item's field in 'select',
       * it transforms the array that the item came from into an object, i.e.
       * { 0: <story>, 2: <story>, 3: ... } */
      const storiesLength = Object.values(stories).length;
      const plusMore = storiesLength > 2 ? ` + ${storiesLength - 2} more` : '';
      const subtitle = header?.title || story1title.concat(plusMore);
      return {
        title: 'Featured Stories Block',
        subtitle,
      };
    },
  },
});
