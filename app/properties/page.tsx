"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  type Property,
  type PropertyImage,
  type PropertyType,
  PROPERTY_TYPE_LABELS,
  AREA_OPTIONS,
  formatPrice,
} from "@/lib/types";
import { Header } from "@/components/Header";
import { Dock } from "@/components/Header";
import { WA, waText } from "@/lib/site";

type Filters = {
  property_type: string;
  area_slug: string;
  min_price: string;
  max_price: string;
  min_size: string;
};

const DEFAULT_FILTERS: Filters = {
  property_type: "",
  area_slug: "",
  min_price: "",
  max_price: "",
  min_size: "",
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<(Property & { images: PropertyImage[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("properties")
      .select("*, property_images(*)")
      .eq("status", "available")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (filters.property_type) {
      query = query.eq("property_type", filters.property_type as PropertyType);
    }
    if (filters.area_slug) {
      query = query.eq("area_slug", filters.area_slug);
    }
    if (filters.min_price) {
      query = query.gte("price", parseFloat(filters.min_price));
    }
    if (filters.max_price) {
      query = query.lte("price", parseFloat(filters.max_price));
    }
    if (filters.min_size) {
      query = query.gte("size_marla", parseFloat(filters.min_size));
    }

    const { data, error: fetchError } = await query;
    if (fetchError) {
      setError(fetchError.message);
    } else {
      const mapped = (data ?? []).map((p) => ({
        ...p,
        images: (p.property_images as PropertyImage[]) ?? [],
      }));
      setProperties(mapped);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <>
      <Header />
      <main>
        <section className="props-hero">
          <div className="wrap">
            <span className="eyebrow">Browse Listings</span>
            <h1 className="props-hero__title">Available Properties</h1>
            <p className="props-hero__sub">Find plots, houses and commercial property across our seven areas.</p>
          </div>
        </section>

        <section className="props-page">
          <div className="wrap">
            <div className="props-filters">
              <label className="props-filter">
                <span>Type</span>
                <select value={filters.property_type} onChange={(e) => setFilters({ ...filters, property_type: e.target.value })}>
                  <option value="">All types</option>
                  {Object.entries(PROPERTY_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
              <label className="props-filter">
                <span>Area</span>
                <select value={filters.area_slug} onChange={(e) => setFilters({ ...filters, area_slug: e.target.value })}>
                  <option value="">All areas</option>
                  {AREA_OPTIONS.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
                </select>
              </label>
              <label className="props-filter">
                <span>Min price (PKR)</span>
                <input type="number" value={filters.min_price} onChange={(e) => setFilters({ ...filters, min_price: e.target.value })} placeholder="0" />
              </label>
              <label className="props-filter">
                <span>Max price (PKR)</span>
                <input type="number" value={filters.max_price} onChange={(e) => setFilters({ ...filters, max_price: e.target.value })} placeholder="No limit" />
              </label>
              <label className="props-filter">
                <span>Min size (marla)</span>
                <input type="number" step="0.1" value={filters.min_size} onChange={(e) => setFilters({ ...filters, min_size: e.target.value })} placeholder="0" />
              </label>
              <button onClick={resetFilters} className="props-filter__reset">Clear filters</button>
            </div>

            {error && <div className="admin__error">{error}</div>}

            {loading ? (
              <p className="props-loading">Loading properties…</p>
            ) : properties.length === 0 ? (
              <div className="props-empty">
                <p>No properties match your filters. Try adjusting or clearing them.</p>
                <Link href="/#areas" className="props-empty__link">Browse our areas instead →</Link>
              </div>
            ) : (
              <div className="props-grid">
                {properties.map((prop) => (
                  <article key={prop.id} className="prop-card">
                    <div className="prop-card__img">
                      {prop.images.length > 0 ? (
                        <img src={prop.images[0].image_url} alt={prop.title} loading="lazy" />
                      ) : (
                        <div className="prop-card__noimg"><span>No image</span></div>
                      )}
                      {prop.featured && <span className="prop-card__badge">Featured</span>}
                    </div>
                    <div className="prop-card__body">
                      <span className="prop-card__type">{PROPERTY_TYPE_LABELS[prop.property_type]}</span>
                      <h3>{prop.title}</h3>
                      <p className="prop-card__area">
                        {AREA_OPTIONS.find((a) => a.slug === prop.area_slug)?.name ?? prop.area_slug}
                        {prop.block && ` · ${prop.block}`}
                      </p>
                      <div className="prop-card__details">
                        {prop.size_text && <span>{prop.size_text}</span>}
                        <span className="prop-card__price">{formatPrice(prop.price)}</span>
                      </div>
                      <a
                        className="prop-card__wa"
                        href={waText(`Assalam o Alaikum, I am interested in: ${prop.title} (${AREA_OPTIONS.find((a) => a.slug === prop.area_slug)?.name ?? prop.area_slug}). Is it still available?`)}
                        target="_blank"
                        rel="noopener"
                      >
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Dock whatsapp={WA} />
    </>
  );
}
