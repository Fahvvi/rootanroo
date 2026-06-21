# RootAnRoo — Design Guide

> Goal: a site that looks unmistakably made by a real designer/photographer/developer — not a templated AI-generated landing page. Real photography and video are the biggest asset here; lean on them.

---

## 1. Brand & Visual Direction

**What to avoid (the "AI-generic" pattern):**
- Centered hero + soft gradient blob + 3 evenly-spaced feature cards.
- Default Tailwind indigo/violet gradient as the primary brand color.
- Every corner rounded the same `rounded-xl`, every card identical padding/shadow.
- Stock illustration / 3D blob graphics instead of real photography.
- Symmetric, predictable 12-column grid on every section.

**What to lean into instead:**
- Real photography/video as primary visual material — it's your actual differentiator.
- Asymmetric layouts — offset image/text blocks, varied column spans per section.
- Strong, editorial typographic hierarchy (big confident headlines, generous whitespace).
- One or two signature interaction details (custom cursor on hover over project cards, subtle scroll-driven reveal) rather than animation everywhere.
- A grain/texture or duotone treatment on hero imagery for a distinct visual signature.

## 2. Typography System

- **Primary (UI/body):** Poppins — as requested. Use weights 400/500/600 for body and UI; avoid using Poppins Bold/800 for huge display headlines, it reads "templated" at large sizes.
- **Display/headline pairing (recommended):** pair Poppins with one distinctive display font for big section headlines and hero text — something like **Fraunces** (warm serif, strong contrast, great for an editorial/portfolio feel) or **General Sans / Clash Display** (modern grotesk, more "studio/agency" feel). Pick whichever matches your personal taste more — serif = editorial/personal, grotesk = studio/agency.
- **CJK fallback (required):** Poppins has no Chinese glyphs. Define a font stack so Chinese text doesn't silently fall back to a generic system font:
  ```css
  font-family: "Poppins", "Noto Sans SC", system-ui, sans-serif;
  ```
  Use **Noto Sans SC** (Simplified Chinese, matches your target audience) loaded only on `/zh` routes to avoid shipping unnecessary font weight on other locales.
- **Type scale:** use a deliberate ratio (e.g. 1.25–1.333) rather than default Tailwind text sizes everywhere — gives headlines more presence and avoids the "default theme" feel.

## 3. Color System

Recommended approach: one confident accent color (not default blue/purple) + a near-black/near-white base, rather than a busy multi-color palette.

| Token | Suggestion | Usage |
|---|---|---|
| `background` | near-black `#0B0B0C` (dark mode) / off-white `#FAF9F6` (light) | avoid pure `#000`/`#FFF`, slightly warm/cool tint reads more designed |
| `foreground` | inverse of background | body text |
| `accent` | pick ONE distinctive color tied to "Root" + "Roo" identity — e.g. a warm terracotta/clay, or a deep moss green (earthy, ties to brand name) — avoid default indigo/violet | CTAs, links, highlights only — not everywhere |
| `muted` | gray-toned, low contrast | secondary text, borders |

Support both light/dark mode — portfolio sites with photography often look best in dark mode by default (photos pop more), with light mode as toggle.

## 4. Layout Principles

- Break the grid intentionally: hero image bleeding off-screen edge, text block offset rather than centered.
- Vary section rhythm — not every section needs equal height/padding; let featured projects take more visual weight.
- Generous negative space around hero headline — don't crowd it with too many CTAs.
- Use real aspect ratios from your actual photos/videos rather than forcing everything into uniform squares.

## 5. Component Library Strategy

