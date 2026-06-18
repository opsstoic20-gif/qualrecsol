// Global Workforce content — live country guides + roadmap markets.

export type LiveMarket = {
  slug: string;
  code: string;
  name: string;
  flag: string;
  tagline: string;
  timezone: string;
  savings: string;
  payroll: string;
  photo: string;
};

export const LIVE_MARKETS: LiveMarket[] = [
  {
    slug: "usa",
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    tagline: "Domestic US staffing — place vetted talent into US MNCs and growing teams.",
    timezone: "ET–PT",
    savings: "Market rate",
    payroll: "Bi-weekly",
    photo: "/countries/usa.webp",
  },
  {
    slug: "india",
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    tagline: "Hire elite engineering talent in India.",
    timezone: "IST",
    savings: "50–60%",
    payroll: "Monthly",
    photo: "/countries/india.webp",
  },
  {
    slug: "mexico",
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    tagline: "Nearshore hiring in Mexico, full timezone overlap.",
    timezone: "CST",
    savings: "40–50%",
    payroll: "Semi-monthly",
    photo: "/countries/mexico.webp",
  },
];

export const OPENING_MARKETS = [
  { quarter: "Q2 2026", flag: "🇨🇦", label: "Canada · Vancouver" },
  { quarter: "Q2 2026", flag: "🇲🇽", label: "Mexico · Mexico City" },
  { quarter: "Q3 2026", flag: "🇧🇷", label: "Brazil · São Paulo" },
  { quarter: "Q3 2026", flag: "🇦🇷", label: "Argentina · Buenos Aires" },
];

// Physical offices / delivery hubs — surfaced on the Global page and home network panel.
export const OFFICES = [
  { flag: "🇺🇸", city: "Florida, USA", region: "United States", note: "Headquarters — St. Petersburg & Tampa" },
  { flag: "🇮🇳", city: "Jaspur, Uttarakhand", region: "India", note: "Delivery & talent hub" },
  { flag: "🇮🇳", city: "Banjara Hills, Hyderabad", region: "India", note: "Engineering & QA center" },
  { flag: "🇲🇽", city: "Mérida, Yucatán", region: "Mexico", note: "Nearshore entity" },
];

export type CountryGuide = {
  slug: string;
  name: string;
  flag: string;
  photo: string;
  lead: string;
  landscape: { label: string; value: string; sub?: string }[];
  overview: { body: string; bullets: string[]; talents: string[] };
  law: { intro: string; items: { h: string; p: string }[] };
  holidays: { count: string; list: { when: string; name: string }[] };
  benefits: { title: string; body: string }[];
  facts: [string, string][];
};

