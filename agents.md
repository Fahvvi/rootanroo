# RootAnRoo — Agent Instructions

> This file exists so any AI coding agent (Claude Code, Cursor, Copilot, etc.) working on this project stays within scope. Read this before making any change. If a request conflicts with this file, flag the conflict instead of silently deciding.

---

## 1. Project Context

RootAnRoo is a personal portfolio + service-promotion site for web development, design, photography, and videography, built by a solo owner (Fahmi). It is **not** a SaaS product, **not** a large team project — keep solutions proportionate to a single-owner site, even though the architecture allows future growth (see system-design.md §16).

## 2. Source of Truth

Before implementing anything, check these files in this order:
1. `system-design.md` — architecture, data model, API contracts, tech stack.
2. `design.md` — visual direction, typography, color, component rules.
3. This file (`agents.md`) — process rules and hard constraints.

If a task isn't covered by these docs, **stop and ask** rather than inventing a new pattern. If a task requires deviating from these docs (new dependency, new entity, new page), propose the change and update the relevant doc first — don't silently drift.

## 3. Hard Constraints (do not change without explicit approval)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS. No switching to Pages Router, no CSS-in-JS libraries, no other meta-framework.
- **Backend:** Laravel + Filament for admin. No introducing a second backend framework or a separate Node.js API server.
- **i18n:** `next-intl`, 3 locales only — `en`, `zh`, `id`. Don't add other libraries for translation.
- **Component base:** shadcn/ui. Don't introduce a competing full UI kit (e.g. MUI, Chakra, Ant Design) — supplementary libraries listed in `design.md` §5 are fine, a wholesale replacement is not.
- **Database:** MySQL or PostgreSQL only (whichever was actually provisioned — check `.env`, don't assume).
- **Translatable content:** must use `spatie/laravel-translatable` pattern already defined in `system-design.md` §6 — don't create parallel translation tables for new entities.

## 4. Folder & Naming Conventions

- Frontend pages live under `src/app/[locale]/...` — never create a route outside the `[locale]` segment for public pages.
- Reusable UI primitives go in `components/ui/`, page-specific composed sections go in `components/sections/`. Don't dump everything into one `components/` folder.
- Laravel: Filament resources go in `app/Filament/Resources/`, API controllers in `app/Http/Controllers/Api/V1/` — versioned, don't add unversioned routes.
- Use kebab-case for file/route names, PascalCase for React components and PHP classes, camelCase for variables/functions.

## 5. i18n Rules

- Never hardcode user-facing strings — always go through `next-intl` message files (`messages/en.json`, `zh.json`, `id.json`). Adding a string to one locale file without adding it to the other two is an incomplete change.
- Any new translatable database field must support all 3 locales via the existing translatable pattern — don't add a field that's English-only "for now."
- Apply the CJK font fallback (`design.md` §2) to any new text-rendering component — don't assume Poppins alone covers all locales.

## 6. Data & Content Rules

- Don't invent new database entities/models without first adding them to `system-design.md` §6 (Data Model) — keep the doc and the code in sync.
- Don't add fields to existing models "just in case" — only add what the current task actually needs.
- Inquiry/lead data is the most sensitive data in this system (contains real client contact info) — never log it in plaintext, never expose it via any public API endpoint.

## 7. What This Agent Must NOT Do

- Do not add a new major dependency (state management library, animation library, CSS framework, CMS) without explaining why the libraries already listed in `system-design.md`/`design.md` are insufficient.
- Do not redesign page layouts or change the color/type system unilaterally — that's defined in `design.md`; propose changes there first.
- Do not build features outside MVP scope (`system-design.md` §15) unless explicitly asked — no e-commerce, no blog, no client portal until Phase 2 is greenlit.
- Do not expose Filament admin routes or any admin-only data through the public Next.js-facing API.
- Do not store or serve raw video files from the Laravel server (see `system-design.md` §10) — always use the embed/streaming approach already decided.
- Do not silently change the chosen hosting/deployment targets (Vercel for frontend, Forge/VPS for backend).

## 8. Workflow When Adding a Feature

1. Confirm the feature is in scope (MVP list or an approved Phase 2 item).
2. Check if it touches the data model — if yes, update `system-design.md` §6/§7 first.
3. Check if it touches visual design — if yes, follow `design.md`, don't introduce new ad-hoc styling patterns.
4. Implement frontend + backend changes together when they're coupled (e.g. new field needs both a Filament form field and a Next.js display).
5. Update both `en`, `zh`, `id` message/content sources together — never ship a feature in one locale only.

## 9. Definition of Done Checklist

- [ ] Works on mobile viewport (not just desktop).
- [ ] All 3 locales have complete, non-placeholder content/strings.
- [ ] No hardcoded user-facing text outside `next-intl` message files.
- [ ] Follows existing component/folder conventions (no new pattern introduced without reason).
- [ ] No new dependency added without justification.
- [ ] Matches `design.md` typography/color/spacing rules — not default shadcn/Tailwind styling left untouched.
- [ ] If data model changed: `system-design.md` updated to match.

## 10. Quick Reference

| Layer | Choice |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind |
| UI base | shadcn/ui + 21st.dev/Aceternity/Magic UI (restyled, not default) |
| i18n | next-intl — en / zh / id |
| Backend | Laravel 12 + Filament 4 |
| DB | MySQL/PostgreSQL (check `.env`) |
| Media | spatie/laravel-medialibrary → S3-compatible (Cloudflare R2) |
| Video | YouTube/Vimeo embed or Cloudflare Stream — never self-hosted raw files |
| Hosting | Vercel (frontend) + Forge/VPS (backend) |
