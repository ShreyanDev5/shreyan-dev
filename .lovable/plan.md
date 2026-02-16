

## Plan: Remove Blog Section and Fix Scrolling

### Part 1: Remove Blog Section

Remove all blog-related code, references, and dependencies from the codebase.

**Files to modify:**

1. **src/pages/Index.tsx** -- Remove `BlogSection` import, and remove "blog" from all arrays: `SECTION_IDS`, `bgHelpers`, `SectionComponents`, `SECTION_STYLES`, `PARTICLE_VARIANTS`, `PARTICLE_SHAPES`. Remove the `ReadingProgress` component and its import (it only targets blog).

2. **src/components/IntelligentNavbar.tsx** -- Remove the `{ label: "Blog", to: "#blog" }` entry from `NAV_LINKS`.

3. **src/components/EnhancedParticleBackground.tsx** -- Remove "blog" from the variant type and its configuration object.

4. **src/components/ui/button.tsx** -- Remove the `blog` variant from button variants.

5. **src/index.css** -- Remove `.bg-blog-gradient` utility classes (both desktop and mobile versions). Remove `bg-blog-gradient` from the reduced-motion media query.

**Files to delete:**

6. **src/components/BlogSection.tsx** -- Entire file.
7. **src/components/ReadingProgress.tsx** -- Entire file (only used for blog progress tracking).

---

### Part 2: Fix Scrolling Issue

The scrolling problem stems from aggressive CSS performance "optimizations" that actually break layout:

**Root causes identified in `src/index.css`:**

1. **`contain: layout style paint` on all `section` elements (line 74)** -- This CSS containment property restricts layout calculations, which can prevent proper scroll height computation and clip overflow. It is too aggressive for full-page sections.

2. **`will-change: transform` and `transform: translateZ(0)` on all `section` elements (lines 76-77)** -- These create new stacking contexts and compositing layers for every section, which can interfere with scroll behavior and cause rendering issues.

3. **`overflow-x: hidden` on `html` (line 26)** -- While intended to prevent horizontal scroll, in some browsers this can inadvertently affect vertical scrolling when combined with transform-based containment.

4. **Global `transform: translateZ(0)` on all elements (lines 15-16 in `*` selector and lines 608-611 in mobile)** -- Applying GPU acceleration to every single element creates excessive compositing layers and can cause scroll jank or scroll blocking.

**Fixes to apply in `src/index.css`:**

- Remove `contain: layout style paint`, `will-change: transform`, and `transform: translateZ(0)` from the global `section` rule
- Remove `transform: translateZ(0)` and `will-change: auto` from the global `*` selector (keep font smoothing)
- Remove the blanket mobile `* { transform: translateZ(0) }` rule
- Keep `overflow-x: hidden` on `html` but ensure `overflow-y` is not restricted
- In the reduced-motion query, remove the `transform: none !important` on `*` which can break layout

---

### Technical Summary

| Area | Change | Why |
|------|--------|-----|
| Blog removal | Delete 2 files, update 5 files | Clean decommission of unused section |
| CSS containment | Remove `contain` from sections | Was blocking proper scroll height calculation |
| GPU layer spam | Remove global `translateZ(0)` | Too many compositing layers breaks scrolling |
| Reduced motion | Remove `transform: none !important` | Was collapsing all layout transforms |

