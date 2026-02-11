# 🏗️ Modular Home Page Architecture - Complete Guide

## 🎯 What Was Implemented

A **professional, modular, and scalable** Sanity CMS architecture for your Home Page with:

✅ **Fully Modular Structure** - Each section is independent  
✅ **Multilingual Support** - English & German  
✅ **Easy Management** - Edit sections separately  
✅ **Auto-fetching** - Services & Projects with `showOnHomePage` toggle  
✅ **Clean Publishing** - No more blocking validation issues  
✅ **Type-Safe** - Full TypeScript coverage  
✅ **SEO Optimized** - Proper meta tags per locale  

---

## 📁 New File Structure

```
sanity/schemaTypes/
├── sections/                          ⭐ NEW
│   ├── heroSection.ts                 ⭐ Hero with slides + 2 buttons
│   ├── featuresSection.ts             ⭐ Feature cards
│   ├── statsSection.ts                ⭐ Stats with icons
│   └── testimonialsSection.ts         ⭐ Testimonials
│
├── homePageModular.ts                 ⭐ NEW - Main home page (references sections)
├── serviceType.ts                     ⭐ NEW - Services with showOnHomePage
├── projectType.ts                     ⭐ NEW - Projects with showOnHomePage
└── index.ts                           ✏️ UPDATED

sanity/lib/queries/
└── homeModularQueries.ts              ⭐ NEW - GROQ queries

types/sanity/
└── homeModular.ts                     ⭐ NEW - TypeScript types
```

---

## 🎨 Schema Architecture

### 1️⃣ **Hero Section** (`heroSection`)

**Independent document** with:
- **Slides Array** (up to 5 slides)
  - Background Image
  - Title (en/de)
  - Subtitle (en/de)
  - Description (en/de)
  - **Primary Button** (label + link)
  - **Secondary Button** (label + link)

**How to use:**
1. Create a "Hero Section" document
2. Add slides with content
3. Publish
4. Reference it in "Home Page (Modular)"

---

### 2️⃣ **Features Section** (`featuresSection`)

**Independent document** with:
- Section Title (en/de)
- Section Subtitle (en/de)
- **Features Array** (up to 6 features)
  - Icon Image
  - Title (en/de)
  - Description (en/de)
  - Optional Link

**How to use:**
1. Create a "Features Section" document
2. Add feature cards
3. Publish
4. Reference it in "Home Page (Modular)"

---

### 3️⃣ **Stats Section** (`statsSection`)

**Independent document** with:
- Section Title (en/de)
- **Stats Array** (up to 4 stats)
  - Icon Image
  - Number/Value (e.g., "500", "95")
  - Suffix (e.g., "+", "%")
  - Label (en/de)

**How to use:**
1. Create a "Stats Section" document
2. Add stat cards
3. Publish
4. Reference it in "Home Page (Modular)"

---

### 4️⃣ **Services Preview Section**

**Built into Home Page** with:
- Enable/Disable Toggle
- Section Title (en/de)
- Section Subtitle (en/de)
- **Auto-fetches services** where `showOnHomePage == true`

**How to use:**
1. Go to any Service document
2. Enable "Show on Home Page" toggle
3. Set display order (lower = first)
4. Publish
5. Service automatically appears on home page!

---

### 5️⃣ **Projects Preview Section**

**Built into Home Page** with:
- Enable/Disable Toggle
- Section Title (en/de)
- Section Subtitle (en/de)
- **Auto-fetches projects** where `showOnHomePage == true`

**How to use:**
1. Go to any Project document
2. Enable "Show on Home Page" toggle
3. Set display order (lower = first)
4. Publish
5. Project automatically appears on home page!

---

### 6️⃣ **Testimonials Section** (`testimonialsSection`)

**Independent document** with:
- Section Title (en/de)
- Section Subtitle (en/de)
- **Testimonials Array** (up to 10 testimonials)
  - Name
  - Role
  - Avatar Image
  - Review Text (en/de)
  - Rating (1-5 stars)

