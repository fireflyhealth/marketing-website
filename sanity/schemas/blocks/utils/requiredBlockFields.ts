import { defineField } from 'sanity';
import { notRequiredIdValidationRule } from '../../util/idValidationRule';

export const requiredBlockFields = [
  defineField({
    name: 'id',
    type: 'string',
    title: 'ID',
    description:
      'Used for subnav links. Must be unique and has to match the corresponding subnav "Content Block ID" field.',
    validation: notRequiredIdValidationRule,
  }),
  defineField({
    name: 'header',
    type: 'contentBlockHeader',
    title: 'Header',
  }),
];
