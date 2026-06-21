# RootAnRoo — System Design

> Personal portfolio + service site for web development, design, photography, and videography work, under the brand **RootAnRoo** (rootanroo.com).

---

## 1. Project Overview

RootAnRoo is a personal brand site that serves two purposes at once:

1. **Portfolio** — showcase completed and in-progress projects (web dev), design work, photography, and videography.
2. **Service promotion** — convert visitors into leads/inquiries for freelance/contract work.

This is a single-owner site (one admin: Fahmi), but built with enough structure to expand later (see §16).

## 2. Goals & Non-Goals

**Goals (v1)**
- Fast, distinctive, mobile-first presentation — not template-generic.
- Trilingual: English, Chinese (Simplified), Indonesian.
- Centralized content management via a custom Laravel admin (Filament).
- Lead capture with status tracking (not just "send an email and forget").
- SEO-friendly across all three locales.

**Non-goals (v1 — defer to Phase 2)**
- E-commerce / payment checkout.
- Blog/CMS articles (can be added later using the same Project/Article pattern).
- Client portal / project management dashboard (architecture should not block this, see §16).

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend framework | Next.js 15 (App Router, TypeScript) | SSG/ISR for portfolio pages |
| Styling | Tailwind CSS v4 | utility-first, pairs with shadcn |
| UI components | shadcn/ui (base) + 21st.dev (sections) + Aceternity UI / Magic UI (hero/showcase effects) | see design.md for usage rules |
| Animation | Motion (Framer Motion) + Lenis (smooth scroll) | used sparingly, see design.md |
| i18n | `next-intl` | locale-prefixed routing |
| Backend framework | Laravel 12 | headless API + admin panel |
| Admin panel | Filament 4 | CRUD UI on top of Laravel, no need to hand-build admin views |
| Auth (admin) | Laravel session/guard (Filament default) | not exposed to public API |
| Translatable content | `spatie/laravel-translatable` | JSON-column based, works natively with Filament |
| Media handling | `spatie/laravel-medialibrary` | images/files attached to models, has Filament plugin |
| Database | MySQL 8 (or PostgreSQL 16) | either works; MySQL if you want Forge default simplicity |
| Image storage | S3-compatible — Cloudflare R2 (free egress) or DO Spaces | |
| Video hosting | YouTube (unlisted) / Vimeo embed, **or** Cloudflare Stream | do NOT self-host raw video on the Laravel server, see §10 |
| Hosting (frontend) | Vercel | native Next.js support, preview deploys |
| Hosting (backend) | Laravel Forge + Hetzner/DigitalOcean VPS, or Laravel Cloud | Forge = least friction for someone already used to Laravel |

## 4. High-Level Architecture

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Next.js Frontend   │  REST   │     Laravel Backend       │
│   (rootanroo.com)    │ <─────> │   (api.rootanroo.com)     │
│   - public pages     │  JSON   │   - public REST API       │
│   - EN/ZH/ID routes  │         │   - Filament admin panel  │
└─────────┬────────────┘         │     (admin.rootanroo.com) │
          │                      │   - Inquiry storage        │
          │ revalidate webhook   └────────────┬──────────────┘
          │ (on content publish)              │
          └────────────────────────────────────┘
                                               │
                                   ┌───────────┴───────────┐
                                   │   MySQL/PostgreSQL    │
                                   │   + S3-compatible      │
                                   │   media storage        │
                                   └────────────────────────┘
```

Two deploy targets, two repos. Laravel is **not** rendering any public-facing HTML — it's a pure API + a separate admin UI (Filament, on its own subdomain/guard).

## 5. Repositories & Folder Structure

### `rootanroo-web` (Next.js)
```
src/
  app/
    [locale]/
      page.tsx                # Home
      work/
        page.tsx               # Portfolio grid (filterable)
        [slug]/page.tsx        # Project detail
      services/page.tsx
      about/page.tsx
      photography/page.tsx
      videography/page.tsx
      contact/page.tsx
    api/
      revalidate/route.ts      # webhook target for ISR revalidation
  components/
    ui/                        # shadcn primitives
    sections/                  # hero, showcase, grids (21st.dev/Aceternity derived)
    shared/                    # nav, footer, language switcher
  lib/
    api.ts                     # typed fetchers for Laravel API
    i18n/                      # next-intl config + message files
  messages/
    en.json
    zh.json
    id.json
