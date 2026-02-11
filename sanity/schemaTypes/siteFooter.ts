import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteFooter',
  title: 'Site Footer',
  type: 'document',
  fields: [
    // Company Info
    defineField({
      name: 'companyName_en',
      title: 'Company Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'companyName_de',
      title: 'Company Name (German)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description_en',
      title: 'Company Description (English)',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description_de',
      title: 'Company Description (German)',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),

    // Contact Details
    defineField({
      name: 'address_en',
      title: 'Address (English)',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'address_de',
      title: 'Address (German)',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      name: 'googleMapUrl',
      title: 'Google Maps URL',
      type: 'url'
    }),

    // Navigation Links
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label_en',
              title: 'Label (English)',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'label_de',
              title: 'Label (German)',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'label_en',
              subtitle: 'url'
            }
          }
        }
      ]
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' }
                ]
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        }
      ]
    }),

    // Bottom Bar
    defineField({
      name: 'copyright_en',
      title: 'Copyright Text (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'copyright_de',
      title: 'Copyright Text (German)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'privacyPolicyLabel_en',
      title: 'Privacy Policy Label (English)',
      type: 'string'
    }),
    defineField({
      name: 'privacyPolicyLabel_de',
      title: 'Privacy Policy Label (German)',
      type: 'string'
    }),
    defineField({
      name: 'privacyPolicyUrl',
      title: 'Privacy Policy URL',
      type: 'url'
    })
  ],
  preview: {
    select: {
      title: 'companyName_en'
    }
  }
})
