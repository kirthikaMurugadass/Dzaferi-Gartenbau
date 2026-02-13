import { client } from './client';
import { writeClient } from './writeClient';
import type { ProjectCard, ProjectDetail } from '@/types/sanity/projects';
import type { ReferenceType } from '@/types/sanity/references';
import type { ServiceCardType, ServiceDetailType } from '@/types/sanity/services';

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && isActive == true && showOnHome == true] | order(order asc) {
  _id,
  name,
  role,
  message,
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
  title,
  value,
  suffix,
  description,
  order
}`

export const FEATURE_CARDS_QUERY = `*[_type == "featureCard" && isActive == true] | order(order asc) {
  _id,
  title,
  description,
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
  companyName,
  description,
  logo {
    asset->{
      _id,
      url
    },
    alt
  },
  address,
  phone,
  email,
  googleMapUrl,
  links[]{
    label,
    url
  },
  socialLinks[]{
    platform,
    url
  },
  copyright,
  privacyPolicyLabel,
  privacyPolicyUrl
}`

export const HERO_QUERY = `*[_type == "heroSection"][0]{
  slides[]{
    title,
    subtitle,
    button1,
    button1_link,
    button2,
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

export async function getHeroSection() {
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
      title: slide.title,
      titleAccent: slide.titleAccent,
      description: slide.subtitle,
      primaryButtonText: slide.button1,
      primaryButtonLink: slide.button1_link,
      secondaryButtonText: slide.button2,
      secondaryButtonLink: slide.button2_link,
      heroImage: slide.image,
      sliderImages: data.sliderImages || []
    };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export async function getTestimonials() {
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
      name: testimonial.name,
      role: testimonial.role,
      message: testimonial.message,
      image: testimonial.image,
      rating: testimonial.rating || 5,
      order: testimonial.order
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }
}

export async function getStats() {
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
      title: stat.title,
      value: stat.value,
      suffix: stat.suffix,
      description: stat.description,
      order: stat.order
    }));
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

export async function getFeatureCards() {
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
      title: card.title,
      description: card.description,
      image: card.image,
      link: card.link,
      order: card.order
    }));
  } catch (error) {
    console.error('Error fetching feature cards:', error);
    return null;
  }
}

export async function getFooterData() {
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
      companyName: data.companyName,
      description: data.description,
      logo: data.logo,
      address: data.address,
      phone: data.phone,
      email: data.email,
      googleMapUrl: data.googleMapUrl,
      links: data.links?.map((link: any) => ({
        label: link.label,
        url: link.url
      })) || [],
      socialLinks: data.socialLinks || [],
      copyright: data.copyright,
      privacyPolicyLabel: data.privacyPolicyLabel,
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
  title,
  "slug": slug.current,
  shortDescription,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  category,
  clientName,
  techStack
}`;

export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  category,
  clientName,
  techStack
}`;

export const PROJECT_DETAIL_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
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
  category,
  clientName,
  techStack,
  projectURL,
  seoTitle,
  seoDescription
}`;

export const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`;

export async function getHomeProjects(): Promise<ProjectCard[] | null> {
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
      title: project.title,
      shortDescription: project.shortDescription,
      mainImage: project.mainImage,
      order: project.order,
      category: project.category,
      clientName: project.clientName,
      techStack: project.techStack || []
    }));
  } catch (error) {
    console.error('Error fetching home projects:', error);
    return null;
  }
}

export async function getAllProjects(): Promise<ProjectCard[] | null> {
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
      title: project.title,
      shortDescription: project.shortDescription,
      mainImage: project.mainImage,
      order: project.order,
      category: project.category,
      clientName: project.clientName,
      techStack: project.techStack || []
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
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
      title: project.title,
      shortDescription: project.shortDescription,
      mainImage: project.mainImage,
      order: project.order,
      category: project.category,
      clientName: project.clientName,
      techStack: project.techStack || [],
      fullDescription: project.fullDescription,
      galleryImages: project.galleryImages || [],
      projectURL: project.projectURL,
      seoTitle: project.seoTitle,
      seoDescription: project.seoDescription,
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
  location,
  phone,
  order,
  show
}`;

export async function getReferences(): Promise<ReferenceType[] | null> {
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
      location: ref.location,
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
  title,
  description,
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
  title,
  description,
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
  title,
  description,
  details,
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

export async function getAllServices(): Promise<ServiceCardType[] | null> {
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
      title: service.title,
      description: service.description,
      image: service.image,
      order: service.order,
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetailType | null> {
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
      title: service.title,
      description: service.description,
      details: service.details,
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

export async function getHomeServices(): Promise<ServiceCardType[] | null> {
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
      title: service.title,
      description: service.description,
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
    title,
    description
  },
  contactDetails{
    phone,
    email
  },
  addressSection{
    address,
    googleMapEmbedUrl
  },
  businessHours[]{
    day,
    time
  },
  ctaSection{
    ctaText
  }
}`;

export interface ContactPageData {
  headerSection: {
    title: string;
    description: string;
  };
  contactDetails: {
    phone: string;
    email: string;
  };
  addressSection: {
    address: string;
    googleMapEmbedUrl: string;
  };
  businessHours: Array<{
    day: string;
    time: string;
  }>;
  ctaSection: {
    ctaText: string;
  };
}

export async function getContactPage(): Promise<ContactPageData | null> {
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
