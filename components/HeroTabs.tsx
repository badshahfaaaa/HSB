"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, tap } from "@/lib/site";

const HOLD = 5000;

/**
 * Names the place in the hero picture and moves between the photographs. They change by themselves until
 * someone chooses one, which stops the rotation. They never rotate under reduced motion.
 */
export function HeroTabs({ places }: { places: string[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    document.querySelectorAll(".hero__slide").forEach((s, i) => s.classList.toggle("is-on", i === active));
  }, [active]);

  useEffect(() => {
    if (!auto || places.length < 2) return;
    if (prefersReducedMotion()) {
      setAuto(false);
      return;
    }
    const t = setInterval(() => {
      if (!document.hidden && scrollY < innerHeight) setActive((a) => (a + 1) % places.length);
    }, HOLD);
    return () => clearInterval(t);
  }, [auto, places.length]);

  return (
    <div className="hero__tabs">
      <span className="hero__place" aria-live="polite">{places[active]}</span>
      {places.length > 1 ? (
        <div className="hero__segs" role="group" aria-label="Choose the hero photo">
          {places.map((place, i) => (
            <button
              key={i}
              type="button"
              className={`hero__seg${i === active ? " is-on" : ""}${auto ? " is-auto" : ""}`}
              aria-label={`${place}, photo ${i + 1} of ${places.length}`}
              aria-pressed={i === active}
              onClick={() => {
                tap();
                setAuto(false);
                setActive(i);
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
