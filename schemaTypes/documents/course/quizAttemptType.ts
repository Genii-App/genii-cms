import {defineField, defineType} from 'sanity'

export const quizAttemptType = defineType({
  name: 'quizAttempt',
  title: 'Quiz Attempt',
  type: 'document',
  fields: [
    defineField({
      name: 'quiz',
      type: 'reference',
      to: [{type: 'quiz'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'student',
      type: 'reference',
      to: [{type: 'student'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'feedback',
      type: 'text',
    }),

    defineField({
      name: 'score',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(100),
    }),

    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Passed', value: 'passed'},
          {title: 'Failed', value: 'failed'},
          {title: 'In Progress', value: 'inProgress'},
        ],
      },
    }),

    defineField({
      name: 'startedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'submittedAt',
      type: 'datetime',
    }),

    defineField({
      name: 'metadata',
      type: 'object',
      fields: [
        {
          name: 'timeTaken',
          type: 'number',
        },
        {
          name: 'totalQuestions',
          type: 'number',
        },
        {
          name: 'correctAnswers',
          type: 'number',
        },
        {
          name: 'incorrectAnswers',
          type: 'number',
        },
      ],
    }),
  ],
})
