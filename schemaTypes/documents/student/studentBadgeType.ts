import {defineField, defineType} from 'sanity'

export const studentBadgeType = defineType({
  name: 'studentBadge',
  title: 'Student Badge',
  type: 'document',
  fields: [
    defineField({
      type: 'reference',
      name: 'badge',
      to: [{type: 'badge'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: 'reference',
      name: 'student',
      to: [{type: 'student'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: 'datetime',
      name: 'earnedAt',
    }),
  ],
})
