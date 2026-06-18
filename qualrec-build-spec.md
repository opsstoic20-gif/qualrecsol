# Qualrec Solutions — Master Build Spec & Claude Code Prompt

> Paste the "Kickoff prompt" block into Claude Code to start. It then follows
> `CLAUDE.md`, this spec, `qualrec-design-brief.md`, and `supabase-schema.sql`.
> All exact content below goes into `src/lib/content/*.ts`.

---

## ▶ KICKOFF PROMPT (paste this first)

> You are building the Qualrec Solutions website. Read `CLAUDE.md`,
> `qualrec-design-brief.md`, `qualrec-build-spec.md`, and `supabase-schema.sql`
> fully before writing code. Build in the phases defined in this spec, in order.
> Stack is locked (Next.js 15 App Router + TS + Tailwind v4 + Supabase +
> Framer Motion + Resend). Put ALL copy in `src/lib/content/*.ts` using the exact
> values in this spec. The site must be fully responsive, animated smoothly with
> reduced-motion respected, accessible (visible focus, ≥4.5:1 contrast), and
> deploy clean to Vercel. Do not stub user-facing flows. After each phase, run
> `pnpm build` and fix all type/lint errors before continuing. Start with Phase 0.

---

## 1. Positioning & facts (canonical)

- **Name:** Qualrec Solutions. Tagline/endorsement: **"We Deliver Quality."**
- **What:** US-based IT talent & solutions firm. Sources skilled tech professionals (majority India; also US & other countries) and places them with MNCs across **US, Canada, UK, Europe**. Outreach via LinkedIn + Gmail.
- **Flagship service:** **Contract-to-Hire.** (Direct hire offered but not the focus.)
- **Founded:** 2015, Noida, by **Avinash Singh & Rajesh Pal.**
- **Today:** 1000+ consultants across India & the US.

### Contact (use everywhere; footer + contact page)
- Email: **info@qualrecsol.com** · Careers: **career@qualrecsol.com**
- USA: **+1 305-340-6376** (Mon–Fri 9am–6pm EST)
- India: **+91 945-894-0341** (Mon–Fri 9am–6pm IST)
- US HQ: **7901 4th St N Ste 4138, St. Petersburg, FL 33702**
- Tampa office: **501 East Kennedy Boulevard, Tampa, FL 33602**
- India: **Multiple locations** (origin Noida)
- Hours: **Mon–Fri 9:00 AM – 6:00 PM EST/IST**, respond within 24h
- Social: LinkedIn, Facebook

### Stats (reuse client's existing claimed numbers — see flags)
- Home: `500+ Projects Completed` · `98% Client Satisfaction` · `1000+ Expert Consultants` · `50+ Fortune 500 Clients`
- Careers: `1000+ Team Members` · `95% Employee Satisfaction` · `4.8/5 Glassdoor` · `2.5 years Avg Tenure`
- Case studies: `500+ Projects` · `98% Satisfaction` · `$50M+ Client Savings` · `15+ Industries`

> ⚠ **FLAG:** the "50+ Fortune 500", per-industry numbers, the case studies, and
> all testimonials are **placeholders from the prior Bolt build**. Carry them but
> comment `// PLACEHOLDER — replace with verified content before real-domain launch`.

---

## 2. Content to seed (`src/lib/content/*.ts`)

### `services.ts` — staffing models (order matters; CTH first)
1. **Contract-to-Hire** *(flagship — `featured: true`)* — "Evaluate talent on a contract basis and convert to full-time once it's a clear fit. The lowest-risk way to hire — you see the work before you commit."
2. **Direct Hire / Permanent Placement** — "Sourced, screened, and presented for permanent roles, matched on skills and culture."
3. **Contract Staffing / Staff Augmentation** — "Scale your team up or down with vetted contractors for project-based and ongoing needs."
4. **RPO (Recruitment Process Outsourcing)** — "We run all or part of your hiring function — sourcing, screening, scheduling — as an extension of your team."
5. **Payroll / EOR Services** — "We employ and pay your placed talent, handling compliance, taxes, and onboarding across geographies."

