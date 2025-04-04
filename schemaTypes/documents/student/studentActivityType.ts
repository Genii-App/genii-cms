import {defineField, defineType} from 'sanity'
import {ActivityIcon, ClockIcon, UsersIcon, BookIcon} from '@sanity/icons'

export const studentActivityType = defineType({
  name: 'studentActivity',
  title: 'Student Activity',
  type: 'document',
  icon: ActivityIcon,
  preview: {
    select: {
      studentName: 'student.name',
      type: 'activityType',
      courseName: 'course.title',
      createdAt: '_createdAt',
    },
    prepare({studentName, type, courseName, createdAt}) {
      const activityTypes = {
        course_started: 'Started Course',
        course_completed: 'Completed Course',
        lesson_completed: 'Completed Lesson',
        quiz_attempted: 'Attempted Quiz',
        quiz_passed: 'Passed Quiz',
        achievement_earned: 'Earned Achievement',
        note_created: 'Created Note',
      }
      return {
        title: studentName || 'Unknown Student',
        subtitle: `${activityTypes[type as keyof typeof activityTypes] || type} ${courseName ? `• ${courseName}` : ''} • ${new Date(createdAt as string).toLocaleDateString()}`,
        media: ActivityIcon,
      }
    },
  },
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'details',
      title: 'Activity Details',
      icon: BookIcon,
    },
    {
      name: 'metadata',
      title: 'Metadata',
      icon: ClockIcon,
    },
  ],
  fields: [
    defineField({
      name: 'student',
      title: 'Student',
      type: 'reference',
      to: [{type: 'student'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Student reference is required'),
    }),
    defineField({
      name: 'activityType',
      title: 'Activity Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Started Course', value: 'course_started'},
          {title: 'Completed Course', value: 'course_completed'},
          {title: 'Completed Lesson', value: 'lesson_completed'},
          {title: 'Attempted Quiz', value: 'quiz_attempted'},
          {title: 'Passed Quiz', value: 'quiz_passed'},
          {title: 'Earned Achievement', value: 'achievement_earned'},
          {title: 'Created Note', value: 'note_created'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Activity type is required'),
    }),
    defineField({
      name: 'course',
      title: 'Related Course',
      type: 'reference',
      to: [{type: 'course'}],
      group: 'details',
      validation: (rule) =>
        rule.custom((course, context) => {
          const activityType = (context.document as ActivityDocument)?.activityType
          if (activityType?.includes('course') && !course) {
            return 'Course reference is required for course-related activities'
          }
          return true
        }),
    }),
    defineField({
      name: 'lesson',
      title: 'Related Lesson',
      type: 'reference',
      to: [{type: 'lesson'}],
      group: 'details',
      hidden: ({document}) =>
        !['lesson_completed'].includes((document as ActivityDocument)?.activityType || ''),
      validation: (rule) =>
        rule.custom((lesson, context) => {
          const activityType = (context.document as ActivityDocument)?.activityType
          if (activityType === 'lesson_completed' && !lesson) {
            return 'Lesson reference is required for lesson completion activities'
          }
          return true
        }),
    }),
    defineField({
      name: 'quiz',
      title: 'Related Quiz',
      type: 'reference',
      to: [{type: 'quiz'}],
      group: 'details',
      hidden: ({document}) =>
        !['quiz_attempted', 'quiz_passed'].includes(
          (document as ActivityDocument)?.activityType || '',
        ),
    }),
    defineField({
      name: 'quizAttempt',
      title: 'Quiz Attempt',
      type: 'reference',
      to: [{type: 'quizAttempt'}],
      group: 'details',
      hidden: ({document}) =>
        !['quiz_attempted', 'quiz_passed'].includes(
          (document as ActivityDocument)?.activityType || '',
        ),
      validation: (rule) =>
        rule.custom((attempt, context) => {
          const activityType = (context.document as ActivityDocument)?.activityType
          if (['quiz_attempted', 'quiz_passed'].includes(activityType || '') && !attempt) {
            return 'Quiz attempt reference is required for quiz-related activities'
          }
          return true
        }),
    }),
    defineField({
      name: 'achievement',
      title: 'Achievement',
      type: 'reference',
      to: [{type: 'badge'}],
      group: 'details',
      hidden: ({document}) => (document as ActivityDocument)?.activityType !== 'achievement_earned',
      validation: (rule) =>
        rule.custom((achievement, context) => {
          const activityType = (context.document as ActivityDocument)?.activityType
          if (activityType === 'achievement_earned' && !achievement) {
            return 'Achievement reference is required for achievement activities'
          }
          return true
        }),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'reference',
      to: [{type: 'studentNote'}],
      group: 'details',
      hidden: ({document}) => (document as ActivityDocument)?.activityType !== 'note_created',
      validation: (rule) =>
        rule.custom((note, context) => {
          const activityType = (context.document as ActivityDocument)?.activityType
          if (activityType === 'note_created' && !note) {
            return 'Note reference is required for note creation activities'
          }
          return true
        }),
    }),
    defineField({
      name: 'metadata',
      title: 'Additional Metadata',
      type: 'object',
      group: 'metadata',
      fields: [
        defineField({
          name: 'duration',
          title: 'Duration (minutes)',
          type: 'number',
          validation: (rule) => rule.min(0).error('Duration cannot be negative'),
        }),
        defineField({
          name: 'score',
          title: 'Score',
          type: 'number',
          validation: (rule) =>
            rule.min(0).error('Score cannot be negative').max(100).error('Score cannot exceed 100'),
        }),
        defineField({
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              {title: 'Web', value: 'web'},
              {title: 'Mobile App', value: 'mobile'},
              {title: 'Tablet', value: 'tablet'},
            ],
          },
        }),
      ],
    }),
  ],
})

interface ActivityDocument {
  activityType?: string
}
