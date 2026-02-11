import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_de',
      title: 'Title (German)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description_de',
      title: 'Description (German)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details_en',
      title: 'Details (English)',
      type: 'blockContent',
      description: 'Detailed service explanation content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details_de',
      title: 'Details (German)',
      type: 'blockContent',
      description: 'Detailed service explanation content in German',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Hero section image for service detail page. Falls back to Service Image if not set.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Services will be sorted by this number (lowest first)',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show on Home Page',
      type: 'boolean',
      description: 'Display this service on the home page',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active services will be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, media, order, isActive }) {
      return {
        title: `${order ?? 0}. ${title ?? 'Untitled Service'}`,
        subtitle: isActive ? 'Active' : 'Inactive',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Order (Ascending)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
