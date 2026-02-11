export interface ProjectMedia {
  id: string;
  slug: string;
  image: string;
  /** Hero section image (optional). Falls back to `image` if not set. */
  heroImage?: string;
}

export const projects: ProjectMedia[] = [
  {
    id: "1",
    slug: "luxury-garden-kusnacht",
    image: "/images/project-10.jpg",
    heroImage: "/images/project-5.jpg",
  },
  {
    id: "2",
    slug: "villa-terrace-thalwil",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80",
    heroImage: "/images/project-6.jpg",
  },
  {
    id: "3",
    slug: "residential-maintenance",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80",
    heroImage: "/images/project-7.jpg",
  },
  {
    id: "4",
    slug: "property-full-service",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    heroImage: "/images/project-8.jpg",
  },
  {
    id: "5",
    slug: "natural-stone-pathway",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    heroImage: "/images/project-9.jpg",
  },
  {
    id: "6",
    slug: "modern-landscape-design",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    heroImage: "/images/project-12.jpg",
  },
];
