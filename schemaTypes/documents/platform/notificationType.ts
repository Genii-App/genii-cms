import {defineField, defineType} from 'sanity'
import {BellIcon, ClockIcon, UsersIcon} from '@sanity/icons'

export const notificationType = defineType({
  name: 'notification',
  title: 'Platform Notification',
  type: 'document',
  icon: BellIcon,
  preview: {
    select: {
      title: 'title',
      type: 'type',
      status: 'status',
      createdAt: '_createdAt',
    },
    prepare({title, type, status, createdAt}) {
      return {
        title: title || 'Untitled Notification',
        subtitle: `${type || 'Info'} • ${status || 'Draft'} • ${new Date(createdAt as string).toLocaleDateString()}`,
        media: BellIcon,
      }
    },
  },
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'targeting',
      title: 'Targeting',
      icon: UsersIcon,
    },
    {
      name: 'scheduling',
      title: 'Scheduling',
      icon: ClockIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) =>
        rule
          .required()
          .error('Title is required')
          .min(3)
          .error('Title must be at least 3 characters')
          .max(100)
          .error('Title cannot be longer than 100 characters'),
      description: 'A clear, concise title for the notification',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .error('Message is required')
          .min(10)
          .error('Message must be at least 10 characters')
          .max(500)
          .error('Message cannot be longer than 500 characters'),
      description: 'The main notification message',
    }),
    defineField({
      name: 'type',
      title: 'Notification Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Success', value: 'success'},
          {title: 'Warning', value: 'warning'},
          {title: 'Error', value: 'error'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (rule) => rule.required().error('Please select a notification type'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Scheduled', value: 'scheduled'},
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required().error('Please select a status'),
    }),
    defineField({
      name: 'link',
      title: 'Action Link',
      type: 'url',
      group: 'content',
      description: 'Optional: Add a link for users to click on the notification',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      group: 'targeting',
      of: [{type: 'reference', to: [{type: 'student'}]}],
      validation: (rule) => rule.required().error('Please select a target audience'),
    }),
    defineField({
      name: 'specificUsers',
      title: 'Specific Users',
      type: 'array',
      group: 'targeting',
      of: [{type: 'reference', to: [{type: 'student'}]}],
      description: 'Optional: Target specific users (leave empty to use Target Audience)',
      hidden: ({document}) => document?.targetAudience !== 'specific',
    }),
    defineField({
      name: 'scheduledFor',
      title: 'Schedule For',
      type: 'datetime',
      group: 'scheduling',
      description: 'When should this notification be sent?',
      validation: (rule) =>
        rule.custom((datetime, context) => {
          if (context.document?.status === 'scheduled' && !datetime) {
            return 'Scheduled notifications must have a date/time'
          }
          if (datetime && new Date(datetime) < new Date()) {
            return 'Schedule time must be in the future'
          }
          return true
        }),
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      group: 'scheduling',
      description: 'When should this notification stop being shown?',
      validation: (rule) =>
        rule.custom((datetime, context) => {
          const scheduledFor = context.document?.scheduledFor
          if (datetime && scheduledFor && new Date(datetime) <= new Date(scheduledFor)) {
            return 'Expiry time must be after scheduled time'
          }
          return true
        }),
    }),
  ],
})
