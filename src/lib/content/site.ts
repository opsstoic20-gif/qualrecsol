// Canonical site-wide facts (positioning, contact, social). Single source of truth.
export const SITE = {
  name: "Qualrec Solutions",
  tagline: "We Deliver Quality.",
  heroHeadline: "Talent that fits. Hires that stick.",
  positioning:
    "Contract-to-hire and direct placement of vetted tech talent, sourced globally for enterprises across the United States.",
  founded: "2019",
  email: "info@qualrecsol.com",
  careersEmail: "career@qualrecsol.com",
  phoneUsa: "+1 305-340-6376",
  phoneIndia: "+91 945-894-0341",
  hqAddress: "7901 4th St N Ste 4138, St. Petersburg, FL 33702",
  hours: "Mon–Fri 9:00 AM – 6:00 PM EST/IST",
  social: {
    // PLACEHOLDER — replace with verified profile URLs before real-domain launch.
    linkedin: "https://www.linkedin.com/company/qualrec-solutions",
    facebook: "https://www.facebook.com/qualrecsolutions",
  },
  offices: [
    { city: "St. Petersburg, FL", lines: ["7901 4th St N Ste 4138", "St. Petersburg, FL 33702", "+1 305-340-6376"] },
    { city: "India", lines: ["Multiple locations across India", "+91 945-894-0341", "info@qualrecsol.com"] },
  ],
  // Service options reused by the contact form select + admin job categories.
  serviceOptions: [
    "Contract-to-Hire",
    "Direct Hire",
    "Staff Augmentation",
    "RPO",
    "Payroll / EOR",
    "IT Solutions",
  ],
} as const;

export const EXPERTISE_CATEGORIES = [
  "Software Development & Engineering",
  "Cloud Computing & Infrastructure",
  "Cybersecurity",
  "Data, Analytics & AI",
  "Enterprise Applications",
  "Emerging Technologies",
  "Networking & IT Infrastructure",
  "Product & Project Management",
  "Quality Assurance & Testing",
  "Specialized Functional IT Roles",
] as const;

export const EMPLOYMENT_TYPES = [
  "Contract-to-Hire",
  "Direct Hire",
  "Contract",
  "Full-time",
] as const;
