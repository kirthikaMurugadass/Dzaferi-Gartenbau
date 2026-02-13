import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      description: 'Full name of the client',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role/Location',
      type: 'string',
      description: 'Job title, company, or location (e.g., "Homeowner, Zurich")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'message',
      title: 'Testimonial Message',
      type: 'text',
      description: 'The testimonial quote or message',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500)
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      description: 'Photo of the client (optional but recommended)',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility'
        }
      ]
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Star rating (1-5)',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Testimonials will be sorted by this number (lowest first)',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Display this testimonial on the home page',
      initialValue: true
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active testimonials will be displayed',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      order: 'order',
      rating: 'rating'
    },
    prepare({ title, subtitle, media, order, rating }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} - ${rating}⭐`,
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Rating (High to Low)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }]
    }
  ]
})
