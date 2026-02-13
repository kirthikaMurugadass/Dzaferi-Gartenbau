import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featureCard',
  title: 'Feature Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required()
        }
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'string',
      description: 'Internal or external link (e.g., /about, /services)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Cards will be sorted by this number (lowest first)',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active cards will be displayed on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      order: 'order'
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle,
        media: media
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
