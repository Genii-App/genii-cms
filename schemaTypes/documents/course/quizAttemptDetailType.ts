import {defineField, defineType} from 'sanity'

export const quizAttemptDetailType = defineType({
  name: 'quizAttemptDetail',
  title: 'Quiz Attempt Detail',
  type: 'document',
  fields: [
    defineField({
      name: 'quizAttempt',
      type: 'reference',
      to: [{type: 'quizAttempt'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'question',
      type: 'reference',
      to: [{type: 'question'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'reference',
      to: [{type: 'answerOption'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isCorrect',
      type: 'boolean',
      validation: (rule) => rule.required(),
    }),
  ],
})
