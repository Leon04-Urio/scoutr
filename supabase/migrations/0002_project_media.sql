-- Scoutr — project page media
-- Run in the Supabase SQL Editor after 0001_init.sql. Safe to re-run.
--
-- Adds an external 3D tour embed (Matterport, Kuula, etc.) to projects.
-- Gallery photos and floor plans use the existing project_images and
-- floor_plans tables from 0001.
--
-- walkthrough_video_url is part of 0001, but databases created from an
-- earlier draft of that file don't have it, so it's added here too.

alter table projects add column if not exists walkthrough_video_url text;
alter table projects add column if not exists tour_embed_url text;
