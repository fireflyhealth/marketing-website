import { StringInputProps, defineType } from 'sanity';
import { snakeCaseToSentence } from '../../lib/utils';
import {
  iconTypes,
  BrandedIcon,
  IconTypeName,
} from '../../../www/src/svgs/BrandedIcon';
import { Maybe } from '../../lib/types';

export const brandedIcons = iconTypes
  .map((iconType) => ({
    title: snakeCaseToSentence(iconType),
    value: iconType,
  }))
  .sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

export const Icon = defineType({
  name: 'icon',
  type: 'object',
  title: 'Icon',
  fields: [
    {
      name: 'icon',
      type: 'string',
      title: 'Icon',
      validation: (Rule) => Rule.required(),
      components: {
        input: (props: StringInputProps) => {
          const iconType = props.value as Maybe<IconTypeName>;

          return (
            <div className="Icon__input">
              <div className="Icon__preview">
                {iconType ? <BrandedIcon type={iconType} /> : null}
              </div>

              <div className="Icon__inputField">
                {props.renderDefault(props)}
              </div>
            </div>
          );
        },
      },
      options: {
        list: brandedIcons,
      },
    },
  ],
  preview: {
    select: {
      title: 'icon',
    },
    prepare: ({ title }) => {
      return {
        title: title ? snakeCaseToSentence(title) : '(empty)',
        media: title ? <BrandedIcon type={title} /> : null,
      };
    },
  },
});
