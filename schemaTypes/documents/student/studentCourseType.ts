import {defineField, defineType} from 'sanity'
import {BookIcon, ClockIcon, TrendUpwardIcon, CheckmarkCircleIcon} from '@sanity/icons'

interface CourseReference {
  _ref?: string
}

interface StudentCourseDocument {
  course?: CourseReference
  status?: string
  certificateIssued?: string
  enrolledAt?: string
}

export const studentCourseType = defineType({
  name: 'studentCourse',
  title: 'Student Course Progress',
  type: 'document',
  icon: BookIcon,
  preview: {
    select: {
      studentName: 'student.name',
      courseName: 'course.title',
      progress: 'progress',
      status: 'status',
    },
    prepare({studentName, courseName, progress, status}) {
      return {
        title: `${studentName || 'Unknown Student'} - ${courseName || 'Unknown Course'}`,
        subtitle: `Progress: ${progress || 0}% • Status: ${status || 'Not Started'}`,
        media: BookIcon,
      }
    },
  },
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'progress',
      title: 'Progress Tracking',
      icon: TrendUpwardIcon,
    },
    {
      name: 'completion',
      title: 'Completion Details',
      icon: CheckmarkCircleIcon,
    },
    {
      name: 'timing',
      title: 'Time Tracking',
      icon: ClockIcon,
    },
  ],
  fields: [
    defineField({
      name: 'student',
      title: 'Student',
      type: 'reference',
      to: [{type: 'student'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Student reference is required'),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{type: 'course'}],
      group: 'basic',
      validation: (rule) => rule.required().error('Course reference is required'),
    }),
    defineField({
      name: 'status',
      title: 'Course Status',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Not Started', value: 'not_started'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Completed', value: 'completed'},
          {title: 'On Hold', value: 'on_hold'},
          {title: 'Dropped', value: 'dropped'},
        ],
        layout: 'radio',
      },
      initialValue: 'not_started',
      validation: (rule) => rule.required().error('Course status is required'),
    }),
    defineField({
      name: 'progress',
      title: 'Progress Percentage',
      type: 'number',
      group: 'progress',
      validation: (rule) =>
        rule
          .required()
          .min(0)
          .error('Progress cannot be negative')
          .max(100)
          .error('Progress cannot exceed 100%'),
      initialValue: 0,
      description: 'Overall course completion percentage',
    }),
    defineField({
      name: 'nextChapter',
      title: 'Next Chapter',
      type: 'reference',
      to: [{type: 'chapter'}],
      group: 'progress',
      description: 'The next chapter the student needs to complete',
    }),
    defineField({
      name: 'nextLesson',
      title: 'Next Lesson',
      type: 'reference',
      to: [{type: 'lesson'}],
      group: 'progress',
      description: 'The next lesson the student needs to complete',
    }),
    defineField({
      name: 'completedChapters',
      title: 'Completed Chapters',
      type: 'array',
      group: 'progress',
      of: [{type: 'reference', to: [{type: 'chapter'}]}],
      validation: (rule) =>
        rule.custom((chapters, context) => {
          if (!chapters) return true
          const courseId = (context.document as StudentCourseDocument)?.course?._ref
          if (!courseId) return true
          // Additional validation could be added here to check if chapters belong to the course
          return true
        }),
    }),
    defineField({
      name: 'completedLessons',
      title: 'Completed Lessons',
      type: 'array',
      group: 'progress',
      of: [{type: 'reference', to: [{type: 'lesson'}]}],
    }),
    defineField({
      name: 'quizAttempts',
      title: 'Quiz Attempts',
      type: 'array',
      group: 'progress',
      of: [{type: 'reference', to: [{type: 'quizAttempt'}]}],
    }),
    defineField({
      name: 'lastAccessedAt',
      title: 'Last Accessed',
      type: 'datetime',
      group: 'timing',
      validation: (rule) =>
        rule.custom((datetime) => {
          if (datetime && new Date(datetime as string) > new Date()) {
            return 'Last accessed date cannot be in the future'
          }
          return true
        }),
    }),
    defineField({
      name: 'enrolledAt',
      title: 'Enrollment Date',
      type: 'datetime',
      group: 'timing',
      validation: (rule) => rule.required().error('Enrollment date is required'),
    }),
    defineField({
      name: 'completedAt',
      title: 'Completion Date',
      type: 'datetime',
      group: 'completion',
      validation: (rule) =>
        rule.custom((datetime, context) => {
          if (!datetime) return true
          const enrolledAt = context.document?.enrolledAt as string | undefined
          if (datetime && enrolledAt && new Date(datetime as string) <= new Date(enrolledAt)) {
            return 'Completion date must be after enrollment date'
          }
          return true
        }),
      hidden: ({document}) => (document as StudentCourseDocument)?.status !== 'completed',
    }),
    defineField({
      name: 'certificateIssued',
      title: 'Certificate Status',
      type: 'string',
      group: 'completion',
      options: {
        list: [
          {title: 'Not Eligible', value: 'not_eligible'},
          {title: 'Eligible - Not Issued', value: 'eligible'},
          {title: 'Issued', value: 'issued'},
        ],
        layout: 'radio',
      },
      initialValue: 'not_eligible',
      validation: (rule) => rule.required().error('Certificate status is required'),
      hidden: ({document}) => (document as StudentCourseDocument)?.status !== 'completed',
    }),
    defineField({
      name: 'certificate',
      title: 'Course Certificate',
      type: 'reference',
      to: [{type: 'studentCertificate'}],
      group: 'completion',
      hidden: ({document}) =>
        (document as StudentCourseDocument)?.status !== 'completed' ||
        (document as StudentCourseDocument)?.certificateIssued !== 'issued',
    }),
    defineField({
      name: 'notes',
      title: 'Progress Notes',
      type: 'array',
      group: 'progress',
      of: [{type: 'reference', to: [{type: 'studentNote'}]}],
      description: "Notes related to student's course progress",
    }),
  ],
})
