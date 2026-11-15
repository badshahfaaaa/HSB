import Link from "next/link";
import type { AreaData } from "@/lib/areas";
import { waText, PHONE_TEL, PHONE_DISPLAY } from "@/lib/site";

export function AreaPage({ area }: { area: AreaData }) {
  return (
    <>
      <section className="area-hero">
        <img src={area.heroImage} alt={area.heroAlt} className="area-hero__img" />
        <div className="area-hero__scrim" />
        <div className="area-hero__content">
          <Link href="/" className="area-hero__back">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" /></svg>
            HSB Associates
          </Link>
          <span className="eyebrow area-hero__eyebrow">Areas of Interest</span>
          <h1 className="area-hero__title">{area.name}</h1>
          <p className="area-hero__tagline">{area.tagline}</p>
        </div>
      </section>

      <section className="area-body">
        <div className="wrap">
          <div className="area-intro">
            <span className="eyebrow" data-rise="">Overview</span>
            <h2 className="area-intro__head" data-rise="">Location and introduction</h2>
            <p className="lead" data-rise="">{area.intro}</p>
            <dl className="area-facts" data-rise="">
              <div>
                <dt>Location</dt>
                <dd>{area.location}</dd>
              </div>
              <div>
                <dt>Motorway access</dt>
                <dd>{area.motorway}</dd>
              </div>
              <div>
                <dt>GT Road</dt>
                <dd>{area.gtRoad}</dd>
              </div>
            </dl>
            <p className="area-motorway" data-rise="">{area.motorwayDetail}</p>
          </div>

          <div className="area-section">
            <span className="eyebrow" data-rise="">Property Categories</span>
            <h2 className="area-section__head" data-rise="">What is available here</h2>
            <div className="area-cats">
              {area.categories.map((cat) => (
                <div className="area-cat" key={cat.label} data-rise="">
                  <h3>{cat.label}</h3>
                  <ul>
                    {cat.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="area-section">
            <span className="eyebrow" data-rise="">Map</span>
            <h2 className="area-section__head" data-rise="">Location on the map</h2>
            <div className="area-map" data-rise="">
              <iframe
                src={area.mapEmbed}
                title={`Map of ${area.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="area-map__actions">
              <a className="btn" href={area.mapDirections} target="_blank" rel="noopener">
                <span className="btn__roll"><span data-t="Open in Google Maps">Open in Google Maps</span></span>
                <span className="btn__go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 5l7 7-7 7" /></svg></span>
              </a>
              {area.mapPdf ? (
                <a className="btn btn--accent" href={area.mapPdf} target="_blank" rel="noopener" download>
                  <span className="btn__roll"><span data-t="Download Map PDF">Download Map PDF</span></span>
                  <span className="btn__go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M6 10l6 6 6-6M4 20h16" /></svg></span>
                </a>
              ) : (
                <p className="area-map__note">The official society map PDF is not yet available. Please use the Google Map above, or contact us for directions.</p>
              )}
            </div>
          </div>

          <div className="area-grid">
            <div className="area-section">
              <span className="eyebrow" data-rise="">Nearby Landmarks</span>
              <h2 className="area-section__head" data-rise="">What is close by</h2>
              <ul className="area-landmarks">
                {area.landmarks.map((lm) => (
                  <li key={lm} data-rise="">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zM12 6a3 3 0 100 6 3 3 0 000-6z" /></svg>
                    {lm}
                  </li>
                ))}
              </ul>
            </div>

            <div className="area-section">
              <span className="eyebrow" data-rise="">Distances</span>
              <h2 className="area-section__head" data-rise="">How far is it</h2>
              <dl className="area-distances">
                {area.distances.map((d) => (
                  <div key={d.destination} data-rise="">
                    <dt>{d.destination}</dt>
                    <dd>{d.distance}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="area-photo" data-open="">
            <div className="frame">
              <img src={area.image} alt={area.imageAlt} loading="lazy" />
            </div>
          </div>

          <div className="area-cta" data-rise="">
            <h2>Interested in {area.name}?</h2>
            <p>Call us or send a WhatsApp message. We will walk you through every plot, house or commercial property in this area.</p>
            <div className="area-cta__btns">
              <a className="btn btn--accent" href={waText(area.whatsappText)} target="_blank" rel="noopener">
                <span className="btn__roll"><span data-t="WhatsApp inquiry">WhatsApp inquiry</span></span>
                <span className="btn__go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 5l7 7-7 7" /></svg></span>
              </a>
              <a className="btn" href={PHONE_TEL}>
                <span className="btn__roll"><span data-t={`Call ${PHONE_DISPLAY}`}>Call {PHONE_DISPLAY}</span></span>
                <span className="btn__go"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg></span>
              </a>
            </div>
          </div>

          <div className="area-more">
            <Link href="/#areas" className="area-more__link">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" /></svg>
              Back to all areas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
