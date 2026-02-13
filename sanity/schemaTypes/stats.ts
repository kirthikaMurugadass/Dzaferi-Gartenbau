import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Stats',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Label for the stat (e.g., "Happy Clients", "Projects Completed")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'value',
      title: 'Numeric Value',
      type: 'number',
      description: 'The number to animate (e.g., 15, 200, 100)',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'Text to display after the number (e.g., "+", "%", "K+")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional additional description',
      rows: 2
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Stats will be sorted by this number (lowest first)',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active stats will be displayed on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      value: 'value',
      suffix: 'suffix',
      order: 'order'
    },
    prepare({ title, value, suffix, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${value}${suffix}`
      }
    }
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})