```

### `rootanroo-api` (Laravel)
```
app/
  Models/
    Project.php
    PortfolioCategory.php
    Service.php
    Testimonial.php
    Inquiry.php
    MediaAsset.php (handled via medialibrary, may not need own model)
  Filament/
    Resources/
      ProjectResource.php
      ServiceResource.php
      TestimonialResource.php
      InquiryResource.php
  Http/
    Controllers/Api/V1/
      ProjectController.php
      ServiceController.php
      TestimonialController.php
      InquiryController.php
routes/
  api.php          # public read endpoints + POST inquiries
```

## 6. Data Model

| Entity | Key fields | Notes |
|---|---|---|
| `Project` | slug, category (enum: web_development, graphic_design, photography, videography), status (completed/in_progress), cover_image, external_url, tech_stack (json), featured (bool), sort_order, title/description (translatable) | Core portfolio entry, covers all 4 disciplines |
| `Service` | icon, sort_order, title/description (translatable) | What you offer — feeds Services page |
| `Testimonial` | client_name, client_company, avatar, rating, quote (translatable) | Optional but boosts trust |
| `Inquiry` | name, email, phone, service_interested, message, status (new/contacted/in_discussion/closed/spam), source, created_at | Lead tracking — managed entirely in Filament |
| `MediaAsset` | via `spatie/laravel-medialibrary` collections (`cover`, `gallery`, `before_after`) attached to `Project` | No need for a separate hand-rolled table |

**Translatable fields** (title, description, quote, etc.) use `spatie/laravel-translatable` — stored as JSON columns (`{"en": "...", "zh": "...", "id": "..."}`), editable directly inside Filament forms via the official translatable plugin. This avoids extra join tables for 3 languages.

## 7. API Design (public, read-mostly)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/projects?category=&locale=&featured=` | List/filter portfolio items |
| GET | `/api/v1/projects/{slug}?locale=` | Single project detail |
| GET | `/api/v1/services?locale=` | Services list |
| GET | `/api/v1/testimonials?locale=` | Testimonials |
| POST | `/api/v1/inquiries` | Contact form submission → creates `Inquiry` row, status=`new` |

