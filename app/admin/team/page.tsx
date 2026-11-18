"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { type TeamMember } from "@/lib/types";

type TeamForm = {
  name: string;
  role: string;
  phone: string;
  position: string;
};

const EMPTY: TeamForm = { name: "", role: "", phone: "", position: "0" };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<TeamForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("team_members")
      .select("*")
      .order("position", { ascending: true });
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setMembers(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const startCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setShowForm(true);
  };

  const startEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role ?? "",
      phone: m.phone ?? "",
      position: String(m.position),
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      role: form.role.trim() || null,
      phone: form.phone.trim() || null,
      position: parseInt(form.position) || 0,
    };
    if (editing) {
      const { error: updateError } = await supabase
        .from("team_members")
        .update(payload)
        .eq("id", editing.id);
      if (updateError) setError(updateError.message);
    } else {
      const { error: insertError } = await supabase
        .from("team_members")
        .insert(payload);
      if (insertError) setError(insertError.message);
    }
    setSaving(false);
    if (!error) {
      await fetchMembers();
      closeForm();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    const { error: delError } = await supabase.from("team_members").delete().eq("id", id);
    if (delError) {
      setError(delError.message);
      return;
    }
    await fetchMembers();
  };

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing || !e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const fileName = `team/${editing.id}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(fileName);
    await supabase
      .from("team_members")
      .update({ photo_url: urlData.publicUrl })
      .eq("id", editing.id);
    await fetchMembers();
    setUploading(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>Team</h1>
        <button onClick={startCreate} className="admin__add-btn">+ Add member</button>
      </div>

      {error && <div className="admin__error">{error}</div>}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h2>{editing ? "Edit member" : "New team member"}</h2>
              <button onClick={closeForm} className="admin-modal__close" aria-label="Close">×</button>
            </div>
            <form onSubmit={handleSave} className="admin-form">
              <label className="admin-field">
                <span>Name *</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Full name" />
              </label>
              <label className="admin-field">
                <span>Role</span>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO, Manager…" />
              </label>
              <label className="admin-field">
                <span>Phone (with country code, e.g. 92335…)</span>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="923359548102" />
              </label>
              <label className="admin-field">
                <span>Display order</span>
                <input type="number" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
              </label>

              {editing && (
                <div className="admin-images">
                  <h3>Photo</h3>
                  {editing.photo_url && (
                    <div className="admin-img admin-img--single">
                      <img src={editing.photo_url} alt={editing.name} />
                    </div>
                  )}
                  <label className="admin-img__upload">
                    <input type="file" accept="image/*" onChange={handlePhoto} disabled={uploading} />
                    <span>{uploading ? "Uploading…" : "Upload photo"}</span>
                  </label>
                </div>
              )}

              {!editing && <p className="admin-form__note">Save the member first to upload a photo.</p>}

              <div className="admin-form__actions">
                <button type="button" onClick={closeForm} className="admin__cancel-btn">Cancel</button>
                <button type="submit" className="admin__save-btn" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Update" : "Add member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p className="admin__loading">Loading team…</p>
      ) : (
        <div className="admin-team-grid">
          {members.map((m) => (
            <div key={m.id} className="admin-team-card">
              <div className="admin-team-card__avatar">
                {m.photo_url ? <img src={m.photo_url} alt={m.name} /> : <span>{m.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}</span>}
              </div>
              <h3>{m.name}</h3>
              <p>{m.role ?? "—"}</p>
              <div className="admin-team-card__actions">
                <button onClick={() => startEdit(m)} className="admin__edit-btn">Edit</button>
                <button onClick={() => handleDelete(m.id)} className="admin__del-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