### `services.ts` — IT solutions (secondary)
Application Development · Cloud Services · Data & Analytics / AI · Cybersecurity · Project Consulting (1-line each, reuse Bolt copy themes).

### `expertise.ts` — 10 talent domains (each with its skill list)
1. **Software Development & Engineering** — Full-Stack (Java, .NET, Python, Node.js, React, Angular, Vue), Mobile (iOS/Swift, Android/Kotlin, Flutter, React Native), Backend & API (Spring Boot, Django, Express), Front-End (JS frameworks, UI/UX, Web Components), Low-Code/No-Code (OutSystems, Mendix, Power Apps).
2. **Cloud Computing & Infrastructure** — AWS, Azure, GCP, Oracle Cloud; Solutions Architects & migration; DevOps & SRE; Cloud Security & Compliance; IaC (Terraform, Ansible, Pulumi).
3. **Cybersecurity** — SOC analysts & threat hunters; Pen testing & ethical hacking; IAM; Cloud security engineering; GRC; Incident response & forensics.
4. **Data, Analytics & AI** — Data engineering (ETL, Big Data, Snowflake, Databricks); Data science & ML; AI & GenAI (OpenAI, LangChain, LLaMA, RAG); BI (Power BI, Tableau, Looker, Qlik); Data governance & MDM; Predictive & prescriptive analytics.
5. **Enterprise Applications** — ERP (SAP S/4HANA, Oracle ERP Cloud, Dynamics 365, Workday); CRM (Salesforce, HubSpot, Dynamics CRM); HRIS & Payroll (Workday, ADP, UKG); ITSM & ServiceNow; E-commerce (Shopify, Magento, SF Commerce Cloud).
6. **Emerging Technologies** — Blockchain (Ethereum, Hyperledger, Solana); Web3 & dApps; AR/VR/MR (Unity, Unreal); Digital Twins; Quantum (Qiskit, AWS Braket).
7. **Networking & IT Infrastructure** — Network engineering (Cisco, Juniper, Palo Alto); Wireless & 5G; Infra support (Windows, Linux, Unix); IT asset management.
8. **Product & Project Management** — Agile (Scrum Masters, Product Owners); Scaled Agile (SAFe); Business analysis & product strategy; Technical program management.
9. **Quality Assurance & Testing** — Automation (Selenium, Cypress, Playwright); Performance (JMeter, LoadRunner); Security testing; Continuous testing in DevOps.
10. **Specialized Functional IT Roles** — RegTech & FinTech; HealthTech (EMR/EHR, Epic, Cerner); MarTech (Adobe Experience Manager, Marketo); IoT engineers; Embedded systems.

### `industries.ts` — 5 verticals *(stats illustrative — flag)*
- **Healthcare** — HIPAA-compliant solutions. `50+ Clients · 200+ Projects · 99% Satisfaction`. Specializations: EHR Systems, Telemedicine, Medical Imaging, Compliance. Challenges: data security & privacy, regulatory compliance, system integration, patient experience.
- **Financial Services** — secure, scalable for banks/fintech. `40+ · 150+ · 98%`. Digital Banking, Payment Systems, Risk Management, Blockchain. Challenges: regulatory compliance, cybersecurity, legacy modernization, customer experience.
- **Manufacturing** — Industry 4.0 & supply chain. `35+ · 120+ · 97%`. IoT Integration, Predictive Maintenance, Supply Chain, Quality Control. Challenges: digital transformation, equipment integration, real-time monitoring, cost optimization.
- **Retail & E-commerce** — omnichannel. `60+ · 300+ · 96%`. E-commerce Platforms, POS, Inventory Management, Customer Analytics. Challenges: omnichannel integration, personalization, inventory optimization, mobile commerce.
- **Government & Public Sector** — secure, compliant. `25+ · 80+ · 99%`. Citizen Services, Data Management, Cybersecurity, Compliance. Challenges: budget constraints, legacy modernization, security requirements, citizen engagement.

