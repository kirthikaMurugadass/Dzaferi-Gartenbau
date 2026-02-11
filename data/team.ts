export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  phone?: string;
  email?: string;
  image?: string;
}

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Ferit Dzaferi",
    role: "Founder & Managing Director",
    bio: "With over 15 years of experience in garden landscaping, Ferit brings passion and precision to every project.",
    phone: "079 402 56 21",
    image: "/images/about-3.jpeg",
  },
  {
    id: "2",
    name: "Jean Oertli",
    role: "Operations & Client Relations",
    bio: "Jean ensures every client receives personalized attention and that projects run smoothly from start to finish.",
    image: "/images/about-4.jpeg",
  },
];
