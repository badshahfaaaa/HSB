"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { type Inquiry, type InquiryStatus, INQUIRY_STATUS_LABELS, AREA_OPTIONS } from "@/lib/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (filter !== "all") {
      query = query.eq("status", filter);
    }
    const { data, error: fetchError } = await query;
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setInquiries(data ?? []);
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const updateStatus = async (id: string, status: InquiryStatus) => {
    const { error: updateError } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    await fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error: delError } = await supabase.from("inquiries").delete().eq("id", id);
    if (delError) {
      setError(delError.message);
      return;
    }
    await fetchInquiries();
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>Inquiries</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value as InquiryStatus | "all")} className="admin__filter">
          <option value="all">All inquiries</option>
          {Object.entries(INQUIRY_STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {error && <div className="admin__error">{error}</div>}

      {loading ? (
        <p className="admin__loading">Loading inquiries…</p>
      ) : inquiries.length === 0 ? (
        <div className="admin__empty">
          <p>No inquiries yet.</p>
        </div>
      ) : (
        <div className="admin-inquiries">
          {inquiries.map((inq) => (
            <div key={inq.id} className={`admin-inquiry admin-inquiry--${inq.status}`}>
              <div className="admin-inquiry__head">
                <div>
                  <h3>{inq.name}</h3>
                  <span className="admin-inquiry__date">{formatDate(inq.created_at)}</span>
                </div>
                <span className={`admin-status admin-status--${inq.status}`}>{INQUIRY_STATUS_LABELS[inq.status]}</span>
              </div>
              <div className="admin-inquiry__contact">
                <a href={`tel:${inq.phone}`}>📞 {inq.phone}</a>
                {inq.email && <a href={`mailto:${inq.email}`}>✉ {inq.email}</a>}
                {inq.area_slug && <span>📍 {AREA_OPTIONS.find((a) => a.slug === inq.area_slug)?.name ?? inq.area_slug}</span>}
              </div>
              {inq.message && <p className="admin-inquiry__msg">{inq.message}</p>}
              <div className="admin-inquiry__actions">
                {inq.status === "new" && (
                  <button onClick={() => updateStatus(inq.id, "read")} className="admin__edit-btn">Mark as read</button>
                )}
                {inq.status !== "responded" && inq.status !== "archived" && (
                  <button onClick={() => updateStatus(inq.id, "responded")} className="admin__edit-btn">Mark responded</button>
                )}
                <button onClick={() => updateStatus(inq.id, "archived")} className="admin__cancel-btn">Archive</button>
                <button onClick={() => handleDelete(inq.id)} className="admin__del-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
