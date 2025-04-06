import {defineField, defineType} from 'sanity'
import {BookIcon, ImageIcon, DocumentTextIcon, TagIcon, PlayIcon} from '@sanity/icons'

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
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
      name: 'details',
      title: 'Course Details',
      icon: TagIcon,
    },
    {
      name: 'content',
      title: 'Course Content',
      icon: PlayIcon,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.name',
      difficulty: 'difficulty',
      language: 'language',
      media: 'thumbnail',
    },
    prepare({title, subtitle, difficulty, language, media}) {
      return {
        title,
        subtitle: `${subtitle || 'Uncategorized'} • ${difficulty || 'No difficulty'} • ${language}`,
        media,
      }
    },
  },
  fieldsets: [
    {
      name: 'metadata',
      title: 'Course Metadata',
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
          .error('A course title is required')
          .min(5)
          .warning('Course titles work better when they are at least 5 characters long')
          .max(100)
          .error('Course title cannot be longer than 100 characters'),
      description: 'Name of the course - be descriptive and engaging',
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
      description: 'This will be used for the course URL',
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: 'basic',
      rows: 4,
      validation: (rule) =>
        rule
          .required()
          .min(50)
          .warning('Course descriptions work better when they are at least 50 characters long')
          .max(1000)
          .error('Course description cannot be longer than 1000 characters'),
      description:
        'A compelling description of what students will learn - focus on outcomes and benefits',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'courseCategory'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Course category is required for organization'),
      description: 'Select the primary category for this course',
    }),
    defineField({
      name: 'difficulty',
      type: 'string',
      group: 'basic',
      fieldset: 'metadata',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      initialValue: 'beginner',
      validation: (rule) => rule.required().error('Course difficulty level is required'),
    }),
    defineField({
      name: 'language',
      type: 'string',
      group: 'basic',
      fieldset: 'metadata',
      options: {
        list: [
          {title: 'Bahasa Indonesia', value: 'indonesia'},
          {title: 'English', value: 'english'},
        ],
        layout: 'radio',
      },
      initialValue: 'indonesia',
      validation: (rule) => rule.required().error('Course language is required'),
    }),
    defineField({
      name: 'isPremium',
      title: 'Access Level',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Premium', value: 'premium'},
        ],
        layout: 'radio',
      },
      initialValue: 'free',
      validation: (rule) => rule.required().error('Course access level must be specified'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Course Thumbnail',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
        storeOriginalFilename: false,
      },
      validation: (rule) =>
        rule.required().error('Course thumbnail is required for better visibility'),
      description: 'Upload a high-quality image (16:9 ratio recommended, minimum 1280x720px)',
    }),
    defineField({
      name: 'trailer',
      title: 'Course Trailer',
      type: 'url',
      group: 'media',
      description: 'Loom video URL for the course trailer (must be a share URL)',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          try {
            const url = new URL(value)
            if (!url.hostname.endsWith('loom.com')) {
              return 'URL must be from loom.com'
            }
            if (!url.pathname.startsWith('/share/')) {
              return 'Must be a Loom share URL'
            }
            const videoId = url.pathname.split('/share/')[1]
            if (!/^[a-f0-9-]{32,36}/.test(videoId)) {
              return 'Invalid Loom video ID in URL'
            }
            return true
          } catch {
            return 'Please enter a valid URL'
          }
        }),
    }),
    defineField({
      name: 'additionalDetails',
      title: 'Additional Details',
      type: 'array',
      group: 'details',
      options: {
        sortable: true,
        modal: {type: 'dialog'},
      },
      initialValue: [
        {title: 'Requirements', description: 'Requirements to join the course'},
        {title: "What you'll learn", description: "What you'll learn in the course"},
        {title: "What you'll get", description: "What you'll get in the course"},
      ],
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
          fields: [
            {
              title: 'Title',
              type: 'string',
              name: 'title',
              validation: (rule) => rule.required().error('Section title is required'),
            },
            {
              title: 'Description',
              type: 'text',
              name: 'description',
              rows: 3,
              validation: (rule) =>
                rule
                  .required()
                  .error('Section description is required')
                  .min(10)
                  .warning('Descriptions work better when they are detailed'),
            },
          ],
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .error(
            'At least three sections are required (Requirements, Learning Outcomes, and Benefits)',
          ),
    }),
    defineField({
      name: 'chapters',
      title: 'Course Chapters',
      type: 'array',
      group: 'content',
      options: {
        sortable: true,
        layout: 'grid',
      },
      of: [{type: 'reference', to: [{type: 'chapter'}]}],
      validation: (rule) => rule.unique().error('Each chapter can only be added once'),
    }),
  ],
})
