# Feature Cards Sanity CMS Integration Guide

## ✅ What Was Implemented

Successfully integrated Sanity CMS for the Feature Cards section with full multilingual support (EN/DE).

---

## 📁 Files Created/Modified

### 1. **Sanity Schema**
- **File:** `sanity/schemaTypes/featureCard.ts`
- **Type:** `featureCard`
- **Fields:**
  - `title_en` / `title_de` (string, required)
  - `description_en` / `description_de` (text, required)
  - `image` (image with hotspot, required)
  - `link` (string, required) - Internal or external URL
  - `order` (number, required) - For sorting cards
  - `isActive` (boolean) - Show/hide cards

### 2. **Schema Registration**
- **File:** `sanity/schemaTypes/index.ts`
- Added `featureCardType` to schema exports

### 3. **Sanity Studio Structure**
- **File:** `sanity/structure.ts`
- Added "Feature Cards" to Studio sidebar navigation

### 4. **GROQ Query & Fetch Function**
- **File:** `sanity/lib/queries.ts`
- **Query:** `FEATURE_CARDS_QUERY`
  ```groq
  *[_type == "featureCard" && isActive == true] | order(order asc)
  ```
- **Function:** `getFeatureCards(locale)`
  - Fetches active cards sorted by order
  - Returns locale-specific content

### 5. **Frontend Component**
- **File:** `components/sections/FeatureCardsSection.tsx`
- Updated to accept `cards` prop from Sanity
- Falls back to static translations if Sanity data unavailable
- Uses Sanity Image CDN with optimization

### 6. **Home Page Integration**
- **File:** `app/[locale]/page.tsx`
- Fetches feature cards data server-side
- Passes data to `FeatureCardsSection` component

---

## 🎨 Design & Layout Preserved

- ✅ Exact same UI/layout maintained
- ✅ Same animations (framer-motion)
- ✅ Same spacing and responsiveness
- ✅ Same hover effects
- ✅ Same card structure

---

## 🚀 How to Use in Sanity Studio

### Step 1: Access Sanity Studio
```
http://localhost:3000/studio
```

### Step 2: Navigate to "Feature Cards"
- Click "Feature Cards" in the sidebar
- Click "Create new Feature Card"

### Step 3: Fill in Card Details

**English Content:**
- Title (English): e.g., "Expert Garden Design"
- Description (English): e.g., "Transform your outdoor space..."

**German Content:**
- Title (German): e.g., "Experten-Gartengestaltung"
- Description (German): e.g., "Verwandeln Sie Ihren Außenbereich..."

**Other Fields:**
- **Image:** Upload card image (recommended: 800x600px)
- **Link URL:** e.g., `/about`, `/services`, or `/services#garden-maintenance`
- **Display Order:** 
  - First card: `0`
  - Second card: `1`
  - Third card: `2`
- **Active:** Toggle ON to display on website

### Step 4: Publish
- Click "Publish" button
- Card will appear on home page immediately

---

## 📊 Example Card Setup

### Card 1 - Garden Design
```
Title (EN): "Expert Garden Design"
Title (DE): "Experten-Gartengestaltung"
Description (EN): "Custom designs that transform outdoor spaces into stunning landscapes"
Description (DE): "Individuelle Designs, die Außenbereiche in atemberaubende Landschaften verwandeln"
Image: garden-design.jpg
Link: /about
Order: 0
Active: ✓
```

### Card 2 - Professional Services
```
Title (EN): "Professional Services"
Title (DE): "Professionelle Dienstleistungen"
Description (EN): "Complete garden care and maintenance solutions"
Description (DE): "Komplette Gartenpflege- und Wartungslösungen"
Image: services.jpg
Link: /services
Order: 1
Active: ✓
```

### Card 3 - Garden Maintenance
```
Title (EN): "Garden Maintenance"
Title (DE): "Gartenpflege"
Description (EN): "Regular upkeep to keep your garden pristine"
Description (DE): "Regelmäßige Pflege, damit Ihr Garten makellos bleibt"
Image: maintenance.jpg
Link: /services#garden-maintenance
Order: 2
Active: ✓
```

