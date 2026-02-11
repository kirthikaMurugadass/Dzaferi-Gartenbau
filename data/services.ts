export type ServiceIconName =
  | "Leaf"
  | "TreePine"
  | "Home"
  | "Building2"
  | "Snowflake"
  | "PencilRuler";

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  /** Detailed service explanation paragraphs (2 paragraphs) */
 
  icon: ServiceIconName;
  features: string[];
  image: string;
  /** Hero section image (optional). Falls back to `image` if not set. */
  heroImage?: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "home-maintenance",
    title: "Home maintenance",
    shortDescription: "Expert landscape design and construction using premium natural materials.",
    fullDescription: "We ensure regular maintenance and care of your property. Our home maintenance services include cleaning, high-pressure cleaning, comprehensive home service and reliable winter service.",
   
    icon: "Leaf",
    features: ["Natural stone work", "Retaining walls", "Seating areas", "Stone staircases", "Grading & excavation"],
    image: "/images/service-1.avif",
    heroImage: "/images/service-8.jpg",
  },
  {
    id: "2",
    slug: "garden-maintenance",
    title: "Garden Maintenance",
    shortDescription: "Year-round garden care from planting to pruning and professional felling.",
    fullDescription: "A well-kept garden is the figurehead of your home. We plant and care for trees, shrubs and plants. We also offer professional cutting, felling and removal of rootstocks.",
    
    icon: "TreePine",
    features: ["Tree & shrub care", "Planting", "Pruning", "Felling", "Root removal"],
    image: "/images/service-3.jpg",
    heroImage: "/images/service-10.jpg",
  },
  {
    id: "3",
    slug: "house-service",
    title: "House Service",
    shortDescription: "Complete residential care from cleaning to lawn mowing and minor repairs.",
    fullDescription: "For the care and maintenance of your residential complexes, we offer our comprehensive house service, which includes cleaning work, mowing the lawn, weeding, pruning plants, minor repairs and cleaning windows and doors.",
    
    icon: "Home",
    features: ["Cleaning", "Lawn mowing", "Weeding", "Plant trimming", "Minor repairs", "Window cleaning"],
    image: "/images/service-5.avif",
    heroImage: "/images/service-13.jpeg",
  },
  {
    id: "4",
    slug: "horiculture",
    title: "Horiculture",
    shortDescription: "Comprehensive ongoing maintenance and full-service caretaking.",
    fullDescription: "We design and build your dream garden: natural stones, stone walls, seating areas, stone stairs, levelling and dredging.",
   
    icon: "Building2",
    features: ["Regular maintenance", "Cleaning", "Pressure washing", "Full-service caretaking"],
    image: "/images/service-4.avif",
    heroImage: "/images/service-11.jpg",
  },
  {
    id: "5",
    slug: "winter-service",
    title: "Winter Service",
    shortDescription: "Snow removal, gritting, and pathway clearing for safe winter access.",
    fullDescription: "In the winter season, we offer you a professional snow removal and gritting service. Contact us for more information and to plan your winter service.",
   
    icon: "Snowflake",
    features: ["Snow removal", "Gritting & salting", "Pathway clearing", "Seasonal readiness"],
    image: "/images/service-6.avif",
    heroImage: "/images/service-12.jpeg",
  },
  
];
