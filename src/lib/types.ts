export type Job = {
  id: string;
  title: string;
  category: string;
  employment_type: string;
  location: string;
  work_mode: string | null;
  salary_range: string | null;
  summary: string | null;
  description: string | null;
  requirements: string[];
  is_published: boolean;
  posted_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  job_id: string | null;
  job_title: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  current_role: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service_interest: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};
