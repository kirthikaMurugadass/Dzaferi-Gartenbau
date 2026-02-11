export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientLocation: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Dzaferi Gartenbau transformed our garden into a true paradise. Professional, reliable, and creative.",
    clientName: "S. Anna",
    clientLocation: "Homeowner, Zurich",
    rating: 5,
  },
  {
    id: "2",
    quote: "The attention to detail and quality of work is exceptional. Our outdoor space has never looked better.",
    clientName: "M. Muller",
    clientLocation: "Villa Owner, Küsnacht",
    rating: 5,
  },
  {
    id: "3",
    quote: "Trustworthy and professional. They've been maintaining our property for years and we couldn't be happier.",
    clientName: "T. Markus",
    clientLocation: "Property Managers, Thalwil",
    rating: 5,
  },
];
