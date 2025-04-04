import {defineField, defineType} from 'sanity'

export const studentNotificationType = defineType({
  name: 'studentNotification',
  title: 'Student Notification',
  type: 'document',
  fields: [
    defineField({
      type: 'reference',
      name: 'notification',
      to: [{type: 'notification'}],
    }),

    defineField({
      type: 'reference',
      name: 'student',
      to: [{type: 'student'}],
    }),

    defineField({
      type: 'datetime',
      name: 'readAt',
    }),

    defineField({
      type: 'boolean',
      name: 'isRead',
      initialValue: false,
    }),

    defineField({
      type: 'datetime',
      name: 'createdAt',
    }),
  ],
})