No auth needed on GET endpoints (public data). Apply:
- Rate limiting (Laravel's built-in throttle) on `POST /inquiries` to prevent spam.
- A honeypot field + simple time-based check (form submitted < 2s after load = bot) as a lightweight anti-spam layer before reaching for a CAPTCHA.
- CORS restricted to `rootanroo.com` and your Vercel preview domains.

Admin CRUD (Projects, Services, Inquiry status updates) happens **entirely inside Filament** — it doesn't go through this public API at all.

## 8. Admin Panel (Filament)

Resources to build first:
- **ProjectResource** — full CRUD, media library field for gallery uploads, translatable title/description tabs (one tab per locale).
- **ServiceResource** — same pattern, simpler.
- **TestimonialResource** — simple CRUD.
- **InquiryResource** — read-mostly, with a status dropdown (new → contacted → in_discussion → closed/spam) and filters/sorting so it functions as a lightweight lead-tracking dashboard. This is your "CRM-lite."

Filament lives at `admin.rootanroo.com`, gated by normal Laravel auth (just you for now).

## 9. Internationalization

- Locale-prefixed routing: `/en`, `/zh`, `/id` — default redirect based on `Accept-Language`, fallback `en`.
- `next-intl` handles UI strings (nav, buttons, labels) — stored in `messages/{locale}.json`.
- Dynamic content (project titles/descriptions) comes from the API already localized via `?locale=` param.
- `hreflang` tags + per-locale `sitemap.xml` for SEO (see §11).
- **Important constraint:** Poppins does not include CJK (Chinese) glyphs. Define a fallback font stack for Chinese text — see `design.md` §2 and §8.

## 10. Media Handling

- **Images:** uploaded via Filament → `spatie/laravel-medialibrary` → stored on S3-compatible storage (Cloudflare R2 recommended for zero egress cost) → served through Next.js `<Image>` with remote loader for optimization (resize/webp/avif on the fly).
- **Video:** do not store raw video files on the Laravel server/VPS — bandwidth and storage cost will spike fast. Two options:
  1. **Simplest:** upload to YouTube (unlisted) or Vimeo, store only the embed URL in `Project`.
  2. **More control/no branding:** Cloudflare Stream — pay-per-minute, no third-party branding, adaptive bitrate built in.

## 11. SEO Strategy

- `generateMetadata()` per page per locale (title, description, OG image).
- JSON-LD structured data: `Person`/`Organization` on home, `CreativeWork` on project detail pages.
- Per-locale `sitemap.xml` + `hreflang` alternates.
- OG images: either static per project (uploaded) or generated dynamically via `next/og`.

## 12. Performance Strategy

- Portfolio/project pages: **ISR** (Incremental Static Regeneration), not full client fetching — content doesn't change often.
- **On-demand revalidation:** when a `Project` is saved in Filament, fire a webhook (Laravel `Saved` model event → HTTP call) to `POST /api/revalidate` on the Next.js side, so changes go live immediately without waiting for the ISR timer or a full redeploy.
- Image optimization via Next.js `<Image>` + CDN.
- Lazy-load below-the-fold galleries (especially photography page — likely the heaviest page).

## 13. Security

- CORS locked to known frontend origins.
- Throttle + honeypot on `POST /inquiries`.
- Filament admin behind standard Laravel auth; consider 2FA (Filament supports it) since this is a single point of access.
- No public API token needed — public endpoints are read-only and contain no sensitive data.

## 14. Deployment Architecture

- **Frontend:** Vercel, connected to `rootanroo-web` repo, auto preview deploys per PR.
- **Backend:** Laravel Forge provisioning a Hetzner/DigitalOcean VPS, or Laravel Cloud if you want less server management.
- **Database:** managed MySQL/Postgres on the same provider, or Forge-managed on the VPS.
- **Media:** Cloudflare R2 bucket, connected via Laravel's S3-compatible filesystem driver.
- **Domains:** `rootanroo.com` (Vercel), `api.rootanroo.com` (Laravel API), `admin.rootanroo.com` (Filament — can be the same Laravel app, different route prefix).

## 15. Core Features (MVP)

**Public site**
- Home — hero (real photo/video, not stock/gradient), highlight reel mixing all 4 disciplines, services summary, featured projects, CTA to contact.
- Work/Portfolio — filterable grid by category (Web / Design / Photo / Video) and status (Completed / In Progress).
- Project detail page — gallery, tech stack, external link, description, related projects.
- Services page — what you offer, with a "start a project" CTA per service.
- Photography page — dedicated gallery (masonry/lightbox).
- Videography page — reel + individual video showcase.
- About — your story, skills, process.
- Contact — form (name, email, service interested, message) → stored as `Inquiry`.
- Language switcher (EN/ZH/ID), persisted across navigation.
- Testimonials (if/when you have them).

**Admin (Filament)**
- Full CRUD for Projects, Services, Testimonials.
- Inquiry/lead dashboard with status pipeline.
- Media library management.

## 16. Future Features / Phase 2

Since Laravel was chosen specifically with room to grow, these become straightforward additions later without a rebuild:
- **Client portal** — auth-gated area for clients to track project status, given Laravel already owns auth/data.
- **Blog/articles** — reuse the same translatable + media pattern as `Project`.
- **Quote/estimate request flow** — structured intake form beyond the simple contact form.
- **Invoicing/contracts** — if RootAnRoo grows into a small studio rather than solo freelance.
