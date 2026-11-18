"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/site";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * The landing animation. Four pegs drop, a string runs round the plot, the count climbs to 1082 (HSB's own
 * plot number), the name rises, then the screen splits into parcels that lift off the view. 1082-F and
 * 1082-G, in teal, are the last to go. A tap or any key skips it.
 */
export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (prefersReducedMotion() || location.search.includes("nointro")) {
      html.classList.add("hero-in");
      setGone(true);
      return;
    }
    const root = rootRef.current!, cellsEl = cellsRef.current!, stage = stageRef.current!, count = countRef.current!;
    const phone = innerWidth <= 760;
    const cols = phone ? 3 : 6, rows = phone ? 6 : 4;
    const oursA = phone ? [2, 0] : [1, 2], oursB = phone ? [2, 1] : [1, 3]; // [row, column]
    cellsEl.innerHTML = "";
    cellsEl.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    cellsEl.style.gridTemplateRows = `repeat(${rows},1fr)`;
    const cells: { d: HTMLDivElement; r: number; c: number; ours: boolean }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = document.createElement("div");
        d.className = "intro__cell";
        const isA = r === oursA[0] && c === oursA[1], isB = r === oursB[0] && c === oursB[1];
        if (isA || isB) {
          d.classList.add("is-ours");
          const label = document.createElement("span");
          label.textContent = `1082-${isA ? "F" : "G"}`;
          d.appendChild(label);
        }
        d.style.transformOrigin = r < rows / 2 ? "top" : "bottom";
        cellsEl.appendChild(d);
        cells.push({ d, r, c, ours: isA || isB });
      }
    }

    let done = false;
    const started = performance.now();
    const tick = (t: number) => {
      if (done) return;
      const p = Math.min(1, (t - started) / 1500);
      count.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * 1082)).padStart(4, "0");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const finish = async () => {
      if (done) return;
      done = true;
      count.textContent = "1082";
      stage.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(1.04)" }], {
        duration: 300,
        easing: "cubic-bezier(0.55,0.055,0.675,0.19)",
        fill: "forwards",
      });
      await sleep(180);
      root.classList.add("is-open");
      html.classList.remove("intro-on");
      html.classList.add("hero-in");
      const cx = oursA[1] + 0.5, cy = oursA[0];
      const anims = cells.map(({ d, r, c, ours }) => {
        const delay = ours ? 520 : Math.max(0, 360 - Math.hypot(c - cx, r - cy) * 70);
        return d.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], {
          duration: 600,
          delay,
          easing: "cubic-bezier(.76,0,.24,1)",
          fill: "forwards",
        }).finished;
      });
      await Promise.all(anims).catch(() => {});
      html.classList.remove("intro-play");
      setGone(true);
    };

    root.addEventListener("pointerdown", finish);
    addEventListener("keydown", finish);

    // Plays through, and waits for the hero picture when it is slow, but never past 3.4s.
    const hero = document.getElementById("heroImg") as HTMLImageElement | null;
    const ready = !hero || hero.complete
      ? Promise.resolve()
      : new Promise<void>((r) => {
          hero.addEventListener("load", () => r(), { once: true });
          hero.addEventListener("error", () => r(), { once: true });
        });
    ready.then(() => sleep(Math.max(0, 2150 - (performance.now() - started)))).then(finish);
    const cap = setTimeout(finish, 3400);

    return () => {
      clearTimeout(cap);
      root.removeEventListener("pointerdown", finish);
      removeEventListener("keydown", finish);
    };
  }, []);

  if (gone) return null;
  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      <div className="intro__cells" ref={cellsRef} />
      <div className="intro__stage" ref={stageRef}>
        <div className="intro__plot">
          <svg className="intro__string" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect x="0" y="0" width="100" height="100" pathLength={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <i className="peg peg--a" />
          <i className="peg peg--b" />
          <i className="peg peg--c" />
          <i className="peg peg--d" />
          <div className="intro__name">
            <div className="intro__hsb">
              <span>H</span>
              <span>S</span>
              <span>B</span>
            </div>
            <div className="intro__sub">
              <span>Associates &amp; Builders</span>
            </div>
          </div>
        </div>
        <div className="intro__count">
          Plot <b ref={countRef}>0000</b>
        </div>
      </div>
    </div>
  );
}
