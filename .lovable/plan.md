

## Revamp Contact Section -- Minimal Email-Only Design

Remove the entire form (name, email, message inputs, Formspree integration, validation logic) and replace with a clean, artistic section centered around a single `mailto:` link.

---

### Design

The new Contact section will feature:

- **Heading**: "Let's Connect" with the existing emerald accent bar
- **Tagline**: A short, inviting line (e.g., "Have something in mind? I'd love to hear from you.")
- **Gmail icon**: An inline SVG of the official Google Mail logo (the multicolored envelope) displayed at a tasteful size (~48px), providing instant visual recognition
- **Email address**: `shreyansardar427@gmail.com` displayed as a clickable `mailto:` link in emerald, styled as a clean button/pill with a subtle border and hover glow
- **Copy-to-clipboard**: A small copy icon next to the email that copies the address with a brief "Copied!" feedback animation

The entire card sits inside the same `rounded-2xl border border-white/10` container used now, keeping visual consistency.

---

### Technical Changes

**File: `src/components/ContactForm.tsx`**
- Remove all form-related imports (`useForm`, `zod`, `zodResolver`, `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`, `Input`, `Textarea`, `Send`, `Check`, `toast`)
- Remove all state (`isSubmitting`, `isSubmitted`), form schema, and `onSubmit` logic
- Replace the JSX with:
  - Section heading with `motion` fade-in (kept from current)
  - A centered card containing:
    - Gmail SVG icon (inline, multicolored official logo)
    - The email address as a `mailto:` link styled as a pill button
    - A small copy-to-clipboard button using `navigator.clipboard.writeText()` with a `useState` toggle for "Copied!" feedback
- Keep the ambient emerald background gradient and the `id="contact"` for navbar scroll targeting
- Keep `framer-motion` for the subtle entrance animations

**No other files need changes.** The import in `Index.tsx` stays the same since the component name and file path remain identical.

