-- Scoutr — drop tables the site doesn't use
-- Run in the Supabase SQL Editor after 0003_media_storage.sql. Safe to re-run.
--
-- Portfolio media is now just an embedded 3D tour link (projects.tour_embed_url,
-- which includes the provider's own dollhouse and floor plan views) plus the
-- gallery (project_images). The self-hosted tour, dollhouse and floor plan
-- tables are no longer needed. services, pricing and leads were never wired
-- up: services/pricing content lives in lib/data/*, and the quote form
-- doesn't save submissions yet — re-add a leads table when it does.
--
-- All of these were empty apart from two sample floor_plans rows.

begin;

drop table if exists tour_hotspots cascade;
drop table if exists tour_scenes cascade;
drop table if exists tours cascade;
drop table if exists dollhouses cascade;
drop table if exists floor_plans cascade;
drop table if exists services cascade;
drop table if exists pricing cascade;
drop table if exists leads cascade;

commit;