**How to use:**
1. Create a "Testimonials Section" document
2. Add testimonials
3. Publish
4. Reference it in "Home Page (Modular)"

---

### 7️⃣ **SEO Section**

**Built into Home Page** with:
- Meta Title (en/de)
- Meta Description (en/de)
- Open Graph Image

---

## 🚀 Setup Instructions

### Step 1: Deploy Schema

```bash
cd dzaferi-gartenbau
npx sanity@latest schema deploy
```

### Step 2: Refresh Studio

- Close and reopen Studio tab
- Or hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Step 3: Create Content

#### A. Create Sections First

1. **Create Hero Section:**
   - Go to Studio
   - Click "Create" → "Hero Section"
   - Add 1-3 slides with images, text, and buttons
   - Publish

2. **Create Features Section:**
   - Click "Create" → "Features Section"
   - Add 3-6 feature cards
   - Publish

3. **Create Stats Section:**
   - Click "Create" → "Stats Section"
   - Add 3-4 stats
   - Publish

4. **Create Testimonials Section:**
   - Click "Create" → "Testimonials Section"
   - Add 3-10 testimonials
   - Publish

#### B. Create Services & Projects

1. **Create Services:**
   - Click "Create" → "Service"
   - Fill in content
   - Go to "Settings" tab
   - Enable "Show on Home Page"
   - Set order (e.g., 1, 2, 3)
   - Publish
   - Repeat for more services

2. **Create Projects:**
   - Click "Create" → "Project"
   - Fill in content
   - Go to "Settings" tab
   - Enable "Show on Home Page"
   - Set order (e.g., 1, 2, 3)
   - Publish
   - Repeat for more projects

#### C. Create Home Page

1. **Create Home Page (Modular):**
   - Click "Create" → "Home Page (Modular)"
   - **Page Sections Tab:**
     - Select your Hero Section
     - Select your Features Section
     - Select your Stats Section
     - Configure Services Preview (title, subtitle)
     - Configure Projects Preview (title, subtitle)
     - Select your Testimonials Section
   - **SEO Tab:**
     - Add meta title (en/de)
     - Add meta description (en/de)
     - Upload OG image
   - Publish

---

## 🎯 How It Works

### Data Flow

```
1. User visits /en or /de
        ↓
2. Next.js fetches modular home page
        ↓
3. GROQ query resolves references:
   - Fetches Hero Section
   - Fetches Features Section
   - Fetches Stats Section
   - Fetches Services (where showOnHomePage == true)
   - Fetches Projects (where showOnHomePage == true)
   - Fetches Testimonials Section
        ↓
4. All content localized to requested language
        ↓
5. Rendered on frontend
```

### GROQ Query Structure

```groq
*[_type == "homePageModular"][0] {
  // Hero Section (reference resolved)
  "heroSection": heroSection-> {
    "slides": slides[] {
      "title": coalesce(title.de, title.en),
      ...
    }
  },
  
  // Auto-fetch services
  "services": *[_type == "service" && showOnHomePage == true] | order(order asc) {
    ...
  },
  
  // Auto-fetch projects
  "projects": *[_type == "project" && showOnHomePage == true] | order(order asc) {
    ...
  }
}
```

---

## 💡 Key Benefits

### 1. **Independent Publishing**

✅ Edit hero section alone → Publish  
✅ Edit features alone → Publish  
✅ Edit stats alone → Publish  
✅ No more "can't publish because X is empty" errors!

### 2. **Easy Service/Project Management**

✅ Toggle "Show on Home Page" on any service  
✅ Automatically appears on home page  
✅ Control order with `order` field  
✅ No manual references needed!

### 3. **Clean Studio UI**

✅ Each section has its own document  
✅ Clear organization  
✅ Easy to find and edit  
✅ Preview shows content summary

### 4. **Scalability**

✅ Add more sections easily  
✅ Reuse sections across pages  
✅ Create section templates  
✅ Version control per section

---

## 🔧 Frontend Integration

### Fetch Modular Home Page

