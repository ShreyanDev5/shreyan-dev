

## Refine Experience Section -- Premium Visual Polish

Targeted refinements to elevate the Experience section from functional to premium. Every change reinforces the minimal, modern aesthetic already established across the portfolio.

---

### 1. Section Header Refinement

- Change heading to lighter weight with letter-spacing for an editorial feel: `font-semibold` instead of `font-bold`, add `tracking-[-0.02em]`
- Swap the solid emerald bar for a subtle gradient accent: `bg-gradient-to-r from-emerald-500/80 to-emerald-500/20` with slightly more width (`w-16`)
- Update subtitle to a softer gray (`text-gray-500`) for better hierarchy contrast

---

### 2. Tech Stack -- Elevated Pill Design

- Add a glass-like treatment to each pill: `backdrop-blur-sm bg-white/[0.03]` with `border-white/[0.08]`
- Introduce a subtle stagger animation on each pill (0.03s per item) using framer-motion for a cascade reveal
- On hover, pills get a soft inner glow: `hover:bg-white/[0.06] hover:border-emerald-500/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`
- Category labels: softer styling with `text-[11px] tracking-[0.2em]` for a more refined uppercase look
- Increase spacing between categories from `space-y-8` to `space-y-10`

---

### 3. Adventure Path Timeline -- Visual Polish

**Desktop SVG path:**
- Reduce stroke width from 3 to 2 for a finer, more elegant line
- Background path: reduce opacity from `0.1` to `0.06` for subtlety
- Animated path: refine to `rgba(16, 185, 129, 0.4)` with a finer dash pattern `6 8` for a more hand-sketched feel
- Milestone dots: add a subtle emerald glow ring using a second circle with `filter: blur` behind each dot
- Start/end dots: add a soft pulsing animation (`animate-pulse-slow` from existing tailwind config)

**Timeline cards:**
- Add a faint glass card background behind each entry: `bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3`
- Year badge: style as a small pill `bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px]`
- Title: bump to `text-[15px]` with `font-medium` for better readability
- Description: `text-gray-500 text-[13px]` for softer feel
- Add a thin connecting line from card to the milestone dot using a small `div` element

**Mobile timeline:**
- Upgrade the vertical line from solid to a gradient fade: starts at `emerald-500/30`, fades to `transparent` at top and bottom
- Cards get the same glass background treatment as desktop
- Milestone dots: add the emerald glow ring treatment

---

### 4. Download Resume CTA -- Premium Button

- Add a faint gradient background on hover: `hover:bg-gradient-to-r hover:from-emerald-500/5 hover:to-transparent`
- Refine border: `border-white/10` default, `hover:border-emerald-500/30` on hover
- Add a subtle scale effect: `hover:scale-[1.02]` for tactile feedback
- Icon: slightly smaller at `size={14}` for better proportion

---

### 5. Section Background Accent

- Add an ultra-faint radial gradient behind the timeline area only: `radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.02), transparent 70%)`
- This creates a subtle focal warmth around the journey path without affecting the tech stack or CTA areas

---

### Technical Summary

| Area | Key Changes |
|------|-------------|
| Header | Lighter weight, gradient accent bar, softer subtitle |
| Tech pills | Glass treatment, stagger animation, refined hover states |
| Timeline path | Finer stroke, glow dots, dash refinement |
| Timeline cards | Glass card backgrounds, pill year badges, connecting lines |
| Mobile timeline | Gradient fade line, glass cards |
| Resume CTA | Scale hover, gradient background, refined border |
| Background | Faint radial gradient behind timeline area |

**Single file modified:** `src/components/ExperienceSection.tsx`

No new dependencies. All changes use existing Tailwind utilities and framer-motion.

