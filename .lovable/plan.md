

## Portfolio Visual Refinements

Four targeted changes to elevate the portfolio's aesthetics and personality.

---

### 1. Navbar -- Liquid Glass (iOS-inspired)

Replace the current opaque dark pill with a translucent frosted-glass effect that feels like Apple's iOS Control Center.

**Changes to `src/components/IntelligentNavbar.tsx`:**
- Desktop pill: swap `bg-[#0a0a0a]/90` and `bg-[#0a0a0a]/70` for a lighter translucent glass -- `bg-white/[0.04]` with `backdrop-blur-2xl` and a subtle `shadow-[0_8px_32px_rgba(0,0,0,0.3)]`
- Add an inner highlight border effect using `border border-white/[0.08]` plus a top-edge shine via `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`
- Mobile pill: same glass treatment for consistency
- Mobile dropdown: match the frosted glass style with `bg-white/[0.03]` and `backdrop-blur-2xl`
- Active link indicator: keep the emerald underline dot, remove any background fills on active state
- All existing functionality (scroll tracking, smooth nav, mobile hamburger) stays intact

---

### 2. Social Icons -- Brand Colors

Apply official brand colors to each social icon in the About section, with a balanced hover transition.

**Changes to `src/components/AboutSection.tsx`:**
- Add a `color` field to each social link object:
  - LinkedIn: `#0A66C2` (official blue)
  - GitHub: `#f0f0f0` (white/light since it's on dark bg)
  - X/Twitter: `#f0f0f0` (white -- matches X's monochrome brand)
  - LeetCode: `#FFA116` (official orange)
- Default state: icons display at ~60% opacity of their brand color (muted but visible)
- Hover state: full brand color opacity with a subtle border glow matching the brand color
- Implementation: move `fill` from `currentColor` to the specific hex, and control opacity via the anchor's `opacity` and `hover:opacity` classes

---

### 3. Experience Timeline -- Hand-Drawn Adventure Path

Replace the straight vertical line timeline with an SVG-based curved path that feels hand-drawn and game-like, showing progression from college to present.

**Changes to `src/components/ExperienceSection.tsx`:**
- Reorder timeline chronologically (earliest first): 2023 entries first, then 2024, showing growth upward
- Replace the vertical `div` line with a hand-drawn SVG curved path using:
  - An SVG `<path>` with organic bezier curves that snake left-to-right as it progresses vertically
  - `stroke-dasharray` and `stroke-linecap: round` to create a sketchy, hand-drawn feel
  - Emerald green stroke color with slight opacity variation
- Add milestone markers along the path: small circular nodes at each timeline entry with a slight glow
- Add a starting marker labeled "First Line of Code" at the bottom and a "Present" marker at the top
- Each milestone card positioned alternately left and right of the path (on desktop), stacked on mobile
- Animate the path drawing on scroll using framer-motion's `pathLength` animation
- Keep tech stack section above unchanged
- Keep the Download Resume CTA at the bottom

---

### 4. Footer -- Simplified

**Changes to `src/components/Footer.tsx`:**
- Remove the GitHub and LinkedIn icon links entirely (social links already exist in About)
- Center the text: "Shreyan Sardar . 2026"
- Remove the `Github` and `Linkedin` lucide imports

---

### Technical Details

**Files modified:**
| File | Change |
|------|--------|
| `src/components/IntelligentNavbar.tsx` | Glass morphism styling on desktop pill, mobile pill, and dropdown |
| `src/components/AboutSection.tsx` | Brand colors on social icon SVGs with opacity-based hover |
| `src/components/ExperienceSection.tsx` | SVG curved path timeline with scroll-draw animation, reordered chronologically |
| `src/components/Footer.tsx` | Remove social links, update year to 2026 |

**No new dependencies required.** All effects achieved with existing Tailwind classes, inline styles, and framer-motion (already installed).