### `team.ts` — leadership (real; photos in `/public/team/`)
- **Avinash Singh — Director & Co-founder** (`avinash.jpg`, `founder: true`) — "Avinash Singh is the strategic pillar of the company. Together with Mr. Rajesh Pal, he co-founded Qualrec in 2015, navigating it through major industry disruptions. Under his leadership the company has not only survived but thrived through the COVID-19 pandemic and the 2023–24 tech downturn."
- **Anubhav Tyagi — Chief Technology Officer (CTO)** (`anubhav.jpg`) — "Anubhav drives our technical vision and innovation strategy, leading cutting-edge initiatives that keep Qualrec Solutions at the forefront of digital transformation and emerging technologies."
- **Nitish Kumar — Vice President of Operations** (`nitish.jpg`) — "Nitish ensures operational excellence across all service-delivery channels, focusing on scalable processes, client satisfaction, and strategic team development to maintain our industry-leading standards."
- **Hitanshu Rajput — Head of Talent Acquisition** (`hitanshu.jpg`) — "Hitanshu leads our global talent-acquisition strategy, connecting exceptional IT professionals with clients across India and the United States, ensuring alignment between technical expertise and organizational culture."

### `timeline.ts` — Our Journey
- **2015 — Foundation** — "Avinash Singh and Rajesh Pal launched the company in Noida with a mission to bridge the gap between talent and opportunity — reliable services for companies, meaningful employment for individuals."
- **2019–2022 — Crisis & Resilience** — "Through the COVID-19 pandemic, while many businesses collapsed, we leaned into innovation and empathy, restructured our service pipelines, and retained major partnerships."
- **2023–2024 — Growth Amid Uncertainty** — "Amid tech-industry layoffs, we introduced adaptive workflows and career-first strategies that helped us grow while others downsized."
- **2025 — Global Excellence** — "Qualrec Solutions operates with 1000+ consultants across India and the United States, delivering IT solutions and staffing to Fortune 500 companies and growing enterprises."
- **2026 — Continued Momentum** — "We've continued to expand across geographies and capabilities, and we're carrying that momentum forward — same focus, larger reach."

### `testimonials.ts` *(PLACEHOLDER — replace before real-domain launch)*
- "Qualrec Solutions transformed our IT infrastructure. Their cloud expertise saved us 40% in operational costs." — **Sarah Johnson, CTO, TechCorp Inc.**
- "The staff augmentation they provided helped us scale our development team efficiently and cost-effectively." — **Michael Chen, IT Director, HealthPlus**
- "Outstanding cybersecurity consulting. They found vulnerabilities we never knew existed and implemented robust measures." — **Emily Rodriguez, VP Technology, RetailMax**

### `caseStudies.ts` *(PLACEHOLDER — 6 entries)*
Regional Hospital EHR Modernization (Healthcare) · Community Bank Digital Transformation (Financial Services) · Smart Manufacturing Implementation (Manufacturing) · E-commerce Platform Overhaul (Retail) · State Agency Digital Services Portal (Government) · Financial Institution Cybersecurity Overhaul (Financial Services). Each: `tag, client, duration, team, challenge, solution, results[], tech[], quote{text,name,title}`. Reuse Bolt copy.

### `whyChooseUs` (independent — written)
Contract-to-Hire specialists (try before you commit) · Global talent network (deep India sourcing + US/Canada/UK/Europe reach) · Pre-vetted & fast (we screen for skill + culture before you see a resume) · Dual-shore presence (US team in St. Petersburg/Tampa, India delivery) · Fortune-500 trusted track record · Coverage across EST + IST working hours.

---

## 3. Database — see `supabase-schema.sql`

Tables: `jobs`, `applications`, `contact_submissions`, `admins` + `is_admin()`
helper + RLS. Run the SQL in the Supabase SQL editor. Summary of access:
- **Public (anon):** `INSERT` into `applications` & `contact_submissions`; `SELECT` `jobs WHERE is_published = true`.
- **Admin (authenticated + in `admins`):** full access to all four tables.

## 4. Auth + 2FA (Supabase MFA / TOTP)

