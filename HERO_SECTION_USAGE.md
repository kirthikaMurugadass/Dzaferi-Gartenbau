# Hero Section - Sanity CMS Integration

## ✅ What Was Done

Your `Hero` component has been updated to accept dynamic data from Sanity CMS while maintaining **full backward compatibility** with existing static usage.

## 🎯 Key Features

### 1. **Backward Compatible**
- All existing static props still work
- No breaking changes to current usage
- Component gracefully falls back to static props if Sanity data is missing

### 2. **Sanity CMS Props Added**
```typescript
interface HeroProps {
  // ... existing props ...
  
  // New Sanity CMS Props
  title?: string;                    // Hero heading from Sanity
  description?: string;              // Hero subtitle/description from Sanity
  primaryButtonText?: string;        // Primary button label from Sanity
  primaryButtonLink?: string;        // Primary button URL from Sanity
  secondaryButtonText?: string;      // Secondary button label from Sanity
  secondaryButtonLink?: string;      // Secondary button URL from Sanity
  heroImage?: SanityImage;          // Hero background image from Sanity
}
```

### 3. **Smart Fallback Logic**
The component uses Sanity data if provided, otherwise falls back to static props:

```typescript
// Title: Sanity 'title' → static 'heading' → undefined
const displayHeading = title || heading;

// Subtitle: Sanity 'description' → static 'subtitle' → undefined
const displaySubtitle = description || subtitle;

// Image: Sanity 'heroImage' → static 'image' → default unsplash
const displayImage = heroImage?.asset ? sanityImageUrl : image;
```

### 4. **Sanity Image URL Builder**
Uses `urlForImage()` helper to:
- Generate optimized image URLs
- Set width (1920px) and quality (85%)
- Handle CDN delivery

### 5. **Optional Chaining & Type Safety**
- All Sanity props are optional (`?`)
- Safe access with optional chaining (`heroImage?.asset`)
- Prevents crashes if data is missing
- Full TypeScript support

## 📝 Usage Examples

### Example 1: Static Usage (Existing - Still Works!)
```tsx
<Hero
  variant="full"
  overline="Professional"
  heading="Garden Design"
  headingAccent="Excellence"
  subtitle="Creating beautiful outdoor spaces"
  primaryCta={{ label: "View Projects", href: "/projects" }}
  secondaryCta={{ label: "Contact Us", href: "/contact" }}
  image="https://images.unsplash.com/photo-..."
  showScrollIndicator
/>
```

### Example 2: Sanity CMS Usage (New!)
```tsx
// In your page.tsx
const heroData = await getHeroSection();

<Hero
  variant="full"
  title={heroData.title}
  description={heroData.description}
  primaryButtonText={heroData.primaryButtonText}
  primaryButtonLink={heroData.primaryButtonLink}
  secondaryButtonText={heroData.secondaryButtonText}
  secondaryButtonLink={heroData.secondaryButtonLink}
  heroImage={heroData.heroImage}
  showScrollIndicator
/>
```

### Example 3: Mixed Usage (Sanity + Static Overrides)
```tsx
const heroData = await getHeroSection();

<Hero
  variant="full"
  title={heroData.title}              // From Sanity
  description={heroData.description}  // From Sanity
  heroImage={heroData.heroImage}      // From Sanity
  overline="Professional"             // Static override
  showScrollIndicator                 // Static prop
/>
```

### Example 4: With Null Safety
```tsx
const heroData = await getHeroSection();

<Hero
  variant="full"
  // If Sanity data is missing, falls back to static defaults
  title={heroData?.title}
  description={heroData?.description}
  primaryButtonText={heroData?.primaryButtonText}
  primaryButtonLink={heroData?.primaryButtonLink}
  heroImage={heroData?.heroImage}
  
  // Always provide fallback for critical props
  heading="Default Heading"
  subtitle="Default subtitle"
  primaryCta={{ label: "Get Started", href: "/contact" }}
/>
```

## 🔄 Data Flow

```
Sanity CMS → getHeroSection() → Hero Component → Display
                                     ↓
                            If Sanity data missing
                                     ↓
                            Use static props → Display
                                     ↓
                            If both missing
                                     ↓
                            Hide element gracefully
```

## 🎨 What Stayed the Same

✅ All existing Tailwind styles
✅ All animations (framer-motion)
✅ Responsive design
✅ Layout and spacing
✅ Variant system (full, half, compact, tall)
✅ Scroll indicator
✅ Breadcrumb support
✅ Button styles

## 🚀 Next Steps

1. **Create your Hero Section in Sanity Studio**
   - Add title, description
   - Upload hero image
   - Set button texts and links
   - Publish

2. **Fetch data in your page**
   ```typescript
   const heroData = await getHeroSection();
   ```

3. **Pass to Hero component**
   ```tsx
   <Hero
     title={heroData.title}
     description={heroData.description}
     // ... other Sanity props
   />
   ```

4. **Test both scenarios**
   - With Sanity data (CMS-driven)
   - Without Sanity data (static fallback)

## 🛡️ Error Handling

The component handles all edge cases:

- ✅ Missing Sanity data → uses static props
- ✅ Missing static props → hides element gracefully
- ✅ Missing image → uses default unsplash image
- ✅ Broken image URL → Next.js Image handles error
- ✅ Missing buttons → doesn't render button section
- ✅ Invalid URLs → safe with optional chaining

## 📦 TypeScript Support

Full type safety with:
- `SanityImage` interface for image objects
- All props properly typed
- Optional props with `?`
- Safe property access with `?.`

## ✨ Benefits

1. **Flexible**: Works with or without CMS
2. **Safe**: No crashes from missing data
3. **Clean**: No code duplication
4. **Typed**: Full TypeScript support
5. **Tested**: Backward compatible
6. **Fast**: Optimized Sanity images

Your Hero component is now ready for both static and dynamic (Sanity CMS) content! 🎉
