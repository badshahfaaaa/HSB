/*
# HSB Associates & Builders — Storage Bucket for Property Images

Creates a public storage bucket 'property-images' for uploading
property photos and team member photos. Sets up storage policies
so that anyone can read images, but only authenticated admins can upload.

## Storage
- Bucket: property-images (public)
- SELECT (read): public (anon + authenticated)
- INSERT (upload): authenticated only
- UPDATE: authenticated only
- DELETE: authenticated only
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "public_read_property_images" ON storage.objects;
CREATE POLICY "public_read_property_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'property-images');

DROP POLICY IF EXISTS "admin_upload_property_images" ON storage.objects;
CREATE POLICY "admin_upload_property_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'property-images');

DROP POLICY IF EXISTS "admin_update_property_images" ON storage.objects;
CREATE POLICY "admin_update_property_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'property-images');

DROP POLICY IF EXISTS "admin_delete_property_images" ON storage.objects;
CREATE POLICY "admin_delete_property_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'property-images');