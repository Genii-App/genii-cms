import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const studentType = defineType({
  name: 'student',
  title: 'Student',
  type: 'document',
  icon: UserIcon,
  groups: [
    {
      name: 'profile',
      title: 'Profile',
      default: true,
    },
    {
      name: 'preferences',
      title: 'Learning Preferences',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'image',
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required().warning('A name helps identify the student'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required().email().error('A valid email is required'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'profile',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      description: 'Profile picture of the student',
    }),
    defineField({
      name: 'clientId',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required(),
      description: 'Unique identifier for the student',
    }),
    defineField({
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'string',
      group: 'profile',
      initialValue: 'pending',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Verified', value: 'verified'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'alreadyOnboarded',
      title: 'Already Onboarded',
      description: 'Whether the student has already onboarded',
      type: 'boolean',
      group: 'profile',
      initialValue: false,
    }),
    defineField({
      name: 'learningPreferences',
      title: 'Learning Preferences',
      type: 'object',
      group: 'preferences',
      fields: [
        {
          name: 'goal',
          type: 'string',
          validation: (rule) => rule.required().error('Learning goal is required'),
          description: 'What does the student want to achieve?',
        },
        {
          name: 'focus',
          type: 'string',
          validation: (rule) => rule.required().error('Learning focus is required'),
          description: 'What specific area does the student want to focus on?',
        },
        {
          name: 'topic',
          type: 'string',
          validation: (rule) => rule.required().error('Learning topic is required'),
          description: 'What topic does the student want to learn?',
        },
        {
          name: 'level',
          type: 'string',
          options: {
            list: [
              {title: 'Beginner', value: 'beginner'},
              {title: 'Intermediate', value: 'intermediate'},
              {title: 'Advanced', value: 'advanced'},
            ],
            layout: 'radio',
          },
          description: 'Current knowledge level of the student',
        },
        {
          name: 'studyTime',
          type: 'string',
          validation: (rule) => rule.required().error('Study time preference is required'),
          description: 'How much time can the student dedicate to learning?',
        },
        {
          name: 'studyTimeOfDay',
          type: 'string',
          validation: (rule) => rule.required().error('Preferred study time is required'),
          description: 'When does the student prefer to study?',
        },
      ],
    }),
    defineField({
      name: 'settings',
      type: 'object',
      group: 'settings',
      fields: [
        {
          title: 'Notification Preferences',
          name: 'notifications',
          type: 'object',
          fields: [
            {
              title: 'Email Notifications',
              name: 'email',
              type: 'string',
              options: {
                list: [
                  {title: 'All', value: 'all'},
                  {title: 'Important Only', value: 'important'},
                  {title: 'None', value: 'none'},
                ],
                layout: 'radio',
              },
              initialValue: 'important',
            },
          ],
        },
      ],
    }),
  ],
})
