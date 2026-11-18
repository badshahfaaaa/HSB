import Link from "next/link";
import { AREAS } from "@/lib/areas";

export function Areas() {
  return (
    <section className="areas" id="areas">
      <div className="wrap">
        <span className="eyebrow" data-rise="">Areas of Interest</span>
        <h2 className="head areas__head" data-rise="">
          Where we work
        </h2>
        <p className="lead areas__lead" data-rise="">
          We cover seven key areas across Islamabad and nearby Wah Cantt. Each area has its own page with location details, property types, landmarks and a map.
        </p>
        <div className="areas__grid">
          {AREAS.map((area) => (
            <Link href={`/areas/${area.slug}`} key={area.slug} className="area-card" data-rise="">
              <div className="area-card__img">
                <img src={area.image} alt={area.imageAlt} loading="lazy" />
                <div className="area-card__overlay" />
              </div>
              <div className="area-card__body">
                <h3>{area.name}</h3>
                <p>{area.tagline}</p>
                <span className="area-card__link">View area details <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
