import { client } from './client';
import { writeClient } from './writeClient';
import type { ProjectCard, ProjectDetail } from '@/types/sanity/projects';
import type { ReferenceType } from '@/types/sanity/references';
import type { ServiceCardType, ServiceDetailType } from '@/types/sanity/services';

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && isActive == true && showOnHome == true] | order(order asc) {
  _id,
  name_en,
  name_de,
  role_en,
  role_de,
  message_en,
  message_de,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  rating,
  order
}`

export const STATS_QUERY = `*[_type == "stats" && isActive == true] | order(order asc) {
  _id,
  title_en,
  title_de,
  value,
  suffix,
  description_en,
  description_de,
  order
}`

export const FEATURE_CARDS_QUERY = `*[_type == "featureCard" && isActive == true] | order(order asc) {
  _id,
  title_en,
  title_de,
  description_en,
  description_de,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  link,
  order
}`

export const FOOTER_QUERY = `*[_type == "siteFooter"][0]{
  companyName_en,
  companyName_de,
  description_en,
  description_de,
  logo {
    asset->{
      _id,
      url
    },
    alt
  },
  address_en,
  address_de,
  phone,
  email,
  googleMapUrl,
  links[]{
    label_en,
    label_de,
    url
  },
  socialLinks[]{
    platform,
    url
  },
  copyright_en,
  copyright_de,
  privacyPolicyLabel_en,
  privacyPolicyLabel_de,
  privacyPolicyUrl
}`

export const HERO_QUERY = `*[_type == "heroSection"][0]{
  slides[]{
    title_en,
    title_de,
  
    subtitle_en,
    subtitle_de,
    button1_en,
    button1_de,
    button1_link,
    button2_en,
    button2_de,
    button2_link,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  },
  sliderImages[]{
    asset->{
      _id,
      url
    },
    alt
  }
}`

export async function getHeroSection(locale: 'en' | 'de' = 'en') {
  try {
    const data = await client.fetch(HERO_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data?.slides || data.slides.length === 0) {
      console.warn('No hero slides found in Sanity');
      return null;
    }

    const slide = data.slides[0];
    
    return {
      title: locale === 'en' ? slide.title_en : slide.title_de,
      titleAccent: locale === 'en' ? slide.titleAccent_en : slide.titleAccent_de,
      description: locale === 'en' ? slide.subtitle_en : slide.subtitle_de,
      primaryButtonText: locale === 'en' ? slide.button1_en : slide.button1_de,
      primaryButtonLink: slide.button1_link,
      secondaryButtonText: locale === 'en' ? slide.button2_en : slide.button2_de,
      secondaryButtonLink: slide.button2_link,
      heroImage: slide.image,
      sliderImages: data.sliderImages || []
    };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export async function getTestimonials(locale: 'en' | 'de' = 'en') {
  try {
    const data = await client.fetch(TESTIMONIALS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No testimonials found in Sanity');
      return null;
    }

    return data.map((testimonial: any) => ({
      id: testimonial._id,
      name: locale === 'en' ? testimonial.name_en : testimonial.name_de,
      role: locale === 'en' ? testimonial.role_en : testimonial.role_de,
      message: locale === 'en' ? testimonial.message_en : testimonial.message_de,
      image: testimonial.image,
      rating: testimonial.rating || 5,
      order: testimonial.order
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }
}

export async function getStats(locale: 'en' | 'de' = 'en') {
  try {
    const data = await client.fetch(STATS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No stats found in Sanity');
      return null;
    }

    return data.map((stat: any) => ({
      id: stat._id,
      title: locale === 'en' ? stat.title_en : stat.title_de,
      value: stat.value,
      suffix: stat.suffix,
      description: locale === 'en' ? stat.description_en : stat.description_de,
      order: stat.order
    }));
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

export async function getFeatureCards(locale: 'en' | 'de' = 'en') {
  try {
    const data = await client.fetch(FEATURE_CARDS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No feature cards found in Sanity');
      return null;
    }

    return data.map((card: any) => ({
      id: card._id,
      title: locale === 'en' ? card.title_en : card.title_de,
      description: locale === 'en' ? card.description_en : card.description_de,
      image: card.image,
      link: card.link,
      order: card.order
    }));
  } catch (error) {
    console.error('Error fetching feature cards:', error);
    return null;
  }
}

export async function getFooterData(locale: 'en' | 'de' = 'en') {
  try {
    const data = await client.fetch(FOOTER_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data) {
      console.warn('No footer data found in Sanity');
      return null;
    }

    return {
      companyName: locale === 'en' ? data.companyName_en : data.companyName_de,
      description: locale === 'en' ? data.description_en : data.description_de,
      logo: data.logo,
      address: locale === 'en' ? data.address_en : data.address_de,
      phone: data.phone,
      email: data.email,
      googleMapUrl: data.googleMapUrl,
      links: data.links?.map((link: any) => ({
        label: locale === 'en' ? link.label_en : link.label_de,
        url: link.url
      })) || [],
      socialLinks: data.socialLinks || [],
      copyright: locale === 'en' ? data.copyright_en : data.copyright_de,
      privacyPolicyLabel: locale === 'en' ? data.privacyPolicyLabel_en : data.privacyPolicyLabel_de,
      privacyPolicyUrl: data.privacyPolicyUrl
    };
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
}

// ------------------------------------
// Projects
// ------------------------------------

export const HOME_PROJECTS_QUERY = `*[_type == "project" && showOnHome == true] | order(order asc)[0...6]{
  _id,
  title_en,
  title_de,
  "slug": slug.current,
  shortDescription_en,
  shortDescription_de,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  category_en,
  category_de,
  clientName,
  techStack
}`;

export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  _id,
  title_en,
  title_de,
  "slug": slug.current,
  shortDescription_en,
  shortDescription_de,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  category_en,
  category_de,
  clientName,
  techStack
}`;

