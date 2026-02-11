import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
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
      name: 'shortDescription_en',
      title: 'Short Description (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription_de',
      title: 'Short Description (German)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription_en',
      title: 'Full Description (English)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'fullDescription_de',
      title: 'Full Description (German)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
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
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'category_en',
      title: 'Category (English)',
      type: 'string',
    }),
    defineField({
      name: 'category_de',
      title: 'Category (German)',
      type: 'string',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'projectURL',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Projects will be sorted by this number (lowest first)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show this project on Home Page?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seoTitle_en',
      title: 'SEO Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle_de',
      title: 'SEO Title (German)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription_en',
      title: 'SEO Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'seoDescription_de',
      title: 'SEO Description (German)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      media: 'mainImage',
      order: 'order',
      showOnHome: 'showOnHome',
    },
    prepare({ title, media, order, showOnHome }) {
      return {
        title: `${order ?? 0}. ${title ?? 'Untitled Project'}`,
        subtitle: showOnHome ? 'Shown on Home' : 'Listing Only',
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

