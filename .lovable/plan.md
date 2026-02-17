

## Enhance Background and Add Premium Scroll Animations

Subtle, premium enhancements that elevate the visual experience without breaking the minimalist design language. No cheap gradients or flashy effects -- just refined atmospheric details and smooth scroll-driven motion.

---

### 1. Ambient Background Glow Layer (Index.tsx)

Add a fixed, subtle background layer to the entire page with two soft radial gradients that create depth -- one emerald tint near the top and one cool blue-gray near the bottom. These stay fixed as you scroll, creating a sense of atmospheric depth behind all sections.

**Changes to `src/pages/Index.tsx`:**
- Add a `position: fixed` background div behind all content with two ultra-faint radial gradients:
  - Top-left: `radial-gradient(ellipse at 20% 0%, rgba(16, 185, 129, 0.04), transparent 50%)`
  - Bottom-right: `radial-gradient(ellipse at 80% 100%, rgba(59, 130, 246, 0.03), transparent 50%)`
- These are barely visible (~3-4% opacity) -- just enough to break the pure black monotony and add premium warmth

---

### 2. Section Dividers with Soft Gradient Fades (Index.tsx)

Between each major section, add a thin horizontal gradient line that fades from transparent to a faint emerald/white center, then back to transparent. This replaces the abrupt section transitions with a gentle visual rhythm.

**Changes to `src/pages/Index.tsx`:**
- Insert divider `<div>` elements between sections using a centered radial gradient on a 1px-high element:
  `bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]`

---

### 3. Scroll-Triggered Parallax-Style Section Reveals (All sections)

Upgrade the current simple opacity fades with subtle vertical translate + opacity combinations using framer-motion's `whileInView`. Each section heading group gently rises (translateY from 20px to 0) as it enters the viewport, creating a smooth "surfacing" feel.

**Changes to section components:**
- **`src/components/AboutSection.tsx`**: Add `y: 20` to initial state and `y: 0` to animate state for the main content grid
- **`src/components/ProjectsSection.tsx`**: Add staggered card reveals with `y: 30` initial offset, each card entering 0.08s after the previous
- **`src/components/ExperienceSection.tsx`**: Tech stack pills get a gentle stagger animation (0.03s per pill), creating a cascade effect when scrolled into view
- **`src/components/ContactForm.tsx`**: Form container rises with a `y: 20` translate

These are light 20-30px vertical movements -- not aggressive bounces.

---

### 4. Project Card Hover Glow Enhancement (ProjectCard.tsx)

Add a subtle emerald edge glow on project card hover that reinforces the accent color without being garish.

**Changes to `src/components/ProjectCard.tsx`:**
- On hover, add `shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]` alongside the existing translate and shadow
- The image overlay gradient gets slightly less opaque on hover, revealing more of the project screenshot

---

### 5. Hero Section -- Layered Depth (Hero.tsx)

Add a second, extremely faint static gradient layer beneath the cursor-following orb to give the hero more atmospheric depth even when the cursor is not moving.

**Changes to `src/components/Hero.tsx`:**
- Add a fixed radial gradient at center-bottom: `radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.03), transparent 60%)`
- This provides a baseline ambient glow so the hero doesn't feel completely flat before the user moves their cursor

---

### 6. Tech Stack Pill Hover Effect (ExperienceSection.tsx)

Give tech stack pills a subtle interactive glow on hover -- border brightens to emerald and a faint text color shift to white.

**Changes to `src/components/ExperienceSection.tsx`:**
- Update pill classes: add `hover:border-emerald-500/30 hover:text-white` to the existing pill styling
- This adds interactivity without changing the resting state

---

### 7. Contact Section Subtle Background (ContactForm.tsx)

Add an ultra-faint emerald radial gradient behind the contact form to visually "warm" the final call-to-action area.

**Changes to `src/components/ContactForm.tsx`:**
- Wrap the section in a relative container with a background div using `radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.03), transparent 60%)`

---

### Technical Summary

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Fixed ambient background layer + section dividers |
| `src/components/Hero.tsx` | Static base gradient layer for depth |
| `src/components/AboutSection.tsx` | Scroll-triggered translateY reveal |
| `src/components/ProjectsSection.tsx` | Staggered card entry animations |
| `src/components/ProjectCard.tsx` | Emerald hover glow |
| `src/components/ExperienceSection.tsx` | Tech pill stagger + hover glow |
| `src/components/ContactForm.tsx` | Background warmth + translateY reveal |

No new dependencies. All effects use existing Tailwind utilities and framer-motion. Color palette stays within emerald + one faint blue accent for depth contrast.

