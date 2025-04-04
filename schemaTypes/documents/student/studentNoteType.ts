import {defineField, defineType} from 'sanity'
import {EditIcon, BookIcon, TagIcon} from '@sanity/icons'

export const studentNoteType = defineType({
  name: 'studentNote',
  title: 'Student Note',
  type: 'document',
  icon: EditIcon,
  preview: {
    select: {
      title: 'title',
      studentName: 'student.name',
      courseName: 'course.title',
      lessonName: 'lesson.title',
      createdAt: '_createdAt',
    },
    prepare({title, studentName, courseName, lessonName, createdAt}) {
      return {
        title: title || 'Untitled Note',
        subtitle: `By ${studentName || 'Unknown Student'} • ${courseName || lessonName || 'General Note'} • ${new Date(createdAt as string).toLocaleDateString()}`,
        media: EditIcon,
      }
    },
  },
  groups: [
    {
      name: 'content',
      title: 'Note Content',
      default: true,
    },
    {
      name: 'reference',
      title: 'References',
      icon: BookIcon,
    },
    {
      name: 'metadata',
      title: 'Metadata',
      icon: TagIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Note Title',
      type: 'string',
      group: 'content',
      validation: (rule) =>
        rule
          .required()
          .error('Note title is required')
          .min(3)
          .error('Title must be at least 3 characters')
          .max(100)
          .error('Title cannot be longer than 100 characters'),
      description: 'A clear, descriptive title for the note',
    }),
    defineField({
      name: 'content',
      title: 'Note Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h1'},
            {title: 'Subheading', value: 'h2'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required().error('Note content is required'),
    }),
    defineField({
      name: 'student',
      title: 'Student',
      type: 'reference',
      to: [{type: 'student'}],
      group: 'reference',
      validation: (rule) => rule.required().error('Student reference is required'),
    }),
    defineField({
      name: 'course',
      title: 'Related Course',
      type: 'reference',
      to: [{type: 'course'}],
      group: 'reference',
      description: 'Optional: Link this note to a specific course',
    }),
    defineField({
      name: 'chapter',
      title: 'Related Chapter',
      type: 'reference',
      to: [{type: 'chapter'}],
      group: 'reference',
      description: 'Optional: Link this note to a specific chapter',
      hidden: ({document}) => !(document as NoteDocument)?.course,
    }),
    defineField({
      name: 'lesson',
      title: 'Related Lesson',
      type: 'reference',
      to: [{type: 'lesson'}],
      group: 'reference',
      description: 'Optional: Link this note to a specific lesson',
      hidden: ({document}) => !(document as NoteDocument)?.chapter,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Add tags to help organize and find notes',
    }),
    defineField({
      name: 'visibility',
      title: 'Note Visibility',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          {title: 'Private', value: 'private'},
          {title: 'Public', value: 'public'},
          {title: 'Share with Instructor', value: 'instructor'},
        ],
        layout: 'radio',
      },
      initialValue: 'private',
      validation: (rule) => rule.required().error('Please select note visibility'),
    }),
    defineField({
      name: 'status',
      title: 'Note Status',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required().error('Please select note status'),
    }),
  ],
})

interface NoteDocument {
  course?: {_ref: string}
  chapter?: {_ref: string}
}
