import {defineField, defineType} from 'sanity'
import {EditIcon, DocumentTextIcon, PlayIcon, UserIcon} from '@sanity/icons'

interface Block {
  _type: string
  children?: {
    _type: string
    text?: string
  }[]
}

export const lessonContentType = defineType({
  name: 'lessonContent',
  title: 'Lesson Content',
  type: 'document',
  icon: EditIcon,
  preview: {
    select: {
      title: 'lesson.title',
      type: 'type',
      isDefault: 'isDefault',
      createdBy: 'createdBy.name',
      version: 'version',
    },
    prepare({title, type, isDefault, createdBy, version}) {
      const icon = type === 'video' ? '🎥' : '📝'
      const versionLabel = version ? ` • v${version}` : ''
      const authorLabel = createdBy ? ` • By ${createdBy}` : ''
      const defaultLabel = isDefault === 'yes' ? ' (Default)' : ''

      return {
        title: title || 'Untitled Lesson',
        subtitle: `${icon} ${type.charAt(0).toUpperCase() + type.slice(1)}${defaultLabel}${versionLabel}${authorLabel}`,
        media: type === 'video' ? PlayIcon : DocumentTextIcon,
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
      title: 'Content',
      icon: EditIcon,
    },
    {
      name: 'metadata',
      title: 'Metadata',
      icon: UserIcon,
    },
  ],
  fieldsets: [
    {
      name: 'contentType',
      title: 'Content Type',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      group: 'basic',
      fieldset: 'contentType',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (rule) => rule.required().error('Content type is required'),
      description: 'Select the type of content for this version',
    }),
    defineField({
      name: 'isDefault',
      title: 'Default Version',
      type: 'string',
      group: 'basic',
      fieldset: 'contentType',
      options: {
        list: [
          {title: 'Yes - Default Content', value: 'yes'},
          {title: 'No - Alternative Version', value: 'no'},
        ],
        layout: 'radio',
      },
      initialValue: 'yes',
      validation: (rule) => rule.required().error('Please specify if this is the default content'),
      description: 'Specify if this is the primary content version that most students will see',
    }),
    defineField({
      name: 'version',
      title: 'Version Number',
      type: 'number',
      group: 'basic',
      initialValue: 1,
      validation: (rule) =>
        rule
          .required()
          .error('Version number is required')
          .integer()
          .error('Version must be a whole number')
          .min(1)
          .error('Version must be at least 1'),
      description: 'Increment this number for each new version of the content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
      validation: (rule) =>
        rule
          .required()
          .error('Content is required')
          .custom((blocks: Block[] = []) => {
            if (!blocks || !blocks.length) return true
            const wordCount = blocks
              .filter((block) => block._type === 'block')
              .reduce((acc: number, block: Block) => {
                return (
                  acc +
                  (block.children || [])
                    .filter((child) => child._type === 'span')
                    .reduce(
                      (acc: number, span) => acc + (span.text ? span.text.split(/\s+/).length : 0),
                      0,
                    )
                )
              }, 0)
            if (wordCount < 50) {
              return 'Content should be at least 50 words long for better learning experience'
            }
            return true
          }),
      description:
        'Write or paste the lesson content here - use formatting tools for better readability',
    }),
    defineField({
      name: 'lesson',
      title: 'Associated Lesson',
      type: 'reference',
      group: 'metadata',
      to: [{type: 'lesson'}],
      validation: (rule) => rule.required().error('Content must be associated with a lesson'),
      description: 'Select the lesson this content belongs to',
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      group: 'metadata',
      to: [{type: 'student'}],
      description: 'Select the student who created this content version (if applicable)',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
      readOnly: true,
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
  ],
})
