import {defineField, defineType} from 'sanity'

export const studentStreakType = defineType({
  name: 'studentStreak',
  title: 'Student Streak',
  type: 'document',
  fields: [
    defineField({
      type: 'datetime',
      name: 'startedAt',
    }),

    defineField({
      type: 'datetime',
      name: 'endedAt',
    }),

    defineField({
      type: 'string',
      name: 'status',
      options: {
        list: ['active', 'inactive'],
      },
    }),

    defineField({
      type: 'number',
      name: 'streak',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),

    defineField({
      type: 'reference',
      name: 'student',
      to: [{type: 'student'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
