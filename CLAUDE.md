# CLAUDE.md — Qualrec Solutions Website

> This file is read automatically by Claude Code at the start of every session.
> Keep it loaded. The full build instructions live in `qualrec-build-spec.md`.
> The visual design source-of-truth lives in `qualrec-design-brief.md`.
> The database is defined in `supabase-schema.sql`.

---

## What we're building

A premium marketing + light-application website for **Qualrec Solutions** — a
US-based IT talent & solutions firm (HQ St. Petersburg, FL) that sources skilled
tech professionals (majority from India, also US/global) and places them with
MNCs across the US, Canada, UK, and Europe. **Contract-to-Hire is the flagship
service.** Outreach happens via LinkedIn + Gmail; the site is the credibility
layer + a jobs "notice board" + an admin panel.

Three surfaces:
1. **Public marketing site** — Home, About, Services, Industries, Case Studies, Careers, Contact (+ Privacy, Terms, 404).
2. **Jobs notice board** — admin-posted openings (Supabase) → public Careers page → apply form → stored + emailed.
3. **Admin panel** (`/admin`) — email/password + **TOTP 2FA**; manage jobs, read applications + contact submissions.

## Non-negotiables

- **Ship fast, ship working.** Prefer a finished, deployable site over a perfect-but-unshipped one. No TODO stubs in user-facing flows.
- **Premium, light-mode, high-contrast.** No laggy animation. Motion is `transform`/`opacity` only, scroll-reveals fire once, `prefers-reduced-motion` fully respected.
- **Do not invent new fake testimonials or stats.** Reuse only the placeholder content already provided, marked as placeholder in code comments.
- **Secrets never reach the client bundle.** Resend key, service-role key → server only. Only `NEXT_PUBLIC_*` is exposed.
- **RLS on every table.** Public may insert applications/contacts and read *published* jobs only. Everything else is admin-gated.

## Tech stack (locked)

- **Next.js 15** (App Router, TypeScript, Server Actions + Route Handlers)
- **Tailwind CSS v4** + CSS variables for the design tokens (see design brief)
- **Supabase** — Postgres + Auth (MFA/TOTP) + Storage (optional resume upload, off by default)
  - `@supabase/ssr` for the server/client/middleware clients
- **Framer Motion** (`motion`) for animation
- **lucide-react** for icons
- **react-hook-form + zod** for all forms
- **Resend** for transactional email (Gmail-SMTP fallback documented)
- Fonts via `next/font/google`: **Plus Jakarta Sans** (display) + **Inter** (body)

Do **not** add: Redux, a component-library theme that overrides our tokens, jQuery, moment, CSS-in-JS runtime libs, or a second animation library.

## Repo structure (target)

```
src/
  app/
    (marketing)/            # public site, shared marketing layout
      page.tsx              # Home
      about/page.tsx
      services/page.tsx
      industries/page.tsx
      case-studies/page.tsx
      careers/page.tsx      # lists published jobs from Supabase
      contact/page.tsx
      privacy/page.tsx
      terms/page.tsx
    admin/
      login/page.tsx
      enroll-2fa/page.tsx
      (dashboard)/
        layout.tsx          # guarded shell (session + aal2 + is_admin)
        page.tsx            # overview
        jobs/page.tsx       # CRUD
        applications/page.tsx
        messages/page.tsx   # contact submissions
    api/
      keep-alive/route.ts   # daily cron hits this (Supabase anti-pause)
    actions/                # server actions (submitContact, submitApplication, job CRUD)
    layout.tsx              # root: fonts, metadata, <html lang>
    not-found.tsx
  components/
    layout/ (Navbar, Footer, MobileNav)
    sections/ (Hero, StatStrip, ServiceGrid, ExpertiseDomains, IndustryGrid,
               Testimonials, LeadershipGrid, JourneyTimeline, CtaBand, ...)
    ui/ (Button, Card, Input, Select, Textarea, Badge, Container, SectionHeading,
         Reveal, Counter, ...)
    forms/ (ContactForm, ApplyForm)
  lib/
    supabase/ (client.ts, server.ts, middleware.ts)
    email/ (resend.ts, templates.tsx)
    content/ (site.ts, services.ts, expertise.ts, industries.ts, team.ts,
              testimonials.ts, caseStudies.ts, timeline.ts)  # all copy lives here
    validators.ts (zod schemas)
    utils.ts (cn, etc.)
  middleware.ts             # refresh session + protect /admin
public/
  logo/qualrec-logo.svg            # provided (Image 7)
  team/{avinash,anubhav,nitish,hitanshu}.jpg   # provided (Image 15) — drop in
  og/og-default.png                # generate
```

