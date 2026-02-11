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
            { name: 'title_en', title: 'Title (English)', type: 'string' },
            { name: 'title_de', title: 'Title (German)', type: 'string' },

          

            { name: 'subtitle_en', title: 'Subtitle (English)', type: 'text' },
            { name: 'subtitle_de', title: 'Subtitle (German)', type: 'text' },

            { name: 'button1_en', title: 'Button 1 Text (English)', type: 'string' },
            { name: 'button1_de', title: 'Button 1 Text (German)', type: 'string' },

            { name: 'button1_link', title: 'Button 1 Link', type: 'string' },

            { name: 'button2_en', title: 'Button 2 Text (English)', type: 'string' },
            { name: 'button2_de', title: 'Button 2 Text (German)', type: 'string' },

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
