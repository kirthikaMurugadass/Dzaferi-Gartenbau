# Dzaferi-Gartenbau Website

Premium garden landscaping company website built according to the DOCUMENTATION.md specification.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Hook Form + Zod** (contact form)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
dzaferi-gartenbau/
├── app/                    # Pages (App Router)
│   ├── page.tsx            # Home
│   ├── services/
│   ├── projects/
│   ├── about/
│   ├── contact/
│   └── api/contact/        # Contact form API
├── components/
│   ├── layout/             # Navbar, Footer, SectionWrapper
│   ├── sections/           # Hero, TrustBar, ServicesOverview, etc.
│   ├── shared/             # SectionHeader, ServiceCard, ProjectCard
│   └── ui/                 # Button
├── data/                   # Static content
├── lib/                    # Utils, constants, validations
└── hooks/                  # useScrollPosition, useCounterAnimation
```

## Design System

- **Colors**: Primary (forest green), Earth (warm stone), Accent (gold)
- **Fonts**: Plus Jakarta Sans (headings), Inter (body), Playfair Display (accent)
- **Animations**: Scroll-triggered fade-up, counter animations, hover effects

## Next Steps

1. Replace placeholder images in `/public/images/` with real photography
2. Add Resend or Nodemailer to send contact form emails
3. Configure Google Maps embed with your exact location
4. Add Impressum and Privacy Policy content (Swiss legal requirements)
5. Add analytics (Vercel Analytics or Plausible)
