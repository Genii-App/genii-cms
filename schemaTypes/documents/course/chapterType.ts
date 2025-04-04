import {defineField, defineType} from 'sanity'
import {DocumentsIcon, DocumentTextIcon, PlayIcon} from '@sanity/icons'

export const chapterType = defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  icon: DocumentsIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'course.title',
      description: 'description',
      lessonCount: 'lessons.length',
    },
    prepare({title, subtitle, description, lessonCount = 0}) {
      return {
        title,
        subtitle: `${subtitle || 'Uncategorized Course'} • ${lessonCount} lesson${lessonCount === 1 ? '' : 's'}`,
        description,
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
      title: 'Chapter Content',
      icon: PlayIcon,
    },
  ],
  fieldsets: [
    {
      name: 'metadata',
      title: 'Chapter Metadata',
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
          .error('Chapter title is required')
          .min(3)
          .warning('Chapter titles work better when they are at least 3 characters long')
          .max(100)
          .error('Chapter title cannot be longer than 100 characters'),
      description: 'Name of the chapter - be clear and descriptive',
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
      description: 'This will be used for the chapter URL',
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .min(30)
          .warning('Chapter descriptions work better when they are at least 30 characters long')
          .max(500)
          .error('Chapter description cannot be longer than 500 characters'),
      description:
        'A clear description of what students will learn in this chapter - focus on specific outcomes',
    }),
    defineField({
      name: 'course',
      type: 'reference',
      to: [{type: 'course'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Chapter must be associated with a course'),
      description: 'Select the course this chapter belongs to',
    }),
    defineField({
      name: 'orderNumber',
      title: 'Chapter Order',
      type: 'number',
      group: 'basic',
      fieldset: 'metadata',
      validation: (rule) =>
        rule
          .required()
          .error('Chapter order is required')
          .integer()
          .error('Chapter order must be a whole number')
          .min(1)
          .error('Chapter order must be at least 1'),
      description: 'The order of this chapter in the course (1, 2, 3, etc.)',
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
      description: 'Approximate time to complete this chapter in minutes',
    }),
    defineField({
      name: 'lessons',
      title: 'Chapter Lessons',
      type: 'array',
      group: 'content',
      options: {
        sortable: true,
        layout: 'grid',
      },
      of: [{type: 'reference', to: [{type: 'lesson'}]}],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('At least one lesson is required')
          .unique()
          .error('Each lesson can only be added once'),
      description: 'Add and arrange the lessons for this chapter',
    }),
    defineField({
      name: 'quiz',
      title: 'Chapter Quiz',
      type: 'reference',
      group: 'content',
      to: [{type: 'quiz'}],
      validation: (rule) => rule.required().error('A quiz is required to complete the chapter'),
      description: 'Select or create the quiz for this chapter',
    }),
  ],
})
