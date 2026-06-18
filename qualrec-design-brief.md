# Qualrec Solutions — UI Design Brief / Design Prompt

*Use this as the design source-of-truth. It can be pasted into a design tool, or
followed directly when building components. Every color and type decision below
is intentional for this brief — don't substitute generic defaults.*

---

## The subject (design from this, not from a template)

Qualrec Solutions connects **skilled tech talent to enterprises across borders**.
The characteristic thing in its world is the *match* and the *pipeline*: a
requirement comes in from an MNC, a recruiter sources and vets candidates
(mostly from India), and the flagship **Contract-to-Hire** model lets the client
try before they commit. The site's single job: **make a Fortune-500 buyer or a
strong candidate trust this firm within 5 seconds and reach out.**

This is a rebuild that should read as *"their existing site, leveled up to a
firm three times its size"* — same blue identity, dramatically higher craft.
Keep it corporate-trustworthy (this is enterprise B2B), but escape the
gradient-hero + 4-stat-grid template the current build lands on.

## Direction in one line

**Engineered, confident, and quiet** — deep-navy authority, a single disciplined
blue→teal accent, generous whitespace, and one signature motif (a talent→placement
pipeline) that no competitor's site is using.

---

## 1. Color (4–6 named values + roles)

```
Ink         #0F172A   headings, max-contrast text
Body        #475569   paragraphs
Muted       #64748B   captions, meta
Hairline    #E2E8F0   1px borders, dividers
Surface     #FFFFFF   default background
Surface-2   #F8FAFC   alternating section bands
Tint        #EFF6FF   icon chips, soft highlight fills
Brand       #1D4ED8   primary buttons, links, active nav
Brand-bright#2563EB   hover, focus ring
Brand-ink   #0B1F4D   footer + hero base, deep authority
Accent      #0E7490   teal — gradient edge & rare highlight ONLY
Success     #10B981   checkmarks, "published", positive states
```

**Gradient (used on hero band, CTA band, footer top edge only):**
`linear-gradient(120deg, #0B1F4D 0%, #1D4ED8 55%, #0E7490 120%)`

Rules: 90% of every page is white / Surface-2 / Ink type. Brand blue is for
*action*, not decoration. Teal appears only in the gradient's far corner and in
one or two precise highlights. Never tint large surfaces.

## 2. Typography

- **Display — Plus Jakarta Sans** (700/800). Tight tracking on large sizes
  (`-0.02em`). Used for h1–h3 and stat numbers. Premium, modern, slightly
  geometric — confident without shouting.
- **Body — Inter** (400/500/600). Comfortable reading at 16–18px, `line-height:1.6`.
- **Eyebrow/label — Inter** uppercase, `letter-spacing:.14em`, 12–13px, weight 600,
  color Brand. Sits above section headings.

**Type scale (desktop / mobile):**
```
Hero h1   60 / 38   weight 800, lh 1.05, tracking -0.02em
h2        40 / 30   weight 700, lh 1.15
h3        22 / 20   weight 700
Lead      20 / 18   Body color, lh 1.55
Body      17 / 16
Small     14
Eyebrow   13 / 12
Stat num  48 / 36   Display 800, Brand color
```
Make the type the personality — confident headings + airy body. Don't decorate
with the type; let weight and spacing do the work.

## 3. Shape, depth, spacing

```
Card radius     16px      Button radius 10px      Chip/badge radius full
Border          1px Hairline (cards use border + soft shadow, not heavy shadow)
Shadow-sm       0 1px 2px rgba(15,23,42,.06)
Shadow-md       0 10px 30px -12px rgba(15,23,42,.18)   (hover/elevated only)
Container       max-width 1200px, 24px gutters (16px on mobile)
Section rhythm  py 96px desktop / 56px mobile; 80px between major blocks
Grid gap        24px (cards), 16px (compact)
```
Maximalism is wrong here. Precision in spacing and alignment *is* the premium feel.

## 4. The signature element

**A horizontal "pipeline" device** representing the Contract-to-Hire flow:

`Requirement → Sourced → Vetted → Placed → Converted`

Render it as a thin connecting line with 5 small nodes, each node a tiny blue
dot that fills/pulses subtly. Appears:
- in the **hero** as the supporting visual (instead of stock photos),
- as a quiet **section divider** between major blocks (just the line + nodes, very low contrast),
- animated once on scroll-into-view: the line draws left→right, nodes light up in sequence.

