import {defineField, defineType} from 'sanity'
import {CheckmarkCircleIcon, DocumentTextIcon, ImageIcon} from '@sanity/icons'

interface QuestionReference {
  randomizeAnswers?: string
}

interface AnswerDocument {
  question?: QuestionReference
}

export const answerOptionType = defineType({
  name: 'answerOption',
  title: 'Answer Option',
  type: 'document',
  icon: CheckmarkCircleIcon,
  preview: {
    select: {
      text: 'text',
      isCorrect: 'isCorrect',
      questionText: 'question.text',
    },
    prepare({text, isCorrect, questionText}) {
      return {
        title: text || 'Untitled Answer',
        subtitle: `${isCorrect ? '✅ Correct' : '❌ Incorrect'} • ${questionText ? `For: ${questionText}` : 'Unassigned Question'}`,
        media: CheckmarkCircleIcon,
      }
    },
  },
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      icon: DocumentTextIcon,
      default: true,
    },
    {
      name: 'media',
      title: 'Media',
      icon: ImageIcon,
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Answer Text',
      type: 'text',
      group: 'basic',
      rows: 2,
      validation: (rule) =>
        rule
          .required()
          .error('Answer text is required')
          .min(1)
          .error('Answer text cannot be empty')
          .max(500)
          .error('Answer text cannot be longer than 500 characters'),
      description: 'Write the answer option text',
    }),
    defineField({
      name: 'isCorrect',
      title: 'Correct Answer',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Yes - This is correct', value: 'true'},
          {title: 'No - This is incorrect', value: 'false'},
        ],
        layout: 'radio',
      },
      initialValue: 'false',
      validation: (rule) => rule.required().error('Please specify if this is the correct answer'),
      description: 'Indicate whether this is the correct answer',
    }),
    defineField({
      name: 'explanation',
      title: 'Answer Explanation',
      type: 'text',
      group: 'basic',
      rows: 2,
      validation: (rule) =>
        rule.custom((explanation, context) => {
          const isCorrect = context.document?.isCorrect === 'true'
          if (isCorrect && !explanation) {
            return 'Explanation is required for correct answers'
          }
          if (explanation && explanation.length > 500) {
            return 'Explanation cannot be longer than 500 characters'
          }
          return true
        }),
      description: 'Explain why this answer is correct or incorrect (required for correct answers)',
    }),
    defineField({
      name: 'question',
      title: 'Associated Question',
      type: 'reference',
      to: [{type: 'question'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Answer must be associated with a question'),
      description: 'Select the question this answer belongs to',
    }),
    defineField({
      name: 'image',
      title: 'Answer Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
        storeOriginalFilename: false,
      },
      description: 'Optional: Add an image to support the answer (recommended: 800x600px)',
    }),
    defineField({
      name: 'orderNumber',
      title: 'Display Order',
      type: 'number',
      group: 'basic',
      validation: (rule) =>
        rule
          .integer()
          .error('Order must be a whole number')
          .min(1)
          .error('Order must be at least 1'),
      description: 'Optional: Set a specific display order for this answer option',
      hidden: ({document}) => {
        const question = (document as AnswerDocument)?.question
        return question?.randomizeAnswers === 'random'
      },
    }),
  ],
})
