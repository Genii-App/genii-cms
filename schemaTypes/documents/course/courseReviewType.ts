import {defineField, defineType} from 'sanity'
import {StarIcon, UserIcon, DocumentTextIcon} from '@sanity/icons'

export const courseReviewType = defineType({
  name: 'courseReview',
  title: 'Course Review',
  type: 'document',
  icon: StarIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      icon: DocumentTextIcon,
      default: true,
    },
    {
      name: 'reviewer',
      title: 'Reviewer Details',
      icon: UserIcon,
    },
  ],
  preview: {
    select: {
      title: 'reviewTitle',
      subtitle: 'course.title',
      rating: 'rating',
      reviewer: 'reviewer.name',
      media: 'course.thumbnail',
    },
    prepare({title, subtitle, rating, reviewer, media}) {
      return {
        title: title || 'Untitled Review',
        subtitle: `${subtitle || 'Unknown Course'} • ${rating || '0'}/5 • By ${reviewer || 'Anonymous'}`,
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'reviewTitle',
      title: 'Review Title',
      type: 'string',
      group: 'basic',
      validation: (rule) =>
        rule
          .required()
          .error('A review title is required')
          .min(5)
          .warning('Review titles work better when they are at least 5 characters long')
          .max(100)
          .error('Review title cannot be longer than 100 characters'),
      description: 'A concise title for the review',
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{type: 'course'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Course reference is required'),
      description: 'The course being reviewed',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      group: 'basic',
      options: {
        list: [
          {title: '1 Star', value: 1},
          {title: '2 Stars', value: 2},
          {title: '3 Stars', value: 3},
          {title: '4 Stars', value: 4},
          {title: '5 Stars', value: 5},
        ],
        layout: 'radio',
      },
      validation: (rule) =>
        rule
          .required()
          .error('Rating is required')
          .min(1)
          .max(5)
          .error('Rating must be between 1 and 5'),
      description: 'Overall rating for the course',
    }),
    defineField({
      name: 'reviewContent',
      title: 'Review Content',
      type: 'text',
      group: 'basic',
      rows: 6,
      validation: (rule) =>
        rule
          .required()
          .error('Review content is required')
          .min(20)
          .warning('Reviews work better when they are detailed')
          .max(2000)
          .error('Review content cannot be longer than 2000 characters'),
      description: 'Detailed review of the course',
    }),
    defineField({
      name: 'reviewer',
      title: 'Reviewer',
      type: 'reference',
      to: [{type: 'student'}],
      group: 'reviewer',
      validation: (rule) => rule.required().error('Reviewer reference is required'),
      description: 'The student who wrote this review',
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'datetime',
      group: 'basic',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('Review date is required'),
    }),
  ],
})