---

## 🔄 How It Works

### Data Flow:
1. **Sanity Studio** → Create/Edit feature cards
2. **GROQ Query** → Fetch active cards ordered by `order` field
3. **Fetch Function** → Transform data based on locale (en/de)
4. **Home Page** → Server-side fetch during render
5. **Component** → Receives data as props
6. **UI** → Renders cards with Sanity images + content

### Language Switching:
- URL: `/en` → Shows English content (`title_en`, `description_en`)
- URL: `/de` → Shows German content (`title_de`, `description_de`)

---

## 🛡️ Fallback System

If Sanity data is unavailable:
- ✅ Component falls back to static translations
- ✅ Uses existing i18n translation keys
- ✅ Shows hardcoded fallback images
- ✅ No UI breaks or errors

**Fallback locations:**
- `messages/en.json` → `Home.featureCards.cards`
- `messages/de.json` → `Home.featureCards.cards`

---

## 🖼️ Image Optimization

**Sanity CDN:**
```typescript
urlForImage(card.image)?.width(800).height(600).url()
```

**Benefits:**
- ✅ Automatic format conversion (WebP)
- ✅ Responsive sizing
- ✅ CDN caching
- ✅ Hotspot/crop support

---

## 🎯 TypeScript Types

```typescript
interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  link: string;
  order: number;
}
```

---

## ✅ Testing Checklist

- [ ] Create 3 feature cards in Sanity Studio
- [ ] Fill all English fields
- [ ] Fill all German fields
- [ ] Upload images for each card
- [ ] Set order: 0, 1, 2
- [ ] Toggle "Active" to ON
- [ ] Publish all cards
- [ ] Visit `/en` → Check English content
- [ ] Visit `/de` → Check German content
- [ ] Verify images load correctly
- [ ] Test card links work
- [ ] Test hover animations
- [ ] Test responsive layout (mobile/tablet/desktop)

---

## 🔧 Maintenance Tips

### Adding More Cards:
1. Create new card in Sanity
2. Set unique `order` number
3. Publish
4. No code changes needed!

### Reordering Cards:
1. Edit card in Sanity
2. Change `order` number
3. Publish
4. Cards automatically reorder

### Hiding Cards Temporarily:
1. Edit card in Sanity
2. Toggle "Active" to OFF
3. Publish
4. Card disappears from website

### Changing Card Links:
1. Edit card in Sanity
2. Update "Link URL" field
3. Publish
4. Link updates immediately

---

## 🐛 Troubleshooting

**Cards not showing?**
- ✓ Check if cards are published in Sanity
- ✓ Verify "Active" toggle is ON
- ✓ Check browser console for errors
- ✓ Clear Next.js cache: `npm run dev` (restart)

**Wrong language showing?**
- ✓ Check URL has correct locale (`/en` or `/de`)
- ✓ Verify both language fields are filled in Sanity

**Images not loading?**
- ✓ Verify image is uploaded in Sanity
- ✓ Check `next.config.ts` has `cdn.sanity.io` in `images.remotePatterns`
- ✓ Inspect network tab for 404 errors

---

## 🎉 Success!

Your Feature Cards section is now fully powered by Sanity CMS with:
- ✅ Full multilingual support (EN/DE)
- ✅ Easy content management
- ✅ Image optimization
- ✅ Drag-and-drop ordering
- ✅ Show/hide control
- ✅ No code changes needed for updates
- ✅ Preserved original design & animations

---

## 📚 Related Files

- Schema: `sanity/schemaTypes/featureCard.ts`
- Query: `sanity/lib/queries.ts`
- Component: `components/sections/FeatureCardsSection.tsx`
- Page: `app/[locale]/page.tsx`
- Structure: `sanity/structure.ts`
