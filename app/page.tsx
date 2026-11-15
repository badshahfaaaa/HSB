import Image from "next/image";
import type { CSSProperties } from "react";
import { BuildRow } from "@/components/BuildRow";
import { Dock, Header } from "@/components/Header";
import { HeroTabs } from "@/components/HeroTabs";
import { Intro } from "@/components/Intro";
import { Band, Clock, PageMotion, Sky } from "@/components/Live";
import { Planner } from "@/components/Planner";
import { Team } from "@/components/Team";
import { Trust } from "@/components/Trust";
import { Areas } from "@/components/Areas";
import { Services } from "@/components/Services";
import { ArtPicture, Btn, SplitHeading, SplitWords } from "@/components/ui";
import { HERO_PHOTOS } from "@/lib/hero";
import { MAPS_DIRECTIONS, MAPS_LISTING, PHONE_DISPLAY, PHONE_TEL, WA, waText } from "@/lib/site";

const img = (name: string) => `/assets/img/${name}.webp`;

const JOBS = [
  {
    title: "Buying a plot",
    text: "Tell us the size and the block. We find plots that are genuinely for sale, walk each one with you, and check all papers before any money is paid.",
    src: "blossom-1920", w: 1920, h: 1280,
    alt: "Spring blossom in front of a forested Margalla hillside",
  },
  {
    title: "Selling what you own",
    text: "We price your plot against recent sales in B-17, show it to serious buyers, and stay with you through the whole transfer at the society office.",
    src: "aerial-1920", w: 1920, h: 1080,
    alt: "Islamabad seen from Pir Sohawa, the city running out to a hazy horizon",
  },
  {
    title: "Drawing the house",
    text: "We draw rooms, windows and parking for your plot before any brick is laid. You can see the house on paper and make changes while it costs nothing.",
    src: "house-design", w: 1200, h: 913,
    alt: "A hand-drawn front elevation and floor plans for a house, from 1883",
  },
  {
    title: "Building it",
    text: "Foundation, grey structure and roof, all done by one team on site. You get one person to call from the first trench to the last slab.",
    src: "bricklayer", w: 943, h: 641,
    alt: "A bricklayer bent over a wall, resetting bricks by hand",
  },
  {
    title: "Finishing the inside",
    text: "Floors, kitchens, doors, paint and lighting, all chosen with you and fitted by the same team that built the walls.",
    src: "interior", w: 1024, h: 694,
    alt: "A bright living room with pale sofas, a low table and tall windows",
  },
];

const SHEET: { name: string; items: [string, string, string][] }[] = [
  {
    name: "Property",
    items: [
      ["Residential plots", "All blocks, A to G", "Buy or sell"],
      ["Houses", "Ready, or under construction", "Buy or sell"],
      ["Commercial", "Shops, offices and markaz plots", "Buy or sell"],
      ["Rentals", "Houses, portions and shops", "Rent out"],
    ],
  },
  {
    name: "Paperwork",
    items: [
      ["File checks", "Ownership and dues, before you pay", "Every deal"],
      ["Valuation", "What it would sell for this month", "Any plot"],
      ["Transfers", "With you at the society office", "Start to end"],
    ],
  },
  {
    name: "Building",
    items: [
      ["House design", "Plans and front elevation", "5 Marla up"],
      ["Grey structure", "Foundation, frame, brick, roof", "Fixed scope"],
      ["Complete houses", "From empty plot to keys", "Turnkey"],
      ["Extensions", "Another floor, or a rebuilt kitchen", "Existing homes"],
    ],
  },
  {
    name: "Interiors",
    items: [
      ["Kitchens and woodwork", "Cabinets, doors and wardrobes", "Made to fit"],
      ["Floors, paint, lighting", "Chosen with you, room by room", "Any stage"],
    ],
  },
];

const CREDITS: [string, string, string][] = [
  ["https://commons.wikimedia.org/w/index.php?curid=158965533", "Faisal Hills Arc Monument", "by JogiAsad, CC BY-SA 4.0, cropped and section-cropped for the cornice and vault views."],
  ["https://commons.wikimedia.org/w/index.php?curid=40752875", "Margalla Hills, Morning", "by Usamamaqbool, CC BY-SA 3.0, cropped."],
  ["https://commons.wikimedia.org/w/index.php?curid=48520383", "View From Faisal Mosque", "by Javaidsohaib, CC BY-SA 4.0."],
  ["https://commons.wikimedia.org/w/index.php?curid=59286903", "Aerial View from Pir Sohawa", "by Saqibimtiaz, CC BY-SA 4.0, cropped."],
  ["https://commons.wikimedia.org/w/index.php?curid=48472148", "Snow-capped Margalla Hills", "by Ali Mujtaba, CC BY-SA 4.0, cropped."],
  ["https://www.metmuseum.org/art/collection/search/386370", "Design for a House", "by W. Strong, The Met, public domain."],
  ["https://www.rawpixel.com/image/12172563/image-person-art-brick-wall", "Repairing part apartment building", "Library of Congress, CC0."],
  ["https://www.rawpixel.com/image/6043312/photo-image-public-domain-table-living-room", "Modern apartment interior", "CC0."],
];