This is the one bold thing. Everything else stays disciplined. It encodes
something true (their actual process), so it's structure, not decoration.

## 5. Component styling

- **Buttons** — Primary: solid Brand, white text, radius 10, weight 600; hover →
  Brand-bright + arrow nudges 2px right; focus → 2px Brand-bright ring + offset.
  Secondary: white, 1px Hairline, Ink text; hover → Tint fill. Ghost on dark
  bands: white border, transparent, hover white-10% fill.
- **Cards** — white, 1px Hairline, radius 16, Shadow-sm; hover → translateY(-2px)
  + Shadow-md + border goes Brand-15%. Icon chip top-left: 44px rounded-12 Tint
  square, Brand lucide icon.
- **Navbar** — sticky, white, 1px bottom Hairline on scroll, subtle blur.
  Logo left; centered/leading links (Home, About▾, Services▾, Industries▾, Case
  Studies, Careers, Contact); right: a single **"Get Started"** primary button
  → /contact. Dropdowns: soft card, Shadow-md, 8px radius, hover row → Tint.
  Mobile: full-screen sheet, large tap targets, animated hamburger.
- **Footer** — Brand-ink background, top edge a 2px gradient line. Logo + one-line
  positioning sentence + LinkedIn/Facebook. Columns: Services · Company ·
  Contact (email, USA phone, India phone, St. Petersburg). Bottom row: © 2026
  Qualrec Solutions · Privacy · Terms. Light text on navy, ≥4.5:1 contrast.
- **Stat strip** — thin white band, 4 stats, Display numbers animate-count on
  view, tracked-uppercase labels under. *Supporting element, never the hero's main act.*
- **Forms** — labels above inputs (sentence case), 1px Hairline inputs radius 10,
  focus → Brand ring; clear inline validation in the interface's voice
  ("Enter a valid email," not "Error"); button says the action ("Send message",
  "Submit application") and the success toast matches ("Message sent").

## 6. Motion (smooth, never laggy)

- Engine: Framer Motion. Animate **only** `opacity` + `transform`.
- **Page load (hero):** stagger eyebrow → h1 → lead → CTAs → pipeline, 60ms apart, fade-up 16px, 0.5s `ease-out`.
- **Scroll reveal:** elements fade-up 16px once when 15% in view; stagger grids 60ms; `viewport={{ once: true }}`.
- **Counters:** run once on view, ~1.2s ease-out.
- **Hover micro-interactions:** card lift, button arrow nudge, nav underline grow.
- **Reduced motion:** `prefers-reduced-motion` → no transforms, no counters (show final value), instant reveals. Build this from the start.
- Keep it sparse. If a motion doesn't help comprehension or delight, cut it. Over-animation reads as AI-generated and as "laggy."

## 7. Accessibility / quality floor

Responsive 360→1440px+. Visible keyboard focus on every interactive element.
All text ≥ 4.5:1 (≥3:1 large). Alt text on team/logo images. Forms fully
keyboard + screen-reader operable with associated labels. No CLS from font swap
(`next/font`) or images (sized). Motion respected.

---

## 8. Page-by-page layout

### Home
1. **Hero** (gradient band, Brand-ink base): eyebrow "IT TALENT & SOLUTIONS" · h1
   "Talent that fits. Hires that stick." · lead (1–2 sentences on contract-to-hire +
   global sourcing) · primary "Get Started" + ghost "Explore Services" · the
   **pipeline signature** animating to the right of/below the copy. No stock photo.
2. **Stat strip** (white): 500+ Projects · 98% Client Satisfaction · 1000+ Expert Consultants · 50+ Fortune 500 Clients.
3. **Services overview** (Surface-2): eyebrow + h2 "How we place talent" → 5 cards,
   Contract-to-Hire visibly featured (badge "Flagship" / larger card). Each card: icon, title, 1-line, "Learn more →".
4. **Why Qualrec** (white): split — left h2 + 5–6 checkmark points (Success ticks); right a clean supporting graphic or the pipeline echoed.
5. **Areas of expertise** (Surface-2): condensed grid of the 10 talent domains as chips/mini-cards → "See all expertise →".
6. **Testimonials** (Brand-ink band): 3 cards, 5 stars, quote, name + title. *(placeholder — flag in code.)*
7. **CTA band** (gradient): "Ready to build your team?" + "Get Started" + "View our work".
8. Footer.

