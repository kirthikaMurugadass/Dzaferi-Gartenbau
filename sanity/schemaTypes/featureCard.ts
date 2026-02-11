import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featureCard',
  title: 'Feature Cards',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title_de',
      title: 'Title (German)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description_de',
      title: 'Description (German)',
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
      title: 'title_en',
      subtitle: 'description_en',
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
