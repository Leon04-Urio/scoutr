-- Scoutr — storage bucket for admin-uploaded project media
-- Run in the Supabase SQL Editor after 0002_project_media.sql. Safe to re-run.
--
-- Public bucket: anyone can view files (they're shown on public project
-- pages); only the signed-in admin can upload, replace or delete.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-media',
  'project-media',
  true,
  20971520, -- 20 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "project_media_public_read" on storage.objects;
drop policy if exists "project_media_admin_insert" on storage.objects;
drop policy if exists "project_media_admin_update" on storage.objects;
drop policy if exists "project_media_admin_delete" on storage.objects;

create policy "project_media_public_read" on storage.objects for select to public
  using (bucket_id = 'project-media');
create policy "project_media_admin_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'project-media');
create policy "project_media_admin_update" on storage.objects for update to authenticated
  using (bucket_id = 'project-media');
create policy "project_media_admin_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'project-media');
