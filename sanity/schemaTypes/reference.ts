import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'referenceEntry',
  title: 'References',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location_en',
      title: 'Location (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location_de',
      title: 'Location (German)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Display format, e.g. 044 923 41 50',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'References will be sorted by this number (lowest first)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'show',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      location_en: 'location_en',
      order: 'order',
      show: 'show',
    },
    prepare({ title, location_en, order, show }) {
      return {
        title: `${order ?? 0}. ${title ?? 'Reference'}`,
        subtitle: `${location_en || ''}${show === false ? ' (hidden)' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

