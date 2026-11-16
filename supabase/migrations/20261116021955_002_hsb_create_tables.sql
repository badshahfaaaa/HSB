/*
# HSB Associates & Builders — Core Tables Creation

Creates tables, indexes, RLS policies, and grants for
properties, property_images, inquiries, and team_members.

## Tables
1. properties — real estate listings
2. property_images — image URLs linked to properties
3. inquiries — customer contact form submissions
4. team_members — team profiles managed by admin

## Security
- properties, property_images, team_members: public SELECT, authenticated write
- inquiries: public INSERT, authenticated SELECT/UPDATE/DELETE
*/

-- ---------- properties ----------
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  property_type text NOT NULL DEFAULT 'residential_plot'
    CHECK (property_type IN ('residential_plot','house','commercial_plot','shop','plaza','commercial_garage')),
  listing_type text NOT NULL DEFAULT 'sell'
    CHECK (listing_type IN ('buy','sell','rent')),
  area_slug text NOT NULL DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  size_text text NOT NULL DEFAULT '',
  size_marla numeric,
  block text,
  status text NOT NULL DEFAULT 'available'
    CHECK (status IN ('available','sold','reserved')),
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_properties_area ON properties(area_slug);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);

GRANT SELECT ON properties TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON properties TO authenticated;

DROP POLICY IF EXISTS "public_select_properties" ON properties;
CREATE POLICY "public_select_properties" ON properties FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_properties" ON properties;
CREATE POLICY "admin_insert_properties" ON properties FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_properties" ON properties;
CREATE POLICY "admin_update_properties" ON properties FOR UPDATE
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_properties" ON properties;
CREATE POLICY "admin_delete_properties" ON properties FOR DELETE
  TO authenticated USING (true);

-- ---------- property_images ----------
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_propimg_property ON property_images(property_id);

GRANT SELECT ON property_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON property_images TO authenticated;

DROP POLICY IF EXISTS "public_select_propimg" ON property_images;
CREATE POLICY "public_select_propimg" ON property_images FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_propimg" ON property_images;
CREATE POLICY "admin_insert_propimg" ON property_images FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_propimg" ON property_images;
CREATE POLICY "admin_update_propimg" ON property_images FOR UPDATE
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_propimg" ON property_images;
CREATE POLICY "admin_delete_propimg" ON property_images FOR DELETE
  TO authenticated USING (true);

-- ---------- inquiries ----------
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  message text NOT NULL DEFAULT '',
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  area_slug text,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','read','responded','archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);

GRANT SELECT, UPDATE, DELETE ON inquiries TO authenticated;
GRANT INSERT ON inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "admin_select_inquiries" ON inquiries;
CREATE POLICY "admin_select_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_inquiries" ON inquiries;
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_inquiries" ON inquiries;
CREATE POLICY "admin_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_inquiries" ON inquiries;
CREATE POLICY "admin_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);

-- ---------- team_members ----------
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  phone text,
  photo_url text,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON team_members TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON team_members TO authenticated;

DROP POLICY IF EXISTS "public_select_team" ON team_members;
CREATE POLICY "public_select_team" ON team_members FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_team" ON team_members;
CREATE POLICY "admin_insert_team" ON team_members FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_team" ON team_members;
CREATE POLICY "admin_update_team" ON team_members FOR UPDATE
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_team" ON team_members;
CREATE POLICY "admin_delete_team" ON team_members FOR DELETE
  TO authenticated USING (true);