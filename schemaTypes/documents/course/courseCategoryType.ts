import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const courseCategoryType = defineType({
  name: 'courseCategory',
  title: 'Course Category',
  type: 'document',
  icon: TagIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().error('Category name is required'),
      description: 'Name of the category',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('A slug is required for routing'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) =>
        rule
          .required()
          .min(20)
          .warning('Category descriptions work better when they are at least 20 characters long')
          .max(200)
          .error('Category description cannot be longer than 200 characters'),
      description: 'A brief description of this category',
    }),
    defineField({
      name: 'icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.required().error('Category icon is required for better visibility'),
      description: 'An icon that represents this category (1:1 ratio recommended)',
    }),
  ],
})
