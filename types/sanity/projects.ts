export interface SanityImage {
  asset?: {
    _id: string
    url: string
  }
  alt?: string
}

export interface ProjectCard {
  id: string
  slug: string
  title: string
  shortDescription: string
  mainImage?: SanityImage
  order: number
  category?: string
  clientName?: string
  techStack?: string[]
}

export interface ProjectDetail extends ProjectCard {
  fullDescription?: any[]
  galleryImages?: SanityImage[]
  projectURL?: string
  seoTitle?: string
  seoDescription?: string
}

