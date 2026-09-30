-- Scoutr — seed data migrated from lib/data/projects.ts and
-- lib/data/testimonials.ts (Phase 1 placeholder content). Run after
-- supabase/migrations/0001_init.sql so /portfolio isn't empty on cutover.
--
-- Safe to re-run: the projects insert is keyed off the unique `slug` and
-- skips rows that already exist; the testimonials insert only fires if the
-- table is currently empty (testimonials have no natural unique key).

insert into projects
  (slug, title, location, property_type, summary, cover_image_url, cover_gradient, cover_label, featured, published, has_360, has_dollhouse, has_floor_plan)
values
  ('villa-karen', 'Karen Hillside Villa', 'Karen, Nairobi', 'Residential',
   'A five-bedroom hillside villa, scanned room-by-room with a full dollhouse model and measured floor plans across both levels.',
   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop',
   'from-[#3a2f22] via-[#20180f] to-[#0b0c0e]', 'Villa', true, true, true, true, true),

  ('kilimani-loft', 'Kilimani Loft Apartment', 'Kilimani, Nairobi', 'Residential',
   'An open-plan two-bedroom loft with a 360° tour built for a fast-moving rental listing.',
   'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop',
   'from-[#22303a] via-[#141c22] to-[#0b0c0e]', 'Apartment', true, true, true, true, false),

  ('westlands-office-tower', 'Westlands Office Tower', 'Westlands, Nairobi', 'Commercial',
   'Full-floor commercial space digitized for a developer marketing pre-lease units to prospective tenants.',
   'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop',
   'from-[#2a2a1f] via-[#181811] to-[#0b0c0e]', 'Commercial', true, true, true, false, true),

  ('diani-boutique-hotel', 'Diani Boutique Hotel', 'Diani Beach, Kwale', 'Hospitality',
   'Twelve room types and shared spaces tour-mapped so guests can preview the exact room they''re booking.',
   'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop',
   'from-[#233327] via-[#141d17] to-[#0b0c0e]', 'Hotel', true, true, true, true, true),

  ('runda-new-build', 'Runda New-Build Show Home', 'Runda, Nairobi', 'Development',
   'Show home for an off-plan development, used by the sales team to sell units before the estate was complete.',
   'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop',
   'from-[#332a1f] via-[#1d1811] to-[#0b0c0e]', 'Development', false, true, true, true, true),

  ('lavington-townhouse', 'Lavington Townhouse', 'Lavington, Nairobi', 'Residential',
   'A three-bedroom townhouse listing photographed and tour-mapped inside a single afternoon.',
   'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format&fit=crop',
   'from-[#2e2620] via-[#191510] to-[#0b0c0e]', 'Townhouse', false, true, true, false, true)
on conflict (slug) do update set
  cover_image_url = excluded.cover_image_url,
  cover_gradient = excluded.cover_gradient,
  cover_label = excluded.cover_label;

insert into testimonials (quote, name, role)
select * from (
  values
    ('Sample testimonial — replace before launch. Buyers spent longer on the listing and asked fewer basic questions once they could walk through it themselves first.',
     'Placeholder', 'Residential agent, Nairobi'),

    ('Sample testimonial — replace before launch. Guests knew exactly which room they were booking, which cut down on mismatched-expectation complaints.',
     'Placeholder', 'Boutique hotel owner, Diani'),

    ('Sample testimonial — replace before launch. We sold units off the show home tour before the rest of the development was even finished.',
     'Placeholder', 'Property developer, Nairobi')
) as v(quote, name, role)
where not exists (select 1 from testimonials);
