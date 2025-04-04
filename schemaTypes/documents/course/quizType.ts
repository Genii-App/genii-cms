import {defineField, defineType} from 'sanity'
import {ClipboardIcon, DocumentTextIcon, CogIcon, ClockIcon} from '@sanity/icons'

export const quizType = defineType({
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  icon: ClipboardIcon,
  preview: {
    select: {
      title: 'title',
      chapterTitle: 'chapter.title',
      questionCount: 'questions.length',
      passingScore: 'passingScore',
    },
    prepare({title, chapterTitle, questionCount = 0, passingScore}) {
      return {
        title: title || 'Untitled Quiz',
        subtitle: `${chapterTitle || 'Uncategorized Chapter'} • ${questionCount} question${questionCount === 1 ? '' : 's'} • ${passingScore}% to pass`,
        media: ClipboardIcon,
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
      name: 'settings',
      title: 'Quiz Settings',
      icon: CogIcon,
    },
    {
      name: 'questions',
      title: 'Questions',
      icon: ClipboardIcon,
    },
  ],
  fieldsets: [
    {
      name: 'timing',
      title: 'Timing Settings',
      options: {columns: 2},
    },
    {
      name: 'behavior',
      title: 'Quiz Behavior',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'basic',
      validation: (rule) =>
        rule
          .required()
          .error('Quiz title is required')
          .min(3)
          .warning('Quiz titles work better when they are at least 3 characters long')
          .max(100)
          .error('Quiz title cannot be longer than 100 characters'),
      description: 'Name of the quiz - be descriptive about what is being tested',
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .error('Quiz description is required')
          .min(20)
          .warning('Quiz descriptions work better when they are at least 20 characters long')
          .max(500)
          .error('Quiz description cannot be longer than 500 characters'),
      description: 'A brief description of what this quiz covers and what students should expect',
    }),
    defineField({
      name: 'chapter',
      type: 'reference',
      to: [{type: 'chapter'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Quiz must be associated with a chapter'),
      description: 'Select the chapter this quiz belongs to',
    }),
    defineField({
      name: 'questions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'question'}]}],
      group: 'questions',
      options: {
        sortable: true,
        layout: 'grid',
      },
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('Quiz must have at least one question')
          .unique()
          .error('Each question can only be added once'),
      description: 'Add and arrange the questions for this quiz',
    }),
    defineField({
      name: 'passingScore',
      title: 'Passing Score (%)',
      type: 'number',
      group: 'settings',
      initialValue: 70,
      validation: (rule) =>
        rule
          .required()
          .error('Passing score is required')
          .min(0)
          .error('Passing score cannot be negative')
          .max(100)
          .error('Passing score cannot exceed 100%'),
      description: 'Minimum percentage required to pass the quiz',
    }),
    defineField({
      name: 'timeLimit',
      title: 'Time Limit (minutes)',
      type: 'number',
      group: 'settings',
      fieldset: 'timing',
      initialValue: 15,
      validation: (rule) =>
        rule
          .required()
          .error('Time limit is required')
          .integer()
          .error('Time limit must be a whole number')
          .min(1)
          .error('Time limit must be at least 1 minute'),
      description: 'Maximum time allowed to complete the quiz',
    }),
    defineField({
      name: 'maxAttempts',
      title: 'Maximum Attempts',
      type: 'number',
      group: 'settings',
      fieldset: 'timing',
      initialValue: 3,
      validation: (rule) =>
        rule
          .required()
          .error('Maximum attempts is required')
          .integer()
          .error('Maximum attempts must be a whole number')
          .min(1)
          .error('Maximum attempts must be at least 1'),
      description: 'How many times a student can attempt this quiz',
    }),
    defineField({
      name: 'showResults',
      title: 'Show Results',
      type: 'string',
      group: 'settings',
      fieldset: 'behavior',
      options: {
        list: [
          {title: 'After Each Attempt', value: 'afterEachAttempt'},
          {title: 'After Final Attempt', value: 'afterFinalAttempt'},
          {title: 'Never', value: 'never'},
        ],
        layout: 'radio',
      },
      initialValue: 'afterEachAttempt',
      validation: (rule) => rule.required().error('Please specify when to show results'),
      description: 'When should students see their quiz results',
    }),
    defineField({
      name: 'feedbackType',
      title: 'Feedback Type',
      type: 'string',
      group: 'settings',
      fieldset: 'behavior',
      options: {
        list: [
          {title: 'Immediate Feedback', value: 'immediateFeedback'},
          {title: 'Final Feedback', value: 'finalFeedback'},
          {title: 'No Feedback', value: 'noFeedback'},
        ],
        layout: 'radio',
      },
      initialValue: 'immediateFeedback',
      validation: (rule) => rule.required().error('Please specify the feedback type'),
      description: 'When should students receive feedback on their answers',
    }),
    defineField({
      name: 'randomizeQuestions',
      title: 'Question Order',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Random Order', value: 'random'},
          {title: 'Fixed Order', value: 'fixed'},
        ],
        layout: 'radio',
      },
      initialValue: 'random',
      validation: (rule) => rule.required().error('Please specify the question order'),
      description: 'Should questions be presented in random order or fixed order',
    }),
  ],
})