const bandCopy = (
  <span>
    HSB Associates &amp; Builders<i />B-17 Multi Gardens<i />
  </span>
);

export default function Home() {
  return (
    <>
      <Intro />
      <PageMotion />
      <a className="skip" href="#ground">Skip to content</a>
      <Header />

      <main>
        <section className="hero" id="hero">
          <div className="hero__view" id="heroView">
            {HERO_PHOTOS.map((photo, i) => (
              <div className={`hero__slide${photo.fit === "whole" ? " hero__slide--whole" : ""}${i === 0 ? " is-on" : ""}`} key={photo.wide.src}>
                <ArtPicture id={i === 0 ? "heroImg" : undefined} priority={i === 0} alt={photo.alt} wide={photo.wide} tall={photo.tall} />
              </div>
            ))}
          </div>
          <Sky />
          <div className="hero__scrim" />
          <div className="hero__copy">
            <h1 className="hero__name">
              <span className="sr">HSB Associates &amp; Builders</span>
              <span className="hl"><SplitWords text="HSB Associates" /></span>{" "}
              <span className="hl"><SplitWords text="& Builders" start={13} /></span>
            </h1>
            <div className="hero__row">
              <p className="hero__line">
                We buy, sell and build on plots across B-17 Multi Gardens and Faisal Hills, Islamabad.{" "}
                <span className="hero__live">
                  <i className="pulse" />
                  Open now, <Clock fallback="any hour" /> here.
                </span>
              </p>
              <HeroTabs places={HERO_PHOTOS.map((photo) => photo.place)} />
              <Btn
                label="Message us on WhatsApp"
                href={waText("Assalam o Alaikum, I found HSB Associates & Builders online and would like to talk about a property.")}
              />
            </div>
          </div>
        </section>

        <Trust />

        <section className="services-section" id="services">
          <Services />
        </section>

        <Areas />

        <section className="ground" id="ground">
          <div className="wrap">
            <span className="eyebrow" data-rise="">About Us</span>
            <SplitHeading text="Our ground is B-17" />
            <p className="lead ground__lead" data-rise="">
              HSB Associates &amp; Builders works from plots 1082-F and 1082-G on road MR-11, in Block C of Multi Gardens. We advise on property here, and we build on it.
            </p>
            <div className="ground__tiles">
              <figure className="ground__photo" data-open="">
                <div className="frame">
                  <Image src={img("city-morning")} width={1651} height={897} quality={80} sizes="(max-width: 760px) 100vw, 66vw" alt="Islamabad spread out below the hills under a bright morning sky" data-drift="" />
                </div>
                <figcaption>
                  Multi Gardens runs from Block A to Block G beside the GT Road, with the Margalla foothills close by. It helps to have an office on the same streets as the plots.
                </figcaption>
              </figure>
              <div className="ground__side">
                <div className="ground__tile" data-rise="" style={{ "--i": 1 } as CSSProperties}>
                  <svg id="officeSketch" viewBox="0 0 320 200" role="img" aria-label="Sketch of plots 1082-F and 1082-G side by side on road MR-11, not to scale">
                    <rect x={0} y={150} width={320} height={50} fill="#0a0a0a" />
                    <text x={160} y={182} fill="#dedad3" textAnchor="middle" className="sk">Road MR-11</text>
                    <rect x={10} y={48} width={66} height={94} fill="#c4bfb5" />
                    <rect x={244} y={48} width={66} height={94} fill="#c4bfb5" />
                    <rect x={84} y={20} width={72} height={122} fill="#0a0a0a" />
                    <rect x={164} y={20} width={72} height={122} fill="#0a0a0a" />
                    <text x={120} y={88} fill="#dedad3" textAnchor="middle" className="sk">1082-F</text>
                    <text x={200} y={88} fill="#dedad3" textAnchor="middle" className="sk">1082-G</text>
                    <circle className="sk-dot" cx={160} cy={146} r={9} fill="#256f82" />
                  </svg>
                </div>
                <dl className="facts" data-rise="" style={{ "--i": 2 } as CSSProperties}>
                  <div><dt>Block</dt><dd>C, Multi Gardens</dd></div>
                  <div><dt>Road</dt><dd>MR-11</dd></div>
                  <div><dt>Postcode</dt><dd>44000</dd></div>
                  <div><dt>Plus code</dt><dd>MRQC+39</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="jobs" id="jobs">
          <div className="wrap">
            <span className="eyebrow" data-rise="">What We Do</span>
            <SplitHeading className="head jobs__head" text="One office, five jobs" />
            {JOBS.map((job) => (
              <article className="job" key={job.title}>
                <div className="job__text" data-rise="">
                  <h3>{job.title}</h3>
                  <p>{job.text}</p>
                </div>
                <figure className="job__pic" data-open="">
                  <div className="frame">
                    <Image src={img(job.src)} width={job.w} height={job.h} quality={80} sizes="(max-width: 760px) 100vw, 50vw" alt={job.alt} />
                  </div>
                </figure>
              </article>
            ))}
          </div>
        </section>

        <Band>{bandCopy}{bandCopy}</Band>

        <section className="plan" id="plan">
          <div className="plan__bg">
            <ArtPicture alt="" wide={{ src: img("aerial-1920"), width: 1920, height: 1080 }} tall={{ src: img("aerial-portrait"), width: 998, height: 1080 }} />
          </div>
          <Planner />
        </section>

        <section className="build" id="build">
          <BuildRow />
        </section>

        <section className="list" id="sheet">
          <div className="list__bg">
            <Image src={img("blossom-1920")} width={1920} height={1280} quality={80} sizes="100vw" alt="" />
          </div>
          <div className="stamp">
            <span className="eyebrow" style={{ display: "block", textAlign: "center", justifyContent: "center" }} data-rise="">Full Services</span>
            <h2 className="stamp__title">The full sheet</h2>
            <p className="stamp__note">Everything we handle, in and around B-17 Multi Gardens.</p>
            {SHEET.map((group) => (
              <div className="stamp__group" key={group.name}>
                <h3>{group.name}</h3>
                <ul>
                  {group.items.map(([name, note, tag]) => (
                    <li key={name}>
                      <div><b>{name}</b><small>{note}</small></div>
                      <em>{tag}</em>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="stamp__end">
              Open 24 hours, every day
              <br />
              Plot 1082-F &amp; G, MR-11, Block C
            </p>
          </div>
        </section>

        <Team />

        <section className="visit" id="visit">
          <div className="visit__bg">
            <ArtPicture
              drift
              alt="Snow on the Margalla ridge, with Faisal Mosque small against the dark hills below"
              wide={{ src: img("ridge-2000"), width: 2000, height: 1094 }}
              tall={{ src: img("ridge-portrait"), width: 1080, height: 984 }}
            />
          </div>
          <div className="card">
            <span className="eyebrow" data-rise="">Visit Us</span>
            <h2>Come and see us</h2>
            <address>
              Plot 1082-F &amp; 1082-G, MR-11
              <br />
              Block C, B-17 Multi Gardens
              <br />
              Islamabad 44000
            </address>
            <dl className="card__rows">
              <div><dt>Every day</dt><dd>Open 24 hours</dd></div>
              <div><dt>In Islamabad now</dt><dd><Clock /></dd></div>
              <div><dt>Phone</dt><dd><a href={PHONE_TEL}>{PHONE_DISPLAY}</a></dd></div>
              <div>
                <dt>On Google</dt>
                <dd>
                  <a href={MAPS_LISTING} target="_blank" rel="noopener">
                    <span className="stars" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((n) => <i key={n} style={{ "--n": n } as CSSProperties} />)}
                    </span>{" "}
                    5.0, 1 review
                  </a>
                </dd>
              </div>
            </dl>
            <Btn wide label="Get directions" href={MAPS_DIRECTIONS} />
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot__top">
          <p><b>HSB Associates &amp; Builders</b><br />Real estate consultants and builders</p>
          <p>Plot 1082-F &amp; G, MR-11, Block C<br />B-17 Multi Gardens, Islamabad</p>
          <a className="foot__up" href="#hero"><span data-t="Back to top">Back to top</span></a>
        </div>
        <h2 className="foot__num">
          <a href={PHONE_TEL} aria-label={`Call ${PHONE_DISPLAY}`}>{PHONE_DISPLAY}</a>
        </h2>
        <div className="foot__meta">
          <a href={WA} target="_blank" rel="noopener">WhatsApp</a>
          <details>
            <summary>Picture credits</summary>
            <p>
              Pictures show Islamabad and the building trade, not HSB&apos;s own projects.{" "}
              {CREDITS.map(([href, title, rest]) => (
                <span key={href}>
                  <a href={href} target="_blank" rel="noopener">{title}</a> {rest}{" "}
                </span>
              ))}
              Licences: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">BY-SA 4.0</a>,{" "}
              <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">BY-SA 3.0</a>.
            </p>
          </details>
          <span>Islamabad, {new Date().getFullYear()}</span>
        </div>
      </footer>

      <Dock whatsapp={WA} />
    </>
  );
}