Admin account is **pre-created** in Supabase Auth. Flow:
1. `/admin/login` — email + password (`supabase.auth.signInWithPassword`).
2. After sign-in, check MFA factors (`auth.mfa.listFactors`):
   - **No verified factor →** redirect `/admin/enroll-2fa`: `auth.mfa.enroll({factorType:'totp'})` → render the returned QR (authenticator app) → `auth.mfa.challenge` + `verify` with the 6-digit code → now AAL2.
   - **Has factor →** prompt for the 6-digit code → `challenge` + `verify` → AAL2.
3. **Middleware** (`src/middleware.ts`) on `/admin/(dashboard)/**`: require a session, `is_admin()` true, and `getAuthenticatorAssuranceLevel().currentLevel === 'aal2'`. Otherwise redirect to `/admin/login`.
4. Use `@supabase/ssr` (`createServerClient` / `createBrowserClient`) and refresh the session in middleware.

> To grant a new admin: create the user in Supabase Auth, then
> `insert into public.admins (user_id, email) values ('<uuid>', '<email>');`

## 5. Forms + email (Server Actions + Resend)

Both forms POST to a **Server Action** so the Resend key stays server-side:
- Validate with **zod** (`src/lib/validators.ts`).
- **Honeypot** hidden field (`company_url`) — if filled, silently succeed without storing (bot).
- Lightweight rate-limit (per-IP in-memory or a `rate_limits` check; keep simple).
- Insert the row into Supabase.
- Send a **templated HTML email** via Resend:
  - Contact → `NOTIFY_EMAIL_TO` (info@qualrecsol.com), subject `New website enquiry — {name}`.
  - Application → `CAREERS_EMAIL_TO` (career@qualrecsol.com), subject `New application — {role} — {name}`.
  - `reply_to` set to the submitter's email so admin can reply directly from Gmail.
- Return `{ ok: true }` → form shows a success state ("Message sent — we'll reply within 24 hours."). On failure, show a written error and keep the user's input.

**Email provider notes (resolve at deploy):**
- **Resend (recommended):** create account → add domain `qualrecsol.com` → add the DNS records in **Hostinger** → send `from: "Qualrec Solutions <noreply@qualrecsol.com>"`. Until DNS verifies, you can send to the account owner from `onboarding@resend.dev` for testing.
- **Gmail SMTP fallback (works immediately, no DNS):** Nodemailer + a Gmail **App Password** for info@qualrecsol.com (env `GMAIL_USER`, `GMAIL_APP_PASSWORD`). Keep the email module swappable behind `src/lib/email/send.ts` so the provider can change without touching forms.

`src/lib/email/templates.tsx` — clean, branded HTML (logo wordmark, blue accent, fields in a table, submitted-at timestamp).

## 6. Admin panel (`/admin/(dashboard)`)

Guarded shell + sidebar. Pages:
- **Overview** — counts (open jobs, new applications, unread messages) + recent activity.
- **Jobs** — table + "New job" form (title, category [from expertise list], employment_type [Contract-to-Hire/Direct Hire/Contract/Full-time], location, work_mode, salary_range, summary, description, requirements[]); publish/unpublish toggle, edit, delete. This is the "notice board" admins post to.
- **Applications** — table (name, role, email, LinkedIn, date, status); row → detail drawer; status dropdown (new/reviewing/contacted/closed); mailto link.
- **Messages** — contact submissions; mark read/unread; mailto link.
All admin writes via Server Actions using the authenticated server client (RLS enforces admin).

## 7. Keep-alive (Supabase anti-pause)

- `src/app/api/keep-alive/route.ts` — checks `Authorization: Bearer ${CRON_SECRET}`, runs `supabase.from('jobs').select('id').limit(1)`, returns 200. (A real DB read resets the 7-day timer.)
- `vercel.json`:
  ```json
  { "crons": [ { "path": "/api/keep-alive", "schedule": "0 6 * * *" } ] }
  ```
  (Hobby allows one daily cron — sufficient.) If not on Vercel, add an equivalent GitHub Action hitting the route daily.

## 8. SEO / metadata / polish

