

## Refine Button Borders -- Modern, Clean Aesthetic

Update the border color and thickness on all interactive pill-style buttons across the portfolio for a more polished, cohesive look. The current `border-white/10` (10% white) is too faint and uses a default 1px thickness. We'll move to `border-white/15` with `border-[1.5px]` for a subtly more defined edge that reads as intentional and premium.

---

### Buttons to Update

**1. Hero -- "See My Resume" and "Get in Touch"** (`src/components/Hero.tsx`, lines 114 and ~122)
- Current: `border-white/20`
- New: `border-[1.5px] border-white/20` (keep the slightly higher opacity here since Hero needs more presence; just add the thickness)

**2. Experience -- "Download Resume"** (`src/components/ExperienceSection.tsx`, line 308)
- Current: `border-white/10`
- New: `border-[1.5px] border-white/15`
- Hover stays: `hover:border-emerald-500/50`

**3. Contact -- Gmail email pill** (`src/components/ContactForm.tsx`, line 57)
- Current: `border border-white/10`
- New: `border-[1.5px] border-white/15`
- Hover stays: `hover:border-emerald-500/50`

**4. Contact -- LinkedIn pill** (`src/components/ContactForm.tsx`, line 105)
- Current: `border border-white/10`
- New: `border-[1.5px] border-white/15`
- Hover stays: `hover:border-[#0077b5]/50`

---

### Technical Details

Each button gets two small class changes:
1. Replace `border` (1px) with `border-[1.5px]` for a subtly thicker outline
2. Update resting border opacity from `border-white/10` to `border-white/15` (where applicable) so the border is visible but not heavy

Hover states remain unchanged -- they already transition to accent colors (emerald or LinkedIn blue) which will pair well with the slightly thicker border.

**Files modified:**
- `src/components/Hero.tsx` -- 2 buttons
- `src/components/ExperienceSection.tsx` -- 1 button
- `src/components/ContactForm.tsx` -- 2 pill elements