export const PROJECT_DETAIL_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title_en,
  title_de,
  "slug": slug.current,
  shortDescription_en,
  shortDescription_de,
  fullDescription_en,
  fullDescription_de,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  galleryImages[]{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  category_en,
  category_de,
  clientName,
  techStack,
  projectURL,
  seoTitle_en,
  seoTitle_de,
  seoDescription_en,
  seoDescription_de
}`;

export const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`;

export async function getHomeProjects(locale: 'en' | 'de' = 'en'): Promise<ProjectCard[] | null> {
  try {
    const data = await client.fetch(HOME_PROJECTS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No home projects found in Sanity');
      return null;
    }

    return data.map((project: any): ProjectCard => ({
      id: project._id,
      slug: project.slug,
      title: locale === 'en' ? project.title_en : project.title_de,
      shortDescription: locale === 'en' ? project.shortDescription_en : project.shortDescription_de,
      mainImage: project.mainImage,
      order: project.order,
      category: locale === 'en' ? project.category_en : project.category_de,
      clientName: project.clientName,
      techStack: project.techStack || []
    }));
  } catch (error) {
    console.error('Error fetching home projects:', error);
    return null;
  }
}

export async function getAllProjects(locale: 'en' | 'de' = 'en'): Promise<ProjectCard[] | null> {
  try {
    const data = await client.fetch(ALL_PROJECTS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No projects found in Sanity');
      return null;
    }

    return data.map((project: any): ProjectCard => ({
      id: project._id,
      slug: project.slug,
      title: locale === 'en' ? project.title_en : project.title_de,
      shortDescription: locale === 'en' ? project.shortDescription_en : project.shortDescription_de,
      mainImage: project.mainImage,
      order: project.order,
      category: locale === 'en' ? project.category_en : project.category_de,
      clientName: project.clientName,
      techStack: project.techStack || []
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export async function getProjectBySlug(slug: string, locale: 'en' | 'de' = 'en'): Promise<ProjectDetail | null> {
  try {
    const project = await client.fetch(PROJECT_DETAIL_QUERY, { slug }, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!project) {
      console.warn(`Project not found for slug: ${slug}`);
      return null;
    }

    const detail: ProjectDetail = {
      id: project._id,
      slug: project.slug,
      title: locale === 'en' ? project.title_en : project.title_de,
      shortDescription: locale === 'en' ? project.shortDescription_en : project.shortDescription_de,
      mainImage: project.mainImage,
      order: project.order,
      category: locale === 'en' ? project.category_en : project.category_de,
      clientName: project.clientName,
      techStack: project.techStack || [],
      fullDescription: locale === 'en' ? project.fullDescription_en : project.fullDescription_de,
      galleryImages: project.galleryImages || [],
      projectURL: project.projectURL,
      seoTitle: locale === 'en' ? project.seoTitle_en : project.seoTitle_de,
      seoDescription: locale === 'en' ? project.seoDescription_en : project.seoDescription_de,
    };

    return detail;
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error);
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const data = await client.fetch(PROJECT_SLUGS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      return [];
    }

    return data
      .map((item: any) => item.slug)
      .filter((slug: unknown): slug is string => typeof slug === 'string' && slug.length > 0);
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}

// ------------------------------------
// References
// ------------------------------------

export const REFERENCES_QUERY = `*[_type == "referenceEntry" && show == true] | order(order asc){
  _id,
  name,
  location_en,
  location_de,
  phone,
  order,
  show
}`;

export async function getReferences(locale: 'en' | 'de' = 'en'): Promise<ReferenceType[] | null> {
  try {
    const data = await client.fetch(REFERENCES_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No references found in Sanity');
      return null;
    }

    return data.map((ref: any): ReferenceType => ({
      id: ref._id,
      name: ref.name,
      location: locale === 'en' ? ref.location_en : ref.location_de,
      phone: ref.phone,
      order: ref.order,
    }));
  } catch (error) {
    console.error('Error fetching references:', error);
    return null;
  }
}

// ------------------------------------
// Services
// ------------------------------------

export const ALL_SERVICES_QUERY = `*[_type == "service" && isActive == true] | order(order asc){
  _id,
  title_en,
  title_de,
  description_en,
  description_de,
  "slug": slug.current,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  showOnHome
}`;

export const HOME_SERVICES_QUERY = `*[_type == "service" && isActive == true && showOnHome == true] | order(order asc){
  _id,
  title_en,
  title_de,
  description_en,
  description_de,
  "slug": slug.current,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  order
}`;

export const SERVICE_DETAIL_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title_en,
  title_de,
  description_en,
  description_de,
  details_en,
  details_de,
  "slug": slug.current,
  image{
    asset->{
      _id,
      url
    },
    alt
  },
  heroImage{
    asset->{
      _id,
      url
    },
    alt
  },
  order
}`;

export const SERVICE_SLUGS_QUERY = `*[_type == "service" && defined(slug.current) && isActive == true]{
  "slug": slug.current
}`;

export async function getAllServices(locale: 'en' | 'de' = 'en'): Promise<ServiceCardType[] | null> {
  try {
    const data = await client.fetch(ALL_SERVICES_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No services found in Sanity');
      return null;
    }

    return data.map((service: any): ServiceCardType => ({
      id: service._id,
      slug: service.slug,
      title: locale === 'en' ? service.title_en : service.title_de,
      description: locale === 'en' ? service.description_en : service.description_de,
      image: service.image,
      order: service.order,
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}

export async function getServiceBySlug(slug: string, locale: 'en' | 'de' = 'en'): Promise<ServiceDetailType | null> {
  try {
    const service = await client.fetch(SERVICE_DETAIL_QUERY, { slug }, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!service) {
      console.warn(`Service not found for slug: ${slug}`);
      return null;
    }

    const detail: ServiceDetailType = {
      id: service._id,
      slug: service.slug,
      title: locale === 'en' ? service.title_en : service.title_de,
      description: locale === 'en' ? service.description_en : service.description_de,
      details: locale === 'en' ? service.details_en : service.details_de,
      image: service.image,
      heroImage: service.heroImage,
      order: service.order,
    };

    return detail;
  } catch (error) {
    console.error(`Error fetching service with slug "${slug}":`, error);
    return null;
  }
}

export async function getHomeServices(locale: 'en' | 'de' = 'en'): Promise<ServiceCardType[] | null> {
  try {
    const data = await client.fetch(HOME_SERVICES_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      console.warn('No home services found in Sanity');
      return null;
    }

    return data.map((service: any): ServiceCardType => ({
      id: service._id,
      slug: service.slug,
      title: locale === 'en' ? service.title_en : service.title_de,
      description: locale === 'en' ? service.description_en : service.description_de,
      image: service.image,
      order: service.order,
    }));
  } catch (error) {
    console.error('Error fetching home services:', error);
    return null;
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const data = await client.fetch(SERVICE_SLUGS_QUERY, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!data || data.length === 0) {
      return [];
    }

    return data
      .map((item: any) => item.slug)
      .filter((slug: unknown): slug is string => typeof slug === 'string' && slug.length > 0);
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}

// ------------------------------------
// Contact Page
// ------------------------------------

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  headerSection{
    title{
      en,
      de
    },
    description{
      en,
      de
    }
  },
  contactDetails{
    phone,
    email
  },
  addressSection{
    address{
      en,
      de
    },
    googleMapEmbedUrl
  },
  businessHours[]{
    day,
    time
  },
  ctaSection{
    ctaText{
      en,
      de
    }
  }
}`;

export interface ContactPageData {
  headerSection: {
    title: { en: string; de: string };
    description: { en: string; de: string };
  };
  contactDetails: {
    phone: string;
    email: string;
  };
  addressSection: {
    address: { en: string; de: string };
    googleMapEmbedUrl: string;
  };
  businessHours: Array<{
    day: string;
    time: string;
  }>;
  ctaSection: {
    ctaText: { en: string; de: string };
  };
}

export async function getContactPage(locale: 'en' | 'de' = 'en'): Promise<ContactPageData | null> {
  try {
    // Use writeClient with token so we can see both drafts and published content
    // This function is only used on the server (in page components), so the token
    // is never exposed to the browser.
    const data = await writeClient.fetch(CONTACT_PAGE_QUERY, {}, {
      cache: 'no-store',
    });

    if (!data) {
      console.warn('No contact page data found in Sanity');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return null;
  }
}

