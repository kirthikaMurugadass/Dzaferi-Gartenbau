import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name_en',
      title: 'Client Name (English)',
      type: 'string',
      description: 'Full name of the client',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'name_de',
      title: 'Client Name (German)',
      type: 'string',
      description: 'Full name of the client in German',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'role_en',
      title: 'Role/Location (English)',
      type: 'string',
      description: 'Job title, company, or location (e.g., "Homeowner, Zurich")',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'role_de',
      title: 'Role/Location (German)',
      type: 'string',
      description: 'Job title, company, or location in German',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'message_en',
      title: 'Testimonial Message (English)',
      type: 'text',
      description: 'The testimonial quote or message',
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500)
    }),
    defineField({
      name: 'message_de',
      title: 'Testimonial Message (German)',
      type: 'text',
      description: 'The testimonial quote or message in German',
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
      title: 'name_en',
      subtitle: 'role_en',
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
