"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AREA_OPTIONS } from "@/lib/types";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [area, setArea] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("inquiries").insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      message: message.trim(),
      area_slug: area || null,
    });
    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }
    setSuccess(true);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setArea("");
  };

  if (success) {
    return (
      <div className="inq-form inq-form--done">
        <h3>Thank you for your inquiry</h3>
        <p>We have received your message. Our team will contact you shortly.</p>
        <button onClick={() => setSuccess(false)} className="inq-form__again">Send another inquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="inq-form">
      <h3>Send us an inquiry</h3>
      <p className="inq-form__sub">Fill in the form below and we will get back to you.</p>
      <div className="inq-form__row">
        <label className="inq-field">
          <span>Name *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
        </label>
        <label className="inq-field">
          <span>Phone *</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="03xx xxxxxxx" type="tel" />
        </label>
      </div>
      <div className="inq-form__row">
        <label className="inq-field">
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" />
        </label>
        <label className="inq-field">
          <span>Area of interest</span>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">— Select area —</option>
            {AREA_OPTIONS.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
          </select>
        </label>
      </div>
      <label className="inq-field">
        <span>Message</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Tell us what you are looking for…" />
      </label>
      {error && <p className="inq-form__error">{error}</p>}
      <button type="submit" className="inq-form__btn" disabled={submitting}>
        {submitting ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
