-- ============================================================================
-- Qualrec Solutions — Supabase schema
-- Run this in the Supabase SQL Editor (Project → SQL → New query → Run).
-- Safe to run on a fresh project. Review before re-running on an existing one.
-- ============================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ---------- updated_at helper ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Jobs (the admin-managed "notice board")
create table if not exists public.jobs (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  category        text not null,                  -- e.g. 'Software Development & Engineering'
  employment_type text not null default 'Contract-to-Hire',
                                                  -- 'Contract-to-Hire' | 'Direct Hire' | 'Contract' | 'Full-time'
  location        text not null default 'Remote',
  work_mode       text,                           -- 'Remote' | 'Hybrid' | 'Onsite'
  salary_range    text,
  summary         text,
  description     text,
  requirements    text[] not null default '{}',
  is_published    boolean not null default false,
  posted_at       timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists jobs_published_idx on public.jobs (is_published, posted_at desc);
drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at before update on public.jobs
  for each row execute function public.set_updated_at();

-- Applications (from the Apply form; resume_url optional/off by default)
create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  job_id        uuid references public.jobs(id) on delete set null,
  job_title     text,                             -- snapshot at apply time
  full_name     text not null,
  email         text not null,
  phone         text,
  linkedin_url  text,
  current_role  text,
  message       text,
  resume_url    text,
  status        text not null default 'new',      -- 'new' | 'reviewing' | 'contacted' | 'closed'
  created_at    timestamptz not null default now()
);
create index if not exists applications_created_idx on public.applications (created_at desc);

-- Contact submissions (from the Contact form)
create table if not exists public.contact_submissions (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  email            text not null,
  company          text,
  phone            text,
  service_interest text,
  message          text not null,
  is_read          boolean not null default false,
  created_at       timestamptz not null default now()
);
create index if not exists contact_created_idx on public.contact_submissions (created_at desc);

-- Admin allowlist: which auth.users are admins
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- is_admin() — true when the current request's user is in public.admins
-- SECURITY DEFINER so policies can call it without recursive RLS issues.
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.jobs                enable row level security;
alter table public.applications        enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.admins              enable row level security;

-- JOBS: public reads only published; admins do everything
drop policy if exists jobs_public_read_published on public.jobs;
create policy jobs_public_read_published on public.jobs
  for select to anon, authenticated
  using (is_published = true);

drop policy if exists jobs_admin_all on public.jobs;
create policy jobs_admin_all on public.jobs
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- APPLICATIONS: anyone may insert; only admins read/update
drop policy if exists applications_public_insert on public.applications;
create policy applications_public_insert on public.applications
  for insert to anon, authenticated
  with check (true);

drop policy if exists applications_admin_read on public.applications;
create policy applications_admin_read on public.applications
  for select to authenticated using (public.is_admin());

drop policy if exists applications_admin_update on public.applications;
create policy applications_admin_update on public.applications
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists applications_admin_delete on public.applications;
create policy applications_admin_delete on public.applications
  for delete to authenticated using (public.is_admin());

-- CONTACT: anyone may insert; only admins read/update
drop policy if exists contact_public_insert on public.contact_submissions;
create policy contact_public_insert on public.contact_submissions
  for insert to anon, authenticated
  with check (true);

drop policy if exists contact_admin_read on public.contact_submissions;
create policy contact_admin_read on public.contact_submissions
  for select to authenticated using (public.is_admin());

drop policy if exists contact_admin_update on public.contact_submissions;
create policy contact_admin_update on public.contact_submissions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists contact_admin_delete on public.contact_submissions;
create policy contact_admin_delete on public.contact_submissions
  for delete to authenticated using (public.is_admin());

-- ADMINS: only admins can read the allowlist; no public access
drop policy if exists admins_read on public.admins;
create policy admins_read on public.admins
  for select to authenticated using (public.is_admin());

-- ============================================================================
-- OPTIONAL: resume uploads (only if you turn the upload field on)
-- Create a private bucket 'resumes'; uploads via the apply Server Action with
-- the service-role key. Public cannot read; admins fetch via signed URLs.
-- (Create the bucket in Storage UI, or uncomment:)
-- insert into storage.buckets (id, name, public) values ('resumes','resumes', false)
--   on conflict (id) do nothing;

-- ============================================================================
-- GRANT ADMIN (run AFTER creating the admin user in Auth → Users)
-- 1) Auth → Users → Add user (email + password) for Avinash.
-- 2) Copy that user's UUID, then:
--    insert into public.admins (user_id, email)
--    values ('00000000-0000-0000-0000-000000000000', 'info@qualrecsol.com');
-- 3) First admin login enrolls TOTP 2FA in the app.
-- ============================================================================

-- ============================================================================
-- SAMPLE JOBS (optional seed so the Careers page isn't empty on first load)
-- ============================================================================
insert into public.jobs (title, category, employment_type, location, work_mode, salary_range, summary, requirements, is_published)
values
('Senior Full-Stack Developer', 'Software Development & Engineering', 'Contract-to-Hire', 'Remote (US)', 'Remote', '$120k – $150k',
 'Build and scale applications for an enterprise client. Contract-to-hire with a clear path to full-time.',
 array['5+ years React / Node.js','Cloud experience (AWS or Azure)','Strong problem-solving and communication'], true),
('Cloud Solutions Architect', 'Cloud Computing & Infrastructure', 'Direct Hire', 'St. Petersburg, FL / Hybrid', 'Hybrid', '$130k – $160k',
 'Design and implement cloud architectures for enterprise digital transformation programs.',
 array['AWS/Azure architect certification','8+ years cloud experience','Enterprise architecture background'], true),
('Technical Recruiter', 'Specialized Functional IT Roles', 'Full-time', 'Remote (India)', 'Remote', 'Competitive',
 'Source and place top IT talent for our staffing and contract-to-hire engagements.',
 array['3+ years technical recruiting','Understanding of IT roles and stacks','Strong networking and outreach skills'], true)
on conflict do nothing;

-- Done.
