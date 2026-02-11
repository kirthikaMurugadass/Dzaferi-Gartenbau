import { type SchemaTypeDefinition } from 'sanity'

// Blog types
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { authorType } from './authorType'

// Site sections
import heroSectionType from './heroSection'
import siteFooterType from './siteFooter'
import featureCardType from './featureCard'
import statsType from './stats'
import testimonialType from './testimonial'
import projectType from './project'
import referenceType from './reference'
import serviceType from './service'
import contactSubmissionType from './contactSubmission'
import contactPageType from './contactPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    authorType,
    heroSectionType,
    siteFooterType,
    featureCardType,
    statsType,
    testimonialType,
    projectType,
    referenceType,
    serviceType,
    contactSubmissionType,
    contactPageType,
  ],
}
