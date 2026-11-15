"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PHONE_DISPLAY, PHONE_TEL, prefersReducedMotion, tap } from "@/lib/site";

const LINKS = [
  ["#jobs", "What we do"],
  ["#plan", "Plan a plot"],
  ["#build", "How we build"],
  ["#team", "Team"],
  ["#visit", "Visit"],
];
const MENU = [
  ["#jobs", "What we do"],
  ["#plan", "Plan a plot"],
  ["#build", "How we build"],
  ["#sheet", "The full sheet"],
  ["#team", "Team"],
  ["#visit", "Visit"],
];

export function Header() {
  const topRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false); // menu wanted
  const [mounted, setMounted] = useState(false); // still in the DOM while closing
  const [shown, setShown] = useState(false); // the clip-path has been opened

  useEffect(() => {
    let queued = false;
    const onScroll = () => {
      queued = false;
      const top = topRef.current, hero = document.getElementById("hero");
      if (!top || !hero) return;
      const y = scrollY;
      top.classList.toggle("is-solid", y > hero.offsetHeight - 70);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const handler = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(onScroll);
      }
    };
    addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    openRef.current = open;
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("locked", open);
    if (open) {
      topRef.current?.classList.remove("is-solid");
      setMounted(true);
      const f = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(f);
        removeEventListener("keydown", onKey);
      };
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), prefersReducedMotion() ? 0 : 640);
    return () => clearTimeout(t);
  }, [open]);

  const toggle = () => {
    tap();
    setOpen((o) => !o);
  };

  return (
    <>
      <header className="top" ref={topRef}>
        <a className="top__mark" href="#hero" aria-label="HSB Associates and Builders, back to top">
          HSB
        </a>
        <nav className="top__links" aria-label="Main">
          {LINKS.map(([href, label]) => (
            <a href={href} key={href}>
              <span data-t={label}>{label}</span>
            </a>
          ))}
        </nav>
        <a className="top__call" href={PHONE_TEL}>
          <span data-t={`Call ${PHONE_DISPLAY}`}>Call {PHONE_DISPLAY}</span>
        </a>
        <button className="top__menu" type="button" aria-expanded={open} aria-controls="menu" onClick={toggle}>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <i className="top__progress" ref={progressRef} />
      </header>

      <div className={`menu${shown ? " is-open" : ""}`} id="menu" hidden={!mounted}>
        <nav aria-label="Menu">
          {MENU.map(([href, label], i) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              <span style={{ "--i": i } as CSSProperties}>{label}</span>
            </a>
          ))}
        </nav>
        <p className="menu__foot">
          Plot 1082-F &amp; G, MR-11, Block C
          <br />
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
        </p>
      </div>
    </>
  );
}

/** Call and WhatsApp under the thumb on phones, once past the hero and until the contact card. */
export function Dock({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const visit = document.getElementById("visit");
      if (!ref.current || !visit) return;
      ref.current.classList.toggle("is-on", scrollY > innerHeight * 0.9 && visit.getBoundingClientRect().top > innerHeight * 0.55);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="dock" ref={ref}>
      <a className="dock__call" href={PHONE_TEL}>
        Call
      </a>
      <a className="dock__wa" href={whatsapp} target="_blank" rel="noopener">
        WhatsApp
      </a>
    </div>
  );
}
