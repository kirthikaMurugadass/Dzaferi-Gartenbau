type LocaleId = 'en' | 'de'

/**
 * Sanity Image Asset
 */
export interface SanityImage {
  url: string
  alt?: string
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
 * Button
 */
export interface Button {
  label?: string
  link?: string
}

/**
 * Hero Slide (with 2 buttons)
 */
export interface HeroSlideModular {
  backgroundImage?: SanityImage
  title?: string
  subtitle?: string
  description?: string
  primaryButton?: Button
  secondaryButton?: Button
}

/**
 * Hero Section
 */
export interface HeroSection {
  _id: string
  slides?: HeroSlideModular[]
}

/**
 * Feature Card
 */
export interface FeatureModular {
  icon?: SanityImage
  title?: string
  description?: string
  link?: string
}

/**
 * Features Section
 */
export interface FeaturesSection {
  _id: string
  sectionTitle?: string
  sectionSubtitle?: string
  features?: FeatureModular[]
}

/**
 * Stat Item
 */
export interface StatModular {
  icon?: SanityImage
  value?: string
  suffix?: string
  label?: string
}

/**
 * Stats Section
 */
export interface StatsSection {
  _id: string
  sectionTitle?: string
  stats?: StatModular[]
}

/**
 * Service Preview
 */
export interface ServicePreview {
  _id: string
  title?: string
  excerpt?: string
  slug?: string
  image?: SanityImage
  icon?: SanityImage
  order?: number
  featured?: boolean
}

/**
 * Services Preview Section
 */
export interface ServicesPreviewSection {
  enabled?: boolean
  sectionTitle?: string
  sectionSubtitle?: string
}

/**
 * Project Preview
 */
export interface ProjectPreview {
  _id: string
  title?: string
  excerpt?: string
  slug?: string
  mainImage?: SanityImage
  client?: string
  location?: string
  completionDate?: string
  order?: number
  featured?: boolean
}

/**
 * Projects Preview Section
 */
export interface ProjectsPreviewSection {
  enabled?: boolean
  sectionTitle?: string
  sectionSubtitle?: string
}

/**
 * Testimonial
 */
export interface TestimonialModular {
  name?: string
  role?: string
  image?: SanityImage
  reviewText?: string
  rating?: number
}

/**
 * Testimonials Section
 */
export interface TestimonialsSection {
  _id: string
  sectionTitle?: string
  sectionSubtitle?: string
  testimonials?: TestimonialModular[]
}

/**
 * Complete Modular Home Page Data Structure
 */
export interface HomePageModularData {
  _id: string
  _type: 'homePageModular'
  
  // Sections
  heroSection?: HeroSection
  featuresSection?: FeaturesSection
  statsSection?: StatsSection
  servicesPreview?: ServicesPreviewSection
  services?: ServicePreview[]
  projectsPreview?: ProjectsPreviewSection
  projects?: ProjectPreview[]
  testimonialsSection?: TestimonialsSection
  
  // SEO
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

/**
 * Props for page components
 */
export interface HomePageModularProps {
  params: Promise<{ locale: LocaleId }>
}

/**
 * Type guard to check if data is valid
 */
export function isValidHomePageModularData(data: any): data is HomePageModularData {
  return (
    data &&
    typeof data === 'object' &&
    data._type === 'homePageModular'
  )
}
