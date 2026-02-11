# Hero Section - Title Accent Field Added ✅

## ✅ What Was Added

A new field in Sanity to control the **italic/accent word** in the hero title (the "Inspire" part).

## 🎯 Changes Made

### 1. **Sanity Schema** (`sanity/schemaTypes/heroSection.ts`)

Added two new fields for bilingual support:

```typescript
{ 
  name: 'titleAccent_en', 
  title: 'Title Accent/Italic Word (English)', 
  type: 'string', 
  description: 'The italic/styled word after the main title (e.g., "Inspire")' 
},
{ 
  name: 'titleAccent_de', 
  title: 'Title Accent/Italic Word (German)', 
  type: 'string', 
  description: 'The italic/styled word after the main title' 
}
```

### 2. **GROQ Query** (`sanity/lib/queries.ts`)

Updated to fetch the accent fields:

```typescript
export const HERO_QUERY = `*[_type == "heroSection"][0]{
  slides[]{
    title_en,
    title_de,
    titleAccent_en,    // ← Added
    titleAccent_de,    // ← Added
    // ... other fields
  }
}`
```

Updated return data:

```typescript
return {
  title: locale === 'en' ? slide.title_en : slide.title_de,
  titleAccent: locale === 'en' ? slide.titleAccent_en : slide.titleAccent_de, // ← Added
  // ... other fields
};
```

### 3. **Page Component** (`app/[locale]/page.tsx`)

Now uses dynamic accent from Sanity:

```typescript
<HeroSlider
  heading={heroData?.title || "We Create Gardens That"}
  headingAccent={heroData?.titleAccent || "Inspire"} // ← Now dynamic
  // ... other props
/>
```

## 📝 How to Use

### In Sanity Studio:

1. Go to **Hero Section** document
2. Open your slide
3. You'll now see two new fields:
   - **Title Accent/Italic Word (English)**: e.g., "Inspire"
   - **Title Accent/Italic Word (German)**: e.g., "Inspirieren"
4. Fill them in
5. **Publish**

### Example Data:

**English:**
- Title: "We Create Gardens That"
- Title Accent: "Inspire"
- Result: "We Create Gardens That *Inspire*"

**German:**
- Title: "Wir Schaffen Gärten Die"
- Title Accent: "Inspirieren"  
- Result: "Wir Schaffen Gärten Die *Inspirieren*"

## 🎨 How It Displays

The accent word will be styled with:
- Italic font
- Different font family (`var(--font-accent)`)
- Appears right after the main title

Example rendering:
```
We Create Gardens That Inspire
                       ^^^^^^^
                       (italic/styled)
```

## 🔄 Fallback Behavior

If you don't fill in the accent fields:
- **English**: Falls back to "Inspire"
- **German**: Falls back to "Inspire"

Your site will always show something, even if Sanity fields are empty.

## ✨ Features

- ✅ **Bilingual**: Separate fields for EN & DE
- ✅ **Optional**: Falls back to default if empty
- ✅ **Styled**: Automatically renders with italic font
- ✅ **Dynamic**: Can be changed via Sanity CMS
- ✅ **Type-safe**: Fully integrated with existing code

## 📊 Data Flow

```
Sanity Studio → Edit titleAccent_en/de
       ↓
    Publish
       ↓
GROQ Query → Fetch titleAccent
       ↓
getHeroSection() → Return titleAccent based on locale
       ↓
page.tsx → Pass to HeroSlider
       ↓
HeroSlider → Render with italic style
       ↓
Website → "We Create Gardens That Inspire"
                                   ^^^^^^^
                                   (italic)
```

## 🧪 Testing

### Test 1: Add Accent in Sanity
1. Open Hero Section in Sanity
2. Set Title Accent (English) to "Bloom"
3. Publish
4. Refresh `/en` → Should show "Bloom" instead of "Inspire"

### Test 2: German Translation
1. Set Title Accent (German) to "Blühen"
2. Publish
3. Refresh `/de` → Should show "Blühen"

### Test 3: Empty Field (Fallback)
1. Clear both accent fields
2. Publish
3. Both `/en` and `/de` → Should show "Inspire" (fallback)

## 🎯 Use Cases

Now you can easily change the accent word for:
- **Seasonal campaigns**: "Inspire" → "Transform" (Spring)
- **Special offers**: "Inspire" → "Delight"
- **Different messaging**: "Create" → "Design" → "Build"
- **A/B testing**: Try different accent words
- **Localization**: Different accent words per language

## 📚 Summary

| Feature | Before | After |
|---------|--------|-------|
| Accent word | Hardcoded "Inspire" | Dynamic from Sanity |
| Languages | Single word for both | EN & DE separate |
| Editable | Only in code | Via Sanity Studio |
| Fallback | N/A | "Inspire" if empty |

Your hero section accent word is now fully CMS-controlled! 🎉
