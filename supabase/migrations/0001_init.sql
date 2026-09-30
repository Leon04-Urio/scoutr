-- Scoutr — Phase 2 schema (build spec §11)
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query),
-- then run supabase/seed.sql.
--
-- Wrapped in a transaction and preceded by drops so it's safe to re-run from
-- scratch (e.g. after a partial failure) without hand-cleaning the database
-- first — everything here is pre-launch schema, never real client data.

begin;

drop table if exists tour_hotspots cascade;
drop table if exists tour_scenes cascade;
drop table if exists tours cascade;
drop table if exists dollhouses cascade;
drop table if exists floor_plans cascade;
drop table if exists project_images cascade;
drop table if exists testimonials cascade;
drop table if exists leads cascade;
drop table if exists pricing cascade;
drop table if exists services cascade;
drop table if exists projects cascade;
drop function if exists set_updated_at() cascade;

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  property_type text not null check (property_type in ('Residential', 'Commercial', 'Hospitality', 'Development')),
  summary text not null,
  description text not null default '',
  cover_image_url text,
  cover_gradient text,
  cover_label text,
  walkthrough_video_url text,
  featured boolean not null default false,
  published boolean not null default false,
  has_360 boolean not null default false,
  has_dollhouse boolean not null default false,
  has_floor_plan boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_set_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- project_images
-- ---------------------------------------------------------------------------
create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- testimonials (project_id null => general/homepage testimonial)
-- ---------------------------------------------------------------------------
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  quote text not null,
  name text not null,
  role text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- tours / tour_scenes / tour_hotspots (unused until Phase 3)
-- ---------------------------------------------------------------------------
create table tours (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  slug text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table tour_scenes (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references tours(id) on delete cascade,
  name text not null,
  panorama_url text not null,
  thumbnail_url text,
  initial_yaw double precision not null default 0,
  initial_pitch double precision not null default 0,
  initial_zoom double precision not null default 1,
  sort_order int not null default 0
);

create table tour_hotspots (
  id uuid primary key default gen_random_uuid(),
  scene_id uuid not null references tour_scenes(id) on delete cascade,
  target_scene_id uuid references tour_scenes(id) on delete set null,
  label text,
  yaw double precision not null,
  pitch double precision not null,
  type text not null default 'scene'
);

-- ---------------------------------------------------------------------------
-- floor_plans / dollhouses (unused until Phase 3)
-- ---------------------------------------------------------------------------
create table floor_plans (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  floor_number int not null default 0,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table dollhouses (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  model_url text not null,
  thumbnail_url text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- services / pricing (unused until they're migrated off lib/data/*)
-- ---------------------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text,
  sort_order int not null default 0
);

create table pricing (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  includes text[] not null default '{}',
  best_for text,
  featured boolean not null default false,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- leads (unused until Phase 4)
-- ---------------------------------------------------------------------------
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  property_type text,
  property_location text,
  message text,
  source text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table projects enable row level security;
alter table project_images enable row level security;
alter table testimonials enable row level security;
alter table tours enable row level security;
alter table tour_scenes enable row level security;
alter table tour_hotspots enable row level security;
alter table floor_plans enable row level security;
alter table dollhouses enable row level security;
alter table services enable row level security;
alter table pricing enable row level security;
alter table leads enable row level security;

-- projects: public sees only published rows; any authenticated user (the
-- app has no self-serve signup, so "authenticated" means the admin) has
-- full access. See build spec §23.
create policy "projects_public_read" on projects for select to public using (published = true);
create policy "projects_admin_all" on projects for all to authenticated using (true) with check (true);

-- project_images: readable when the parent project is published.
create policy "project_images_public_read" on project_images for select to public
  using (exists (select 1 from projects p where p.id = project_images.project_id and p.published = true));
create policy "project_images_admin_all" on project_images for all to authenticated using (true) with check (true);

-- testimonials: general testimonials (project_id is null) are always
-- readable; project testimonials follow the parent project's published flag.
create policy "testimonials_public_read" on testimonials for select to public
  using (
    project_id is null
    or exists (select 1 from projects p where p.id = testimonials.project_id and p.published = true)
  );
create policy "testimonials_admin_all" on testimonials for all to authenticated using (true) with check (true);

-- tours / tour_scenes / tour_hotspots: readable when the tour (and its
-- parent project) are published. No admin authoring UI yet (Phase 3).
create policy "tours_public_read" on tours for select to public
  using (published = true and exists (select 1 from projects p where p.id = tours.project_id and p.published = true));
create policy "tours_admin_all" on tours for all to authenticated using (true) with check (true);

create policy "tour_scenes_public_read" on tour_scenes for select to public
  using (exists (
    select 1 from tours t join projects p on p.id = t.project_id
    where t.id = tour_scenes.tour_id and t.published = true and p.published = true
  ));
create policy "tour_scenes_admin_all" on tour_scenes for all to authenticated using (true) with check (true);

create policy "tour_hotspots_public_read" on tour_hotspots for select to public
  using (exists (
    select 1 from tour_scenes s join tours t on t.id = s.tour_id join projects p on p.id = t.project_id
    where s.id = tour_hotspots.scene_id and t.published = true and p.published = true
  ));
create policy "tour_hotspots_admin_all" on tour_hotspots for all to authenticated using (true) with check (true);

-- floor_plans / dollhouses: readable when the parent project is published.
create policy "floor_plans_public_read" on floor_plans for select to public
  using (exists (select 1 from projects p where p.id = floor_plans.project_id and p.published = true));
create policy "floor_plans_admin_all" on floor_plans for all to authenticated using (true) with check (true);

create policy "dollhouses_public_read" on dollhouses for select to public
  using (exists (select 1 from projects p where p.id = dollhouses.project_id and p.published = true));
create policy "dollhouses_admin_all" on dollhouses for all to authenticated using (true) with check (true);

-- services / pricing: site-wide config, always publicly readable, admin-writable.
create policy "services_public_read" on services for select to public using (true);
create policy "services_admin_all" on services for all to authenticated using (true) with check (true);

create policy "pricing_public_read" on pricing for select to public using (true);
create policy "pricing_admin_all" on pricing for all to authenticated using (true) with check (true);

-- leads: visitors can submit (insert-only, no read); admin manages them.
create policy "leads_public_insert" on leads for insert to anon, authenticated with check (true);
create policy "leads_admin_all" on leads for all to authenticated using (true) with check (true);

commit;
