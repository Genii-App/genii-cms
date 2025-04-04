import {defineField, defineType} from 'sanity'
import {ImageIcon, ClockIcon, UsersIcon, RocketIcon} from '@sanity/icons'

export const bannerType = defineType({
  name: 'banner',
  title: 'Platform Banner',
  type: 'document',
  icon: RocketIcon,
  preview: {
    select: {
      title: 'title',
      type: 'type',
      status: 'status',
      image: 'image',
    },
    prepare({title, type, status, image}) {
      return {
        title: title || 'Untitled Banner',
        subtitle: `${type || 'Info'} • ${status || 'Draft'}`,
        media: image || RocketIcon,
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
      name: 'media',
      title: 'Media',
      icon: ImageIcon,
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
      description: 'A clear, concise title for internal reference',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      group: 'content',
      rows: 2,
      validation: (rule) =>
        rule
          .required()
          .error('Message is required')
          .min(10)
          .error('Message must be at least 10 characters')
          .max(200)
          .error('Message cannot be longer than 200 characters'),
      description: 'The main banner message (keep it short and impactful)',
    }),
    defineField({
      name: 'type',
      title: 'Banner Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Success', value: 'success'},
          {title: 'Warning', value: 'warning'},
          {title: 'Error', value: 'error'},
          {title: 'Promotional', value: 'promo'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (rule) => rule.required().error('Please select a banner type'),
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
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      description:
        'Optional: Add an image to make the banner more engaging (recommended: 1200x300px)',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      group: 'media',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Brand Primary', value: 'primary'},
          {title: 'Brand Secondary', value: 'secondary'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      description: 'Choose a background color theme for the banner',
    }),
    defineField({
      name: 'link',
      title: 'Action Link',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Learn More',
          validation: (rule) =>
            rule.max(20).error('Button text should be concise (max 20 characters)'),
        }),
      ],
      description: 'Optional: Add a call-to-action button',
    }),
    defineField({
      name: 'placement',
      title: 'Banner Placement',
      type: 'string',
      group: 'targeting',
      options: {
        list: [
          {title: 'Top of Page', value: 'top'},
          {title: 'Bottom of Page', value: 'bottom'},
          {title: 'Floating', value: 'float'},
        ],
        layout: 'radio',
      },
      initialValue: 'top',
      validation: (rule) => rule.required().error('Please select banner placement'),
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'string',
      group: 'targeting',
      options: {
        list: [
          {title: 'All Users', value: 'all'},
          {title: 'Free Users', value: 'free'},
          {title: 'Premium Users', value: 'premium'},
          {title: 'New Users', value: 'new'},
        ],
        layout: 'radio',
      },
      initialValue: 'all',
      validation: (rule) => rule.required().error('Please select a target audience'),
    }),
    defineField({
      name: 'targetPages',
      title: 'Show On Pages',
      type: 'array',
      group: 'targeting',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'All Pages', value: '*'},
          {title: 'Home Page', value: '/'},
          {title: 'Course Pages', value: '/courses/*'},
          {title: 'Profile Pages', value: '/profile/*'},
        ],
      },
      initialValue: ['*'],
      validation: (rule) => rule.required().error('Please select at least one page'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      group: 'scheduling',
      validation: (rule) =>
        rule.custom((datetime, context) => {
          if (context.document?.status === 'scheduled' && !datetime) {
            return 'Scheduled banners must have a start date'
          }
          if (datetime && new Date(datetime as string) < new Date()) {
            return 'Start date must be in the future'
          }
          return true
        }),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      group: 'scheduling',
      validation: (rule) =>
        rule.custom((datetime, context) => {
          const startDate = context.document?.startDate as string | undefined
          if (datetime && startDate && new Date(datetime as string) <= new Date(startDate)) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'dismissible',
      title: 'Allow Dismissal',
      type: 'string',
      group: 'targeting',
      options: {
        list: [
          {title: 'Yes - Users can dismiss', value: 'yes'},
          {title: 'No - Always show', value: 'no'},
        ],
        layout: 'radio',
      },
      initialValue: 'yes',
      description: 'Allow users to dismiss/close the banner',
    }),
  ],
})
