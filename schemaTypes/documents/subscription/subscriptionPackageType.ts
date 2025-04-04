import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const subscriptionPackageType = defineType({
  name: 'subscriptionPackage',
  title: 'Subscription Package',
  type: 'document',
  icon: PackageIcon,
  groups: [
    {
      name: 'basicInformation',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'pricing',
      title: 'Pricing',
    },
    {
      name: 'features',
      title: 'Features',
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
      validation: (rule) => rule.required(),
      group: 'basicInformation',
    }),

    defineField({
      type: 'text',
      name: 'description',
      validation: (rule) => rule.required(),
      group: 'basicInformation',
    }),

    defineField({
      type: 'image',
      name: 'image',
      group: 'basicInformation',
    }),

    defineField({
      type: 'number',
      name: 'price',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
      group: 'pricing',
      description: 'Price in Rupiah Indonesia',
    }),

    defineField({
      type: 'number',
      name: 'duration',
      validation: (rule) => rule.required().min(0),
      description: 'Duration in days',
      initialValue: 0,
      group: 'pricing',
    }),

    defineField({
      type: 'array',
      name: 'features',
      title: 'Features',
      of: [{type: 'string'}],
      group: 'features',
    }),

    defineField({
      type: 'boolean',
      name: 'isPopular',
      initialValue: false,
      group: 'basicInformation',
    }),

    defineField({
      type: 'boolean',
      name: 'isActive',
      initialValue: true,
      group: 'basicInformation',
    }),

    defineField({
      type: 'datetime',
      name: 'availableFrom',
      group: 'pricing',
    }),

    defineField({
      type: 'datetime',
      name: 'availableUntil',
      group: 'pricing',
    }),
  ],
})
