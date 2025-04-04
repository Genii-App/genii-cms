import {defineField, defineType} from 'sanity'
import {HelpCircleIcon, DocumentTextIcon, ImageIcon, CogIcon} from '@sanity/icons'

type QuestionType = 'multipleChoice' | 'trueFalse' | 'fillInTheBlank'

export const questionType = defineType({
  name: 'question',
  title: 'Question',
  type: 'document',
  icon: HelpCircleIcon,
  preview: {
    select: {
      text: 'text',
      type: 'type',
      answerCount: 'answers.length',
      quizTitle: 'quiz.title',
    },
    prepare({text, type, answerCount = 0, quizTitle}) {
      const typeMap: Record<QuestionType, string> = {
        multipleChoice: '📝 Multiple Choice',
        trueFalse: '✅ True/False',
        fillInTheBlank: '🖊️ Fill in the Blank',
      }

      return {
        title: text || 'Untitled Question',
        subtitle: `${typeMap[type as QuestionType] || 'Unknown Type'} • ${answerCount} answer${answerCount === 1 ? '' : 's'} • ${quizTitle || 'Unassigned Quiz'}`,
        media: HelpCircleIcon,
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
    {
      name: 'settings',
      title: 'Question Settings',
      icon: CogIcon,
    },
  ],
  fieldsets: [
    {
      name: 'behavior',
      title: 'Question Behavior',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'text',
      title: 'Question Text',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .error('Question text is required')
          .min(10)
          .warning('Questions work better when they are clear and detailed')
          .max(500)
          .error('Question text cannot be longer than 500 characters'),
      description: 'Write your question - be clear and specific',
    }),
    defineField({
      name: 'type',
      title: 'Question Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Multiple Choice', value: 'multipleChoice'},
          {title: 'True/False', value: 'trueFalse'},
          {title: 'Fill in the Blank', value: 'fillInTheBlank'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Question type is required'),
      description: 'Select the type of question',
    }),
    defineField({
      name: 'image',
      title: 'Question Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
        storeOriginalFilename: false,
      },
      description: 'Optional: Add an image to support the question (recommended: 800x600px)',
    }),
    defineField({
      name: 'quiz',
      title: 'Associated Quiz',
      type: 'reference',
      to: [{type: 'quiz'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Question must be associated with a quiz'),
      description: 'Select the quiz this question belongs to',
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'number',
      group: 'settings',
      initialValue: 1,
      validation: (rule) =>
        rule
          .required()
          .error('Points value is required')
          .integer()
          .error('Points must be a whole number')
          .min(1)
          .error('Points must be at least 1'),
      description: 'How many points this question is worth',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Medium', value: 'medium'},
          {title: 'Hard', value: 'hard'},
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      validation: (rule) => rule.required().error('Difficulty level is required'),
      description: 'Rate the difficulty of this question',
    }),
    defineField({
      name: 'randomizeAnswers',
      title: 'Answer Order',
      type: 'string',
      group: 'settings',
      fieldset: 'behavior',
      options: {
        list: [
          {title: 'Random Order', value: 'random'},
          {title: 'Fixed Order', value: 'fixed'},
        ],
        layout: 'radio',
      },
      initialValue: 'random',
      validation: (rule) => rule.required().error('Please specify the answer order'),
      description: 'Should answer options be presented in random order or fixed order',
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'text',
      group: 'settings',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .error('Explanation is required')
          .min(20)
          .warning('Explanations work better when they are detailed')
          .max(1000)
          .error('Explanation cannot be longer than 1000 characters'),
      description: 'Explain the correct answer and why it is correct',
    }),
    defineField({
      name: 'answers',
      title: 'Answer Options',
      type: 'array',
      group: 'basic',
      of: [{type: 'reference', to: [{type: 'answerOption'}]}],
      options: {
        sortable: true,
        layout: 'grid',
      },
      validation: (rule) =>
        rule
          .required()
          .custom((answers, context) => {
            if (!answers || !answers.length) {
              return 'At least one answer is required'
            }
            if (context.document?.type === 'trueFalse' && answers.length !== 2) {
              return 'True/False questions must have exactly 2 options'
            }
            if (context.document?.type === 'multipleChoice' && answers.length < 2) {
              return 'Multiple choice questions must have at least 2 options'
            }
            if (context.document?.type === 'fillInTheBlank' && answers.length !== 1) {
              return 'Fill in the blank questions must have exactly 1 answer'
            }
            return true
          })
          .unique()
          .error('Each answer can only be added once'),
      description: 'Add and arrange the answer options for this question',
    }),
  ],
})