| Library | Role |
|---|---|
| **shadcn/ui** | Base primitives (buttons, inputs, dialogs, forms) — you own the code, fully restyleable |
| **21st.dev** | Source for distinctive pre-built sections (testimonial layouts, bento grids) — copy then restyle to match your palette/type, don't use as-is |
| **Aceternity UI** | High-impact hero/showcase effects (spotlight, beams, 3D hover cards) — use 1–2 max, not on every section |
| **Magic UI** | Bento grids, marquee (good for client logos / tech stack strip), animated lists |
| **Motion** (Framer Motion) | Page transitions, scroll-triggered reveals — keep durations short (200–400ms), avoid bouncy easing everywhere |
| **Lenis** | Smooth scroll — common in agency/portfolio sites, adds polish without being gimmicky |
| **yet-another-react-lightbox** / **PhotoSwipe** | Photography gallery lightbox |

**Rule of thumb:** pick from these libraries for *structure/behavior*, but always re-skin with your own type scale, color tokens, and spacing — never ship a 21st.dev or Aceternity component with its default styling untouched.

## 6. Page Structure

| Page | Key sections |
|---|---|
| **Home** | Hero (real photo/video) → quick intro → services summary → featured/mixed-discipline project showcase → testimonials (if any) → contact CTA |
| **Work/Portfolio** | Filter bar (category: Web / Design / Photo / Video, status: Completed / In Progress) → project grid |
| **Project Detail** | Hero image/video, description, tech stack or shoot details, gallery, external link, related projects |
| **Services** | Each service (web dev / design / photo / video) with description + "start a project" CTA |
| **Photography** | Dedicated masonry gallery, category tags (e.g. portrait, event, product) |
| **Videography** | Reel embed at top, individual project videos below |
| **About** | Personal story, process, skills — humanizes the brand |
| **Contact** | Form (name, email, service interested, message), direct email links (noreply@ for system, partnership@ for business inquiries) |

## 7. Portfolio-Specific UI Patterns

- **Filterable grid:** category + status filters should animate the grid reflow (Motion's `layout` prop), not just hard re-render.
- **Lightbox for photography:** full-screen, swipeable on mobile, captions optional.
- **Video showcase:** lazy-load video embeds (don't autoplay everything on page load — kills mobile performance), use a custom-styled play button over a thumbnail rather than the platform's default embed chrome where possible.
- **Before/after slider:** useful for design work (e.g. redesign comparisons) — a nice differentiator if you have before/after design cases.
- **Status badge:** small visual distinction for "In Progress" vs "Completed" projects, so visitors don't think a WIP project is abandoned/broken.

## 8. Multilingual UI Considerations

- Language switcher: persistent, accessible from nav on all breakpoints — flag icons are optional but text labels (EN / 中文 / ID) are clearer than flags alone (flags ≠ language, e.g. Chinese isn't tied to one country flag).
- **Text length variance:** English and Indonesian text tend to run longer than Chinese for the same meaning — design components (buttons, nav items, headlines) to gracefully handle length differences across locales; avoid fixed-width containers that assume English length.
- Apply the CJK font fallback (§2) automatically based on `/zh` route, not manually per component.
- Date/number formatting should respect locale conventions if displayed (e.g. project dates).

## 9. Responsive / Mobile Rules

- Design mobile-first: stack asymmetric layouts into single-column without losing the "designed" feel (avoid just shrinking desktop layout).
- Touch targets ≥44px for nav, filters, and gallery controls.
- Reduce/disable heavy scroll-driven animations on mobile if they hurt performance (test on a mid-range Android device, not just your dev machine).
- Video: avoid autoplay-with-sound on mobile; respect data usage (poster image + tap-to-play).

## 10. Motion & Interaction Guidelines

- Motion should support hierarchy (draw attention to what matters), not decorate every element.
- Keep entrance animations subtle (8–16px translate + fade, not large bounces).
- Respect `prefers-reduced-motion` — disable non-essential animation for users who request it.

## 11. Accessibility

- Color contrast: verify accent-on-background combinations meet WCAG AA, especially in dark mode.
- All interactive elements keyboard-navigable (gallery, lightbox, filters, language switcher).
- Alt text required on every project/photo image (also helps SEO).
- Form errors announced clearly, not just color-coded.