- Per-page `metadata` (title template `%s · Qualrec Solutions`, descriptions, OpenGraph + Twitter, `metadataBase` = `NEXT_PUBLIC_SITE_URL`).
- `app/sitemap.ts` + `app/robots.ts`. JSON-LD `Organization` + `WebSite` in root layout (name, url, logo, sameAs LinkedIn/Facebook, contactPoint for both phones).
- Favicon + `og/og-default.png` (branded).
- `next/image` for all images; `next/font` for the two fonts (no CLS).

## 9. Deployment

**Primary: Vercel.** Push to GitHub → import → add env vars → deploy. Use a temp `*.vercel.app` URL now; point the Hostinger domain later (add A/CNAME per Vercel). 
- Vercel **Hobby is fine for the temp/dev build**; switch to **Pro ($20/mo)** at real-domain commercial launch (their call — the client can cover it).
**Alternative: Netlify** (`@netlify/plugin-nextjs`) — also free, also supports Next.js SSR + the cron via Scheduled Functions.
**Cloudflare Pages** works too but needs the `@opennextjs/cloudflare` adapter — more setup; skip for the deadline unless asked.

Supabase Free is commercial-OK; just keep the keep-alive cron running.

---

## 10. Build phases (do in order; `pnpm build` after each)

**Phase 0 — Scaffold.** `create-next-app` (TS, App Router, Tailwind, ESLint, src/, pnpm). Install deps. Set up `next/font`, design tokens in `globals.css` `@theme`/`:root`, `cn` util, `Container`/`Button`/`Card`/`SectionHeading`/`Reveal`/`Counter` primitives. Build Navbar + Footer + the pipeline signature component. Add `.env.example`.

**Phase 1 — Content layer.** Create all `src/lib/content/*.ts` with the exact values in §2. Typed.

**Phase 2 — Marketing pages (static).** Home → About → Services → Industries → Case Studies → Contact (form UI only) → Privacy → Terms → 404. Fully responsive + animated + accessible. (Careers list comes in Phase 4.)

**Phase 3 — Supabase + auth.** Wire `@supabase/ssr` clients + middleware. Run schema. Build `/admin/login`, `/admin/enroll-2fa`, guarded dashboard shell. Verify 2FA gate end-to-end.

**Phase 4 — Dynamic data + forms.** Careers page reads published jobs (+ empty state). ApplyForm + ContactForm → Server Actions → Supabase insert + Resend email + success/error states + honeypot. Admin Jobs CRUD, Applications, Messages.

**Phase 5 — Keep-alive, SEO, polish.** Cron + route, metadata/sitemap/robots/JSON-LD, OG image, favicon. Lighthouse pass (mobile ≥90/100/95). Fix CLS, focus states, reduced-motion. Final `pnpm build`.

**Phase 6 — Deploy.** GitHub → Vercel, env vars, temp URL. Smoke test every form + admin login on the deployed URL. Hand over.

## 11. Acceptance criteria (mirror of CLAUDE.md "done")

9 pages live with real content · forms validate + store + email + show states + honeypot · Careers shows only published jobs with a written empty state · 2FA-gated admin with full jobs CRUD + applications + messages · keep-alive cron · Lighthouse mobile ≥90/100/95, no CLS, visible focus, reduced-motion respected · `pnpm build` zero errors · deploys clean.

## 12. Action items for you (outside the code)

1. Drop the 4 leadership photos into `public/team/` as `avinash.jpg`, `anubhav.jpg`, `nitish.jpg`, `hitanshu.jpg`, and the logo into `public/logo/qualrec-logo.svg`.
2. Create the Supabase project, run `supabase-schema.sql`, create the admin auth user, insert the `admins` row.
3. Pick the email path (Resend + Hostinger DNS, or Gmail SMTP app-password now) and fill `.env.local`.
4. **Replace placeholder testimonials/case studies/industry numbers with real ones before pointing the production domain.**
5. Tell Avinash: free-tier now is fine; budget **$20/mo Vercel Pro** (or stay on Netlify free) when the real domain goes commercial.