export const COUNTRIES: Record<string, CountryGuide> = {
  usa: {
    slug: "usa",
    name: "the United States",
    flag: "🇺🇸",
    photo: "/countries/usa.webp",
    lead: "We staff US enterprises domestically — placing vetted talent into US MNCs and growing teams, US-to-US. QualRec handles W-2, contract, and corp-to-corp engagements with compliant onboarding from our Florida headquarters.",
    landscape: [
      { label: "Engagement", value: "W-2 · C2C · 1099" },
      { label: "Timezone", value: "ET–PT", sub: "UTC−5 to −8" },
      { label: "Capital", value: "Washington, D.C." },
      { label: "Currency", value: "US Dollar (USD)" },
      { label: "Payroll", value: "Bi-weekly" },
      { label: "Team", value: "St. Petersburg · Tampa, FL" },
    ],
    overview: {
      body: "Most of our work is domestic: sourcing US-based professionals and placing them into US MNCs and growing companies. We employ on W-2, run corp-to-corp with vendor partners, and place direct-hire — all under US federal and state law, with E-Verify onboarding handled end to end.",
      bullets: [
        "Headquartered in St. Petersburg & Tampa, Florida",
        "US-to-US placement into Fortune 500 and mid-market teams",
        "W-2, corp-to-corp, and direct-hire engagement models",
        "Nationwide reach across all 50 states",
      ],
      talents: ["Software engineering", "Cloud & DevOps", "Cybersecurity", "Data & AI", "Product & program management", "ERP & Salesforce"],
    },
    law: {
      intro: "US employment is governed by overlapping federal and state law, and is employment-at-will in every state except Montana. We staff nationwide and stay current on each state's wage, tax, and leave rules.",
      items: [
        { h: "Minimum Wage", p: "Federal minimum is $7.25/hour, but many states and cities set higher floors (e.g. CA, WA, NY $16+). For technology roles we benchmark to market — well above any statutory minimum." },
        { h: "Payroll Cycle", p: "Most commonly bi-weekly or semi-monthly. Each check withholds federal income tax, Social Security and Medicare (FICA), and applicable state/local income tax." },
        { h: "Onboarding", p: "Typically 1–5 business days. We complete Form I-9 employment eligibility, Form W-4 withholding, E-Verify, and state new-hire reporting. Foreign nationals require work authorization (H-1B, OPT, green card) which we coordinate." },
        { h: "Types of Leave", p: "No federal paid-leave mandate. FMLA provides 12 weeks of unpaid, job-protected leave at employers with 50+ staff. Market-standard packages include 10–20 days PTO plus sick leave; several states mandate paid sick time." },
        { h: "Termination & Notice", p: "Employment is at-will — either party may end it without cause, absent a contract. No statutory severance federally; the WARN Act requires 60 days' notice for qualifying mass layoffs at large employers." },
        { h: "Remote & Telework", p: "No single federal telework law. Remote hires create tax and registration nexus in the employee's state; we manage multi-state payroll, registration, and equipment stipends." },
      ],
    },
    holidays: {
      count: "11 federal holidays",
      list: [
        { when: "Jan 1", name: "New Year's Day" },
        { when: "Jan", name: "Martin Luther King Jr. Day" },
        { when: "Feb", name: "Presidents' Day" },
        { when: "May", name: "Memorial Day" },
        { when: "Jun 19", name: "Juneteenth" },
        { when: "Jul 4", name: "Independence Day" },
        { when: "Sep", name: "Labor Day" },
        { when: "Nov", name: "Veterans & Thanksgiving" },
        { when: "Dec 25", name: "Christmas Day" },
      ],
    },
    benefits: [
      { title: "Health Insurance", body: "ACA-compliant employer medical, with PPO/HMO plan options." },
      { title: "401(k) Retirement", body: "Tax-advantaged 401(k) with a standard employer match." },
      { title: "Dental & Vision", body: "Supplemental dental and vision coverage for employee and family." },
      { title: "Paid Time Off", body: "Market-standard PTO, paid holidays, and sick leave." },
      { title: "Life & Disability", body: "Group life plus short- and long-term disability cover." },
      { title: "FSA / HSA", body: "Pre-tax flexible spending and health savings accounts." },
    ],
    facts: [
      ["Capital", "Washington, D.C."],
      ["Currency", "US Dollar"],
      ["Languages", "English"],
      ["Population", "335 million"],
      ["Payroll frequency", "Bi-weekly"],
      ["Income tax range", "10% – 37%"],
      ["Working hours", "40 hrs/week (OT >40)"],
      ["Employment basis", "At-will"],
    ],
  },

  india: {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    photo: "/countries/india.webp",
    lead: "Hire elite engineering talent in India with QualRec as your employer of record — a hire-ready entity, statutory benefits, and full compliance from day one.",
    landscape: [
      { label: "Cost savings", value: "50–60%", sub: "vs. equivalent US roles" },
      { label: "Timezone", value: "IST", sub: "UTC+5:30" },
      { label: "Capital", value: "New Delhi" },
      { label: "Currency", value: "Indian Rupee (INR)" },
      { label: "Payroll", value: "Monthly" },
      { label: "Team", value: "Noida · Hyderabad · Jaspur" },
    ],
    overview: {
      body: "Companies hiring in India typically need either a local legal entity or a workforce partner that can legally employ on their behalf. QualRec already operates in-country — established entity since 2020, not a third-party EOR markup.",
      bullets: [
        "Established entity since 2020 — not a third-party EOR markup",
        "Three offices: Noida, Hyderabad, Jaspur",
        "125+ consultants currently deployed",
        "Native HR & payroll team — no offshored helpdesk",
      ],
      talents: ["Software engineering", "QA & test automation", "Data engineering", "Cloud & DevOps", "AI / ML", "Customer success"],
    },
    law: {
      intro: "Indian labour falls under concurrent jurisdiction — both Central and State governments legislate on wages, social security, and industrial relations. We've operated entities in Noida, Hyderabad, and Jaspur since 2020 and stay current on every change.",
      items: [
        { h: "Minimum Wage", p: "Minimum wages vary by state and skill tier. For Area A (Delhi, Mumbai, Bangalore): unskilled ₹783/day (~₹20,358/month), semi-skilled ₹868/day, skilled ₹954/day, highly skilled ₹1,035/day. We benchmark all offers well above statutory minimums to attract senior engineering talent." },
        { h: "Payroll Cycle", p: "Monthly, paid on or before the last working day in arrears. Payslips include Provident Fund (12% employer + 12% employee), Professional Tax (state-specific), TDS, and ESI where applicable." },
        { h: "Onboarding", p: "Typically 7–14 days for Indian nationals once documentation is complete. We collect PAN, Aadhaar, UAN, education certificates, and prior employment proof. Foreign nationals need Right-to-Work and visa coordination — add ~3 weeks." },
        { h: "Types of Leave", p: "Earned/Privilege Leave 15–30 days/yr (accruable, encashable); Casual Leave 7–12 days; Sick Leave 7–14 days; Maternity 26 weeks paid; Paternity not statutory centrally — we offer 2 weeks as standard." },
        { h: "Termination & Notice", p: "Notice periods 30–90 days by seniority. Severance applies under the Industrial Disputes Act for non-managerial roles (15 days' wages per year of service). Proper documentation is essential." },
        { h: "Remote & Telework", p: "No dedicated telework law; the relevant state's Shops & Establishments Act applies. We provide laptops, internet stipends, and ergonomic allowances as standard for remote consultants." },
      ],
    },
    holidays: {
      count: "6 national holidays",
      list: [
        { when: "Jan 26", name: "Republic Day" },
        { when: "Aug 15", name: "Independence Day" },
        { when: "Oct 2", name: "Gandhi Jayanti" },
        { when: "Oct/Nov", name: "Diwali (regional)" },
        { when: "Mar", name: "Holi (regional)" },
        { when: "Dec 25", name: "Christmas (regional)" },
      ],
    },
    benefits: [
      { title: "Health Insurance", body: "Group medical with family floater, hospitalization, and maternity coverage." },
      { title: "Provident Fund", body: "EPF contributions (12% employer + 12% employee) under EPFO." },
      { title: "Gratuity", body: "Statutory gratuity payable at separation (after 5 years' service)." },
      { title: "Life & Accident Insurance", body: "Group life cover and personal accident insurance." },
      { title: "Mental Wellness", body: "EAP access, counselling, and mental health benefits." },
      { title: "13th Month", body: "Performance-linked annual bonus, standard in our packages." },
    ],
    facts: [
      ["Capital", "New Delhi"],
      ["Currency", "Indian Rupee"],
      ["Languages", "English, Hindi, 22 regional"],
      ["Population", "1.43 billion"],
      ["Payroll frequency", "Monthly"],
      ["Income tax range", "0% – 30%"],
      ["Working hours", "48 hrs/week max"],
      ["Notice period", "30–90 days"],
    ],
  },

  mexico: {
    slug: "mexico",
    name: "Mexico",
    flag: "🇲🇽",
    photo: "/countries/mexico.webp",
    lead: "Mexico is the fastest-growing nearshore market for US companies — same business hours, strong bilingual talent, and 40–50% cost savings without opening your own entity.",
    landscape: [
      { label: "Cost savings", value: "40–50%", sub: "vs. equivalent US roles" },
      { label: "Timezone", value: "CST", sub: "UTC−6" },
      { label: "Capital", value: "Mexico City" },
      { label: "Currency", value: "Mexican Peso (MXN)" },
      { label: "Payroll", value: "Semi-monthly" },
      { label: "Team", value: "Mérida + Mexico City" },
    ],
    overview: {
      body: "Companies hiring in Mexico typically need either a local legal entity or a workforce partner that can legally employ on their behalf. QualRec employs through our local entity, LEMAIRE COQUET S.A. DE C.V., based in Mérida, Yucatán.",
      bullets: [
        "Established Mexican entity (LEMAIRE COQUET S.A. DE C.V.)",
        "Office in Mérida, Yucatán — expanding to Mexico City Q2 2026",
        "Full LFT and NOM-037 compliance built in",
        "Same-timezone delivery for North American clients",
      ],
      talents: ["Nearshore engineering", "Bilingual customer success", "Sales operations", "QA & support", "Finance & accounting", "Product design"],
    },
    law: {
      intro: "Mexican employment law is governed by the Constitution and the Federal Labour Law (Ley Federal del Trabajo / LFT). Labour rights are inalienable and apply regardless of contract jurisdiction. We employ through our local entity in Mérida, Yucatán.",
      items: [
        { h: "Minimum Wage", p: "MXN 315.04/day general, MXN 440.87/day in the Northern Border Free Zone (ZLFN), effective January 2026. We benchmark engineering offers well above minimum to compete with US-based remote roles." },
        { h: "Payroll Cycle", p: "Semi-monthly — paid on the 15th and 30th. Each payslip includes IMSS social security, INFONAVIT housing, ISR income tax withholding, and SAR retirement contributions." },
        { h: "Onboarding", p: "Typically 5–10 business days for Mexican nationals. We collect CURP, RFC, NSS, proof of address, and ID. Foreign nationals add ~2–3 weeks; Mexico caps foreign nationals at 10% of any company's workforce." },
        { h: "Types of Leave", p: "Vacation 12 days after 1 year (rising to 20 by year 6); Vacation Premium 25%; Aguinaldo (13th month) min 15 days by Dec 20; Maternity 12 weeks; Paternity 5 days; PTU profit sharing 10% of taxable profits." },
        { h: "Termination & Severance", p: "Law strongly favours the employee. Unjustified termination triggers 3 months' salary + 20 days' salary per year of service + seniority premium + proportional aguinaldo and vacation. We handle the legal process end-to-end." },
        { h: "Remote & Telework (NOM-037)", p: "The 2023 telework law requires employers to provide ergonomic equipment and cover proportional electricity and internet. We bundle compliance into every remote engagement — laptop, chair, stipends, and a prevention health partnership." },
      ],
    },
    holidays: {
      count: "7 national holidays",
      list: [
        { when: "Jan 1", name: "Año Nuevo" },
        { when: "Feb 2", name: "Día de la Constitución" },
        { when: "Mar 16", name: "Natalicio de Benito Juárez" },
        { when: "May 1", name: "Día del Trabajo" },
        { when: "Sep 16", name: "Día de la Independencia" },
        { when: "Nov 16", name: "Día de la Revolución" },
        { when: "Dec 25", name: "Navidad" },
      ],
    },
    benefits: [
      { title: "IMSS Social Security", body: "Full social security registration — healthcare, disability, retirement." },
      { title: "INFONAVIT Housing", body: "Employer contribution toward the employee housing fund (5% of salary)." },
      { title: "Aguinaldo", body: "Statutory 15-day Christmas bonus paid by December 20." },
      { title: "Vacation Premium", body: "25% bonus on vacation days, paid annually." },
      { title: "PTU Profit Sharing", body: "10% of company taxable profits distributed to employees." },
      { title: "Private Health Top-up", body: "Supplemental private health insurance above IMSS." },
    ],
    facts: [
      ["Capital", "Mexico City"],
      ["Currency", "Mexican Peso"],
      ["Languages", "Spanish, English"],
      ["Population", "128.6 million"],
      ["Payroll frequency", "Semi-monthly"],
      ["VAT (IVA)", "16%"],
      ["Working hours", "48 hrs/week max"],
      ["GDP growth", "~2.0%"],
    ],
  },
};
