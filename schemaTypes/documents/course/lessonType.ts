import {defineField, defineType} from 'sanity'
import {DocumentTextIcon, PlayIcon, EditIcon} from '@sanity/icons'

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'title',
      type: 'type',
      content: 'content.content',
      estimatedTime: 'estimatedTime',
    },
    prepare({title, type, content, estimatedTime}) {
      const icon = type === 'video' ? '🎥' : '📝'
      const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
      const duration = estimatedTime ? ` • ${estimatedTime} min` : ''

      return {
        title,
        subtitle: `${icon} ${typeLabel} Lesson${duration}`,
        media: type === 'video' ? PlayIcon : EditIcon,
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
      name: 'content',
      title: 'Lesson Content',
      icon: EditIcon,
    },
  ],
  fieldsets: [
    {
      name: 'metadata',
      title: 'Lesson Metadata',
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
          .error('Lesson title is required')
          .min(3)
          .warning('Lesson titles work better when they are at least 3 characters long')
          .max(100)
          .error('Lesson title cannot be longer than 100 characters'),
      description: 'Name of the lesson - be specific about what will be learned',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required().error('A slug is required for routing'),
      description: 'This will be used for the lesson URL',
    }),
    defineField({
      name: 'type',
      type: 'string',
      group: 'basic',
      fieldset: 'metadata',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (rule) => rule.required().error('Lesson type is required'),
      description: 'Select the type of content for this lesson',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Time (minutes)',
      type: 'number',
      group: 'basic',
      fieldset: 'metadata',
      validation: (rule) =>
        rule
          .required()
          .error('Estimated time is required')
          .integer()
          .error('Time must be in whole minutes')
          .min(1)
          .error('Time must be at least 1 minute'),
      description: 'Approximate time to complete this lesson in minutes',
    }),
    defineField({
      name: 'orderNumber',
      title: 'Lesson Order',
      type: 'number',
      group: 'basic',
      validation: (rule) =>
        rule
          .required()
          .error('Lesson order is required')
          .integer()
          .error('Lesson order must be a whole number')
          .min(1)
          .error('Lesson order must be at least 1'),
      description: 'The order of this lesson in the chapter (1, 2, 3, etc.)',
    }),
    defineField({
      name: 'content',
      title: 'Lesson Content',
      type: 'reference',
      group: 'content',
      to: [{type: 'lessonContent'}],
      validation: (rule) => rule.required().error('Lesson content is required'),
      description: 'Select or create the content for this lesson',
      options: {
        disableNew: false,
      },
    }),
  ],
})
