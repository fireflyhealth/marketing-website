import { defineField } from 'sanity';
import { notRequiredIdValidationRule } from '../../util/idValidationRule';
import { icons } from '../../../lib/icons';

export const requiredBlockFields = [
  defineField({
    name: 'subnav',
    type: 'object',
    title: 'Subnav',
    icon: icons.Subnav,
    options: {
      collapsible: true,
      collapsed: true,
    },
    validation: (rule) =>
      rule.custom((fields) => {
        const label = fields?.label as string | undefined;
        const contentBlockId = fields?.contentBlockId as string | undefined;

        if (
          label &&
          label.length > 0 &&
          (!contentBlockId || (contentBlockId && contentBlockId.length <= 0))
        )
          return 'Content Block ID is required to add subnav';

        return true;
      }),
    fields: [
      defineField({
        name: 'contentBlockId',
        type: 'string',
        title: 'Content Block ID',
        description:
          'Used for subnav links. Must be unique among all content blocks on the page. This ID is used to scroll to the content block when the subnav link is clicked.',
        validation: notRequiredIdValidationRule,
      }),
      defineField({
        name: 'label',
        type: 'string',
        title: 'Label',
        description:
          'Used for subnav. If this field is not provided, this block will not be included in the subnav.',
      }),
      defineField({
        name: 'ariaLabel',
        type: 'string',
        title: 'Aria Label',
        description:
          'Optional. Provide an Aria Label when the button\'s text label does not convey its function adequately or if the label is too generic. For example: a button with the label "OK" should be given an Aria Label such as "Accept terms & conditions"',
      }),
    ],
  }),
  defineField({
    name: 'header',
    type: 'contentBlockHeader',
    title: 'Header',
  }),
];