## Content rule

**All copy, services, domains, industries, bios, timeline, contact details, and
placeholder testimonials live in `src/lib/content/*.ts`** as typed exports.
Pages import from there. Never hardcode this content inline in JSX. The
build spec contains the exact, real values to seed these files.

## Design tokens (summary — full detail in design brief)

```
--ink:        #0F172A   /* headings */
--body:       #475569   /* paragraph text */
--muted:      #64748B
--line:       #E2E8F0   /* hairlines / borders */
--surface:    #FFFFFF
--surface-2:  #F8FAFC   /* alternating section bg */
--tint:       #EFF6FF   /* icon chips */
--brand:      #1D4ED8   /* primary actions/links */
--brand-bright:#2563EB
--brand-ink:  #0B1F4D   /* footer / hero base */
--accent:     #0E7490   /* teal, gradient edge only — sparingly */
--success:    #10B981
--radius-card: 16px; --radius-btn: 10px
--shadow-sm: 0 1px 2px rgba(15,23,42,.06);
--shadow-md: 0 10px 30px -12px rgba(15,23,42,.18);
```
Hero/footer gradient: `linear-gradient(120deg, #0B1F4D 0%, #1D4ED8 55%, #0E7490 120%)`.
Display font: Plus Jakarta Sans (700/800). Body: Inter (400–600). Eyebrows: Inter, uppercase, `letter-spacing:.14em`, 12–13px, `--brand`.

## Commands

```bash
pnpm install
pnpm dev            # local
pnpm build && pnpm start
pnpm lint
npx supabase login  # then run supabase-schema.sql in the SQL editor
```

## Environment

Copy `.env.example` → `.env.local`. Required:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server only), `RESEND_API_KEY` (server only),
`NOTIFY_EMAIL_TO=info@qualrecsol.com`, `CAREERS_EMAIL_TO=career@qualrecsol.com`,
`CRON_SECRET` (protects keep-alive), `NEXT_PUBLIC_SITE_URL`.

## Definition of done

- [ ] All 9 public pages render with the real content from `content/*`, fully responsive (360px → 1440px+).
- [ ] Contact + Apply forms validate (zod), insert to Supabase, send a templated email, show success/error states, have a honeypot.
- [ ] Careers page lists only `is_published = true` jobs; "no openings" empty state is written, not blank.
- [ ] `/admin` login → TOTP enroll (first time) / challenge → guarded dashboard. Non-admins and aal1 sessions are bounced.
- [ ] Admin can create/edit/publish/unpublish/delete jobs and read applications + messages.
- [ ] Keep-alive route + daily cron configured.
- [ ] Lighthouse (mobile) ≥ 90 Performance / 100 Accessibility / 95 SEO. No CLS from fonts/images. Visible keyboard focus everywhere.
- [ ] `pnpm build` passes with zero type errors. Deploys clean to Vercel.

## Guardrails / gotchas

- Use `next/image` with width/height or `fill` + sized parent — no layout shift.
- Don't gate marketing pages behind auth or Supabase reads that can fail; jobs read should degrade to the empty state if Supabase is unreachable.
- Watch Tailwind v4 + arbitrary CSS-var usage; define tokens in `@theme`/`:root` and reference them.
- Server Actions handle all writes so the Resend key stays server-side.
- Admin email allowlist is the `public.admins` table + `is_admin()` — adding a row is how you grant access.
