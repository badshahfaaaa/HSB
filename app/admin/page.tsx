"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  type Property,
  type PropertyImage,
  type PropertyType,
  type ListingType,
  type PropertyStatus,
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  STATUS_LABELS,
  AREA_OPTIONS,
  formatPrice,
} from "@/lib/types";

type PropertyForm = {
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type: ListingType;
  area_slug: string;
  price: string;
  size_text: string;
  size_marla: string;
  block: string;
  status: PropertyStatus;
  featured: boolean;
};

const EMPTY_FORM: PropertyForm = {
  title: "",
  description: "",
  property_type: "residential_plot",
  listing_type: "sell",
  area_slug: "",
  price: "",
  size_text: "",
  size_marla: "",
  block: "",
  status: "available",
  featured: false,
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PropertyForm>(EMPTY_FORM);
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setProperties(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const fetchImages = async (propertyId: string) => {
    const { data } = await supabase
      .from("property_images")
      .select("*")
      .eq("property_id", propertyId)
      .order("position", { ascending: true });
    setImages(data ?? []);
  };

  const startCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setImages([]);
    setShowForm(true);
  };

  const startEdit = (prop: Property) => {
    setEditing(prop);
    setForm({
      title: prop.title,
      description: prop.description,
      property_type: prop.property_type,
      listing_type: prop.listing_type,
      area_slug: prop.area_slug,
      price: String(prop.price),
      size_text: prop.size_text,
      size_marla: prop.size_marla ? String(prop.size_marla) : "",
      block: prop.block ?? "",
      status: prop.status,
      featured: prop.featured,
    });
    fetchImages(prop.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setImages([]);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    if (!form.title.trim()) {
      setError("Title is required.");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      property_type: form.property_type,
      listing_type: form.listing_type,
      area_slug: form.area_slug,
      price: parseFloat(form.price) || 0,
      size_text: form.size_text.trim(),
      size_marla: form.size_marla ? parseFloat(form.size_marla) : null,
      block: form.block.trim() || null,
      status: form.status,
      featured: form.featured,
      updated_at: new Date().toISOString(),
    };

    if (editing) {
      const { error: updateError } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", editing.id);
      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error: insertError } = await supabase
        .from("properties")
        .insert(payload)
        .select()
        .single();
      if (insertError) {
        setError(insertError.message);
        setSaving(false);
        return;
      }
      setEditing(data);
    }

    setSaving(false);
    await fetchProperties();
    closeForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    const { error: delError } = await supabase.from("properties").delete().eq("id", id);
    if (delError) {
      setError(delError.message);
      return;
    }
    await fetchProperties();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing || !e.target.files?.length) return;
    setUploading(true);
    setError(null);
    const files = Array.from(e.target.files);
    const existingPos = images.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const fileName = `${editing.id}/${Date.now()}-${i}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      await supabase.from("property_images").insert({
        property_id: editing.id,
        image_url: urlData.publicUrl,
        position: existingPos + i,
      });
    }

    await fetchImages(editing.id);
    setUploading(false);
    if (e.target) e.target.value = "";
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    const path = imageUrl.split("/property-images/")[1];
    if (path) {
      await supabase.storage.from("property-images").remove([path]);
    }
    await supabase.from("property_images").delete().eq("id", imageId);
    if (editing) await fetchImages(editing.id);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>Properties</h1>
        <button onClick={startCreate} className="admin__add-btn">+ Add property</button>
      </div>

      {error && <div className="admin__error">{error}</div>}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h2>{editing ? "Edit property" : "New property"}</h2>
              <button onClick={closeForm} className="admin-modal__close" aria-label="Close">×</button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <label className="admin-field">
                <span>Title *</span>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="5 Marla plot in Block C" required />
              </label>
              <label className="admin-field">
                <span>Description</span>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Corner plot, near park, all dues cleared…" />
              </label>
              <div className="admin-form__row">
                <label className="admin-field">
                  <span>Property type</span>
                  <select value={form.property_type} onChange={(e) => setForm({ ...form, property_type: e.target.value as PropertyType })}>
                    {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </label>
                <label className="admin-field">
                  <span>Listing type</span>
                  <select value={form.listing_type} onChange={(e) => setForm({ ...form, listing_type: e.target.value as ListingType })}>
                    {Object.entries(LISTING_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </label>
              </div>
              <div className="admin-form__row">
                <label className="admin-field">
                  <span>Area</span>
                  <select value={form.area_slug} onChange={(e) => setForm({ ...form, area_slug: e.target.value })}>
                    <option value="">— Select area —</option>
                    {AREA_OPTIONS.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                  </select>
                </label>
                <label className="admin-field">
                  <span>Block</span>
                  <input value={form.block} onChange={(e) => setForm({ ...form, block: e.target.value })} placeholder="Block C" />
                </label>
              </div>
              <div className="admin-form__row">
                <label className="admin-field">
                  <span>Price (PKR)</span>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" />
                </label>
                <label className="admin-field">
                  <span>Size text</span>
                  <input value={form.size_text} onChange={(e) => setForm({ ...form, size_text: e.target.value })} placeholder="5 Marla" />
                </label>
                <label className="admin-field">
                  <span>Size (marla, for filtering)</span>
                  <input type="number" step="0.1" value={form.size_marla} onChange={(e) => setForm({ ...form, size_marla: e.target.value })} placeholder="5" />
                </label>
              </div>
              <div className="admin-form__row">
                <label className="admin-field">
                  <span>Status</span>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PropertyStatus })}>
                    {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </label>
                <label className="admin-field admin-field--check">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  <span>Featured on homepage</span>
                </label>
              </div>

              {editing && (
                <div className="admin-images">
                  <h3>Images</h3>
                  <div className="admin-images__grid">
                    {images.map((img) => (
                      <div key={img.id} className="admin-img">
                        <img src={img.image_url} alt="" loading="lazy" />
                        <button type="button" onClick={() => handleDeleteImage(img.id, img.image_url)} className="admin-img__del">×</button>
                      </div>
                    ))}
                    <label className="admin-img__upload">
                      <input type="file" accept="image/*" multiple onChange={handleUpload} disabled={uploading} />
                      <span>{uploading ? "Uploading…" : "+ Upload"}</span>
                    </label>
                  </div>
                </div>
              )}

              {!editing && <p className="admin-form__note">Save the property first to upload images.</p>}

              <div className="admin-form__actions">
                <button type="button" onClick={closeForm} className="admin__cancel-btn">Cancel</button>
                <button type="submit" className="admin__save-btn" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Update property" : "Create property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p className="admin__loading">Loading properties…</p>
      ) : properties.length === 0 ? (
        <div className="admin__empty">
          <p>No properties yet. Click <b>Add property</b> to create your first listing.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Area</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop.id}>
                  <td>{prop.title}</td>
                  <td>{PROPERTY_TYPE_LABELS[prop.property_type]}</td>
                  <td>{AREA_OPTIONS.find((a) => a.slug === prop.area_slug)?.name ?? prop.area_slug}</td>
                  <td>{formatPrice(prop.price)}</td>
                  <td><span className={`admin-status admin-status--${prop.status}`}>{STATUS_LABELS[prop.status]}</span></td>
                  <td>
                    <button onClick={() => startEdit(prop)} className="admin__edit-btn">Edit</button>
                    <button onClick={() => handleDelete(prop.id)} className="admin__del-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
