import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'text' },
            { name: 'button1', title: 'Button 1 Text', type: 'string' },
            { name: 'button1_link', title: 'Button 1 Link', type: 'string' },
            { name: 'button2', title: 'Button 2 Text', type: 'string' },
            { name: 'button2_link', title: 'Button 2 Link', type: 'string' },
            {
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'sliderImages',
      title: 'Slider Images',
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
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required().min(3).error('Minimum 3 images required')
    })
  ]
})
