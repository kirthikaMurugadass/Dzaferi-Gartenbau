/**
 * Sanity Image Asset
 */
export interface SanityImage {
  url: string
  alt: string
  lqip?: string
  dimensions?: {
    width: number
    height: number
    aspectRatio: number
  }
  asset?: {
    _id: string
    _type: 'sanity.imageAsset'
  }
}

/**
 * Hero Slide
 */
export interface HeroSlide {
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
  backgroundImage: SanityImage
}

/**
 * Feature Card
 */
export interface Feature {
  title: string
  description: string
  icon: SanityImage
}

/**
 * Stats Item
 */
export interface Stat {
  value: string
  label: string
  suffix?: string
}

/**
 * Testimonial
 */
export interface Testimonial {
  name: string
  role: string
  message: string
  rating: number
  avatar?: SanityImage
}

/**
 * Complete Home Page Data Structure
 */
export interface HomePageData {
  _id: string
  _type: 'home'
  
  // Hero Section
  heroSlides?: HeroSlide[]
  
  // Features Section
  featuresTitle?: string
  featuresSubtitle?: string
  features?: Feature[]
  
  // Stats Section
  statsTitle?: string
  stats?: Stat[]
  
  // Testimonials Section
  testimonialsTitle?: string
  testimonials?: Testimonial[]
  
  // SEO
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

/**
 * Type guard to check if data is valid
 */
export function isValidHomePageData(data: any): data is HomePageData {
  return (
    data &&
    typeof data === 'object' &&
    data._type === 'home'
  )
}
