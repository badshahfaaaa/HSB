/*
# HSB Associates & Builders — Core Database Schema

## Summary
Creates the core tables for the HSB Associates & Builders real estate website:
properties, property_images, inquiries, and team_members. Sets up Row Level Security
so that public visitors can read published properties and team members, and can submit
inquiries, while only authenticated admins can create, update, or delete records.

## New Tables

### properties
Stores real estate listings (plots, houses, commercial property).
- id (uuid, PK)
- title (text) — listing title
- description (text) — detailed description
- property_type (text) — one of: 'residential_plot', 'house', 'commercial_plot', 'shop', 'plaza', 'commercial_garage'
- listing_type (text) — one of: 'buy', 'sell', 'rent'
- area_slug (text) — references the area slug from lib/areas.ts (e.g. 'b-17-multi-gardens')
- price (numeric) — price in PKR
- size_text (text) — human-readable size (e.g. "5 Marla", "10 Marla", "1 Kanal")
- size_marla (numeric) — size in marla for filtering (nullable)
- block (text) — block/sector within the area (nullable)
- status (text) — one of: 'available', 'sold', 'reserved' (default 'available')
- featured (boolean) — show on homepage (default false)
- created_at (timestamptz)
- updated_at (timestamptz)

### property_images
Stores image URLs for properties (uploaded to Supabase Storage).
- id (uuid, PK)
- property_id (uuid, FK → properties.id ON DELETE CASCADE)
- image_url (text) — public URL from Supabase Storage
- position (int) — display order (default 0)
- created_at (timestamptz)

### inquiries
Customer inquiries submitted through the website contact/inquiry forms.
- id (uuid, PK)
- name (text) — customer name
- phone (text) — customer phone number
- email (text, nullable) — customer email
- message (text) — inquiry text
- property_id (uuid, nullable, FK → properties.id) — if inquiry is about a specific property
- area_slug (text, nullable) — if inquiry is about a specific area
- status (text) — one of: 'new', 'read', 'responded', 'archived' (default 'new')
- created_at (timestamptz)

### team_members
Team member records managed by admin (replaces hardcoded team data).
- id (uuid, PK)
- name (text) — full name
- role (text, nullable) — job title
- phone (text, nullable) — phone number with country code
- photo_url (text, nullable) — URL to photo in Supabase Storage
- position (int) — display order (default 0)
- created_at (timestamptz)

## Security

### properties
- RLS enabled.
- SELECT: public (anon + authenticated) can read all rows.
- INSERT/UPDATE/DELETE: authenticated only.

### property_images
- RLS enabled.
- SELECT: public (anon + authenticated).
- INSERT/UPDATE/DELETE: authenticated only.

### inquiries
- RLS enabled.
- SELECT: authenticated only (admin can view inquiries).
- INSERT: public (anon + authenticated) — customers can submit inquiries without logging in.
- UPDATE/DELETE: authenticated only.

### team_members
- RLS enabled.
- SELECT: public (anon + authenticated).
- INSERT/UPDATE/DELETE: authenticated only.

## Notes
1. All tables use uuid PKs with gen_random_uuid() defaults.
2. Foreign keys use ON DELETE CASCADE for child tables.
3. Indexes added on frequently queried columns (area_slug, property_type, status, price).
4. Properties have a CHECK constraint on property_type and listing_type for data integrity.
5. An inquiry insert by anon is allowed because the form is public-facing.
*/