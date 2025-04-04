import {defineField, defineType} from 'sanity'

export const studentCertificateType = defineType({
  name: 'studentCertificate',
  title: 'Student Certificate',
  type: 'document',
  fields: [
    defineField({
      type: 'reference',
      name: 'course',
      to: [{type: 'course'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: 'reference',
      name: 'student',
      to: [{type: 'student'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      type: 'datetime',
      name: 'issuedAt',
    }),

    defineField({
      type: 'string',
      name: 'status',
      validation: (rule) => rule.required(),
      options: {
        list: ['issued', 'revoked'],
      },
    }),
  ],
})
