import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      description: 'Service interest or subject',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'German', value: 'de' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      submittedAt: 'submittedAt',
      status: 'status',
    },
    prepare({ name, email, submittedAt, status }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date';
      return {
        title: name || 'Unnamed',
        subtitle: `${email || 'No email'} • ${date} • ${status || 'new'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'submittedAtAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