```typescript
import { fetchModularHomePage } from '@/sanity/lib/fetch'
import { LocaleId } from '@/sanity/schemaTypes/fields/multilingualField'

const homeData = await fetchModularHomePage(locale as LocaleId)
```

### Access Sections

```typescript
// Hero
const heroSlides = homeData?.heroSection?.slides

// Features
const features = homeData?.featuresSection?.features

// Stats
const stats = homeData?.statsSection?.stats

// Services (auto-fetched)
const services = homeData?.services

// Projects (auto-fetched)
const projects = homeData?.projects

// Testimonials
const testimonials = homeData?.testimonialsSection?.testimonials
```

### TypeScript Types

```typescript
import type {
  HomePageModularData,
  HeroSlideModular,
  FeatureModular,
  StatModular,
  ServicePreview,
  ProjectPreview,
  TestimonialModular
} from '@/types/sanity/homeModular'
```

---

## 📊 Comparison: Old vs New

| Feature | Old Structure | New Modular Structure |
|---------|--------------|----------------------|
| **Sections** | All in one document | Separate documents |
| **Publishing** | Must fill everything | Publish sections independently |
| **Services** | Manual array | Auto-fetch with toggle |
| **Projects** | Manual array | Auto-fetch with toggle |
| **Editing** | Scroll through one huge form | Edit focused sections |
| **Reusability** | None | Reuse sections across pages |
| **Validation** | Blocks publishing | Flexible, optional fields |
| **Organization** | Messy | Clean, professional |

---

## 🎨 Studio UI Preview

### Before (Old):
```
Home Page
├── Hero Section (all fields)
├── Features Section (all fields)
├── Stats Section (all fields)
├── Testimonials Section (all fields)
└── SEO (all fields)
❌ Can't publish if any section incomplete
❌ Hard to manage
❌ Long scrolling
```

### After (New):
```
Home Page (Modular)
├── [Reference] → Hero Section
├── [Reference] → Features Section
├── [Reference] → Stats Section
├── Services Preview (auto-fetch)
├── Projects Preview (auto-fetch)
├── [Reference] → Testimonials Section
└── SEO

Hero Section (separate)
Features Section (separate)
Stats Section (separate)
Testimonials Section (separate)

Service 1 → [✓] Show on Home Page
Service 2 → [✓] Show on Home Page
Project 1 → [✓] Show on Home Page
```

✅ Clean organization  
✅ Independent publishing  
✅ Easy management  

---

## 🚨 Migration from Old to New

### Option 1: Fresh Start (Recommended)

1. Deploy new schema
2. Create new content in modular structure
3. Delete old "Home Page" document
4. Update frontend to use `fetchModularHomePage`

### Option 2: Keep Both (Testing)

1. Deploy new schema (both old and new exist)
2. Create new modular content
3. Test on `/en` and `/de`
4. When satisfied, delete old structure

---

## 🎯 Next Steps

1. ✅ Deploy schema: `npx sanity@latest schema deploy`
2. ✅ Create section documents (Hero, Features, Stats, Testimonials)
3. ✅ Create services with "Show on Home Page" enabled
4. ✅ Create projects with "Show on Home Page" enabled
5. ✅ Create "Home Page (Modular)" and reference sections
6. ✅ Update frontend to use `fetchModularHomePage`
7. ✅ Test on `/en` and `/de`
8. ✅ Deploy to production

---

## 📚 Additional Resources

- **Schema Files:** `sanity/schemaTypes/sections/`
- **Queries:** `sanity/lib/queries/homeModularQueries.ts`
- **Types:** `types/sanity/homeModular.ts`
- **Fetch Helper:** `sanity/lib/fetch.ts`

---

## 🎉 Success!

You now have a **professional, modular, scalable** home page architecture that:

✅ Is easy to manage  
✅ Fully multilingual  
✅ Auto-fetches content  
✅ Clean publishing flow  
✅ Type-safe  
✅ Production-ready  

**Enjoy your new modular CMS! 🚀**
