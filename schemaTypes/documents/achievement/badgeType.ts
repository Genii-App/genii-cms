import {defineField, defineType} from 'sanity'
import {FaceHappyIcon} from '@sanity/icons'
export const badgeType = defineType({
  name: 'badge',
  title: 'Badge',
  type: 'document',
  icon: FaceHappyIcon,
  groups: [
    {
      name: 'basicInformation',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      validation: (rule) => rule.required(),
      group: 'basicInformation',
    }),

    defineField({
      type: 'text',
      name: 'description',
      validation: (rule) => rule.required(),
      group: 'basicInformation',
    }),

    defineField({
      type: 'image',
      name: 'image',
      group: 'basicInformation',
    }),

    defineField({
      type: 'reference',
      name: 'chapter',
      to: [{type: 'chapter'}],
      validation: (rule) => rule.required(),
      group: 'basicInformation',
    }),

    defineField({
      type: 'number',
      name: 'points',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
      group: 'settings',
    }),

    defineField({
      type: 'string',
      name: 'rarity',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Common', value: 'common'},
          {title: 'Uncommon', value: 'uncommon'},
          {title: 'Rare', value: 'rare'},
          {title: 'Epic', value: 'epic'},
          {title: 'Legendary', value: 'legendary'},
        ],
      },
      group: 'settings',
    }),

    defineField({
      type: 'boolean',
      name: 'isActive',
      initialValue: true,
      group: 'settings',
    }),
  ],
})
