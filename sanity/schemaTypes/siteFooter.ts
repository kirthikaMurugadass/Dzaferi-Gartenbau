import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteFooter',
  title: 'Site Footer',
  type: 'document',
  fields: [
    // Company Info
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
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
      name: 'address',
      title: 'Address',
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
              name: 'label',
              title: 'Label',
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
              title: 'label',
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
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'privacyPolicyLabel',
      title: 'Privacy Policy Label',
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
      title: 'companyName'
    }
  }
})
