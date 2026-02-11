import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    // Header Info Section
    {
      name: 'headerSection',
      title: 'Header Information',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'Title (English)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'de',
              title: 'Title (German)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'Description (English)',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'de',
              title: 'Description (German)',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
    },

    // Contact Details Section
    {
      name: 'contactDetails',
      title: 'Contact Details',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        }),
      ],
    },

    // Address Section
    {
      name: 'addressSection',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'Address (English)',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'de',
              title: 'Address (German)',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
        defineField({
          name: 'googleMapEmbedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          description: 'Full Google Maps embed URL (iframe src)',
          validation: (Rule) => Rule.required(),
        }),
      ],
    },

    // Business Hours Section
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: 'Monday', value: 'Monday' },
                  { title: 'Tuesday', value: 'Tuesday' },
                  { title: 'Wednesday', value: 'Wednesday' },
                  { title: 'Thursday', value: 'Thursday' },
                  { title: 'Friday', value: 'Friday' },
                  { title: 'Saturday', value: 'Saturday' },
                  { title: 'Sunday', value: 'Sunday' },
                ],
              },
            },
            {
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'Example: 08:00 – 18:00 or Closed',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              day: 'day',
              time: 'time',
            },
            prepare({ day, time }) {
              return {
                title: day || 'Day',
                subtitle: time || 'No time',
              }
            },
          },
        },
      ],
    },

    // CTA Section
    {
      name: 'ctaSection',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'object',
          fields: [
            {
              name: 'en',
              title: 'CTA Text (English)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'de',
              title: 'CTA Text (German)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: 'headerSection.title.en',
    },
    prepare() {
      return {
        title: 'Contact Page Settings',
        subtitle: 'Only one document allowed',
      }
    },
  },
})