### About
- Page hero (gradient, compact): "About Qualrec Solutions" + the founding sentence.
- **Mission / Vision** — two cards (target icon / heart icon).
- **Core values** — Excellence, Collaboration, Integrity, Innovation (4 cards).
- **Leadership team** — 4 cards with photos (`/public/team/*.jpg`), name, role, bio, LinkedIn + mail icons. Avinash Singh gets a subtle "founder" accent.
- **Our Journey** — vertical alternating **timeline** (2015 → 2026), the one place numbered/dated markers are *earned* because it's a real chronology. Use the pipeline-line aesthetic for the spine.
- CTA band + footer.

### Services
- Hero: "Our Services" + lead.
- **Staffing models** — 5 detailed blocks: Contract-to-Hire (flagship, lead + most detail), Direct Hire, Contract Staffing / Staff Augmentation, RPO, Payroll / EOR.
- **Areas of expertise** — the full 10 domains, each an expandable card listing its skills (the long skill lists).
- **IT solutions** (secondary) — Application Development, Cloud, Data & AI, Cybersecurity, Project Consulting (5 cards).
- "Why work with us" 3-up (Expert team / Proven results / Scalable) + CTA band.

### Industries
- Hero: "Industry expertise."
- 5 vertical cards (image header + content): Healthcare, Financial Services, Manufacturing, Retail & E-commerce, Government & Public Sector. Each: blurb, 3 stat chips, key specializations (pills), "challenges we solve" two-column. *(stats are illustrative placeholders — flag.)*
- "Why our industry expertise" 3-up + impact stat band + CTA.

### Case Studies
- Hero: "Success stories" + 4 top stats.
- 6 case-study cards (alternating image/text): Regional Hospital EHR, Community Bank Digital, Smart Manufacturing, E-commerce Platform Overhaul, State Agency Portal, FinTech Cybersecurity. Each: tag, challenge, solution, results (Success ticks), tech pills, a quote. *(placeholder content — flag.)*
- "Industries we serve" mini-row + CTA.

### Careers (dynamic — the notice board)
- Hero: "Join our team" + careers stats (1000+ Team · 95% Satisfaction · 4.8/5 Glassdoor · 2.5y Avg Tenure).
- **Open positions** — cards from Supabase (`is_published=true`): title, type badge, category, location, salary range, "key requirements", **"Apply now →"** opens the ApplyForm (name, email, phone, LinkedIn URL, current role, message; resume upload off by default). **Empty state when no jobs:** "No open roles right now — send your profile to career@qualrecsol.com and we'll reach out when something fits." + a "Submit your profile" button (general application form).
- **Why work with us** 6-up (Health & Wellness, Competitive Comp, Work-Life Balance, Professional Growth, Team Culture, Innovation Focus).
- Culture & values band + "Life at Qualrec" 3 photos + CTA.

### Contact
- Hero: "Contact us" + lead.
- Split: left **ContactForm** (Full name, Email, Company, Phone, Service of interest [select], Message → "Send message"); right **Get in touch** cards: Email, Call USA, Call India, Visit (St. Petersburg), Business hours.
- **Our offices** — 3 cards: St. Petersburg FL, Tampa FL, India (multiple locations).
- **Find us** — embedded Google map of the St. Petersburg HQ (iframe).
- Footer.

### Privacy / Terms
- Simple, readable single-column legal templates (generate sensible boilerplate for a US staffing firm; mark "review with counsel").

### 404
- Branded, calm: "This page isn't here." + link home + a faint pipeline graphic. Not a dead end.

---

## 9. Copy voice

Plain, confident, specific. Active voice. Sentence case for UI. No filler, no
"leverage synergies." Buttons name the action and keep that name through the
flow. Empty states and errors give direction in the interface's voice, never an
apology. Sell with specifics ("try-before-you-hire placements that de-risk every
hire"), not adjectives.

**Tagline:** keep **"We Deliver Quality"** as the endorsement line under the logo.
For the hero, recommended primary: **"Talent that fits. Hires that stick."**
Alternates: "The right people, placed precisely." · "Global talent, delivered." ·
"Contract-to-hire, done right."
