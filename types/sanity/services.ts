export interface SanityImage {
  asset?: {
    _id: string
    url: string
  }
  alt?: string
}

export interface ServiceCardType {
  id: string
  slug: string
  title: string
  description: string
  image?: SanityImage
  order?: number
}

export interface ServiceDetailType extends ServiceCardType {
  details?: any[] // blockContent array
  heroImage?: SanityImage
}
