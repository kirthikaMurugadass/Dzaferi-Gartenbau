import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('heroSection').title('Hero Section'),
      S.documentTypeListItem('featureCard').title('Feature Cards'),
      S.documentTypeListItem('stats').title('Stats'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('siteFooter').title('Site Footer'),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['heroSection', 'featureCard', 'stats', 'testimonial', 'siteFooter', 'category', 'author'].includes(item.getId()!),
      ),
    ])
