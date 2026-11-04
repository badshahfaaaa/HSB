"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion, tap, WA, waText } from "@/lib/site";
import { Btn, SplitHeading } from "./ui";

type Intent = "buy" | "build" | "sell";
type Room = [label: string, share: number];
type Row = { depth: number; rooms: Room[] };

const SIZES = [
  { name: "5 Marla", w: 25, d: 50 },
  { name: "7 Marla", w: 30, d: 60 },
  { name: "10 Marla", w: 35, d: 70 },
  { name: "14 Marla", w: 40, d: 80 },
  { name: "1 Kanal", w: 50, d: 90 },
];

// Rooms run from the road upward. 5 and 7 Marla: 4 bedrooms. 10 Marla: 5. 14 Marla: 6. 1 Kanal: 7.
const G: Row[] = [
  { depth: 0.3, rooms: [["Porch", 0.46], ["Drawing", 0.54]] },
  { depth: 0.38, rooms: [["Lounge", 1]] },
  { depth: 0.32, rooms: [["Kitchen", 0.42], ["Bed", 0.58]] },
];
const GM: Row[] = [
  { depth: 0.3, rooms: [["Porch", 0.46], ["Drawing", 0.54]] },
  { depth: 0.38, rooms: [["Lounge", 0.58], ["Bed", 0.42]] },
  { depth: 0.32, rooms: [["Kitchen", 0.42], ["Bed", 0.58]] },
];
const GL: Row[] = [
  { depth: 0.26, rooms: [["Porch", 0.34], ["Drawing", 0.36], ["Dining", 0.3]] },
  { depth: 0.4, rooms: [["Lounge", 0.5], ["Bed", 0.5]] },
  { depth: 0.34, rooms: [["Kitchen", 0.34], ["Bed", 0.33], ["Bed", 0.33]] },
];
const F: Row[] = [
  { depth: 0.3, rooms: [["Terrace", 0.46], ["Bed", 0.54]] },
  { depth: 0.38, rooms: [["Lounge", 0.58], ["Bed", 0.42]] },
  { depth: 0.32, rooms: [["Store", 0.42], ["Bed", 0.58]] },
];
const FM: Row[] = [
  { depth: 0.26, rooms: [["Terrace", 0.34], ["Bed", 0.66]] },
  { depth: 0.4, rooms: [["Lounge", 0.5], ["Bed", 0.5]] },
  { depth: 0.34, rooms: [["Bed", 0.62], ["Store", 0.38]] },
];
const FL: Row[] = [
  { depth: 0.26, rooms: [["Terrace", 0.34], ["Bed", 0.66]] },
  { depth: 0.4, rooms: [["Lounge", 0.5], ["Bed", 0.5]] },
  { depth: 0.34, rooms: [["Bed", 0.34], ["Bed", 0.33], ["Store", 0.33]] },
];
const plans = (i: number, floor: number) => (floor ? [F, F, F, FM, FL][i] : [G, G, GM, GL, GL][i]);
const countBeds = (i: number) =>
  [0, 1].reduce((n, f) => n + plans(i, f).reduce((m, r) => m + r.rooms.filter((c) => c[0] === "Bed").length, 0), 0);

const FRONT = 0.16, REAR = 0.08;
const builtOf = (i: number) => SIZES[i].w * SIZES[i].d * (1 - FRONT - REAR) * 2;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

const VW = 60, VH = 108, ROAD = 10;
const INK = "#0a0a0a", BG = "#dedad3", GHOST = "#cfc9c0", WALL = "#ecebe7", LAWN = "#7c9a7a", OPEN = "#bdb6aa", PEG = "#256f82";

type View = { w: number; d: number; area: number; built: number; settled: boolean };

function PlanDrawing({ view, size, floor }: { view: View; size: number; floor: number }) {
  const { w, d, settled } = view;
  const x0 = (VW - w) / 2, yBase = VH - ROAD;
  const bh = d * (1 - FRONT - REAR);
  let y = yBase - d * FRONT;
  const rooms: React.ReactNode[] = [];
  plans(size, floor).forEach((row, ri) => {
    const rh = bh * row.depth;
    let x = x0 + 0.5;
    const iw = w - 1;
    row.rooms.forEach(([label, share], ci) => {
      const cw = iw * share;
      const open = label === "Porch" || label === "Terrace";
      rooms.push(
        <g key={`${ri}-${ci}`}>
          <rect x={x + 0.2} y={y - rh + 0.2} width={cw - 0.4} height={rh - 0.4} fill={open ? OPEN : WALL} stroke={INK} strokeWidth={0.55} />
          {settled ? (
            <text
              className="rl"
              x={x + cw / 2}
              y={y - rh / 2 + 1.1}
              textAnchor="middle"
              fill={INK}
              fontSize={w < 30 ? 2.9 : 3.3}
              style={{ "--k": ri * 2 + ci } as CSSProperties}
            >
              {label}
            </text>
          ) : null}
        </g>,
      );
      x += cw;
    });
    y -= rh;
  });
  return (
    <svg id="planSvg" viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label={`Scale drawing of a ${SIZES[size].name} plot with a sketch of a house, ${floor ? "first" : "ground"} floor`}>
      <rect x={(VW - 50) / 2} y={yBase - 90} width={50} height={90} fill={GHOST} />
      {size < 4 ? <text x={VW / 2} y={yBase - 90 + 4.6} textAnchor="middle" fill={INK} fontSize={3.2}>1 Kanal, for scale</text> : null}
      <rect x={0} y={yBase} width={VW} height={ROAD} fill={INK} />
      <text x={VW / 2} y={yBase + 6.4} textAnchor="middle" fill={BG} fontSize={3.6}>
        Road
      </text>
      <rect x={x0} y={yBase - d} width={w} height={d} fill={LAWN} />
      <g className="rooms" key={floor}>
        {rooms}
      </g>
      {[[x0, yBase - d], [x0 + w, yBase - d], [x0 + w, yBase], [x0, yBase]].map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={1.05} fill={PEG} />
      ))}
      <text x={VW / 2} y={yBase - d - 2} textAnchor="middle" fill={INK} fontSize={3.6} fontWeight={600}>
        {Math.round(w)} ft wide
      </text>
      <text transform={`translate(${x0 - 2.4} ${yBase - d / 2}) rotate(-90)`} textAnchor="middle" fill={INK} fontSize={3.6} fontWeight={600}>
        {Math.round(d)} ft deep
      </text>
    </svg>
  );
}

export function Planner() {
  const [size, setSize] = useState(0);
  const [floor, setFloor] = useState(0);
  const [intent, setIntent] = useState<Intent>("buy");
  const [view, setView] = useState<View>({ w: 25, d: 50, area: 1250, built: builtOf(0), settled: true });
  const viewRef = useRef(view);
  const raf = useRef(0);
  const drawRef = useRef<HTMLDivElement>(null);
  const slipsRef = useRef<HTMLDivElement>(null);

  const morph = useCallback((i: number, from?: View) => {
    cancelAnimationFrame(raf.current);
    const to = { w: SIZES[i].w, d: SIZES[i].d, area: SIZES[i].w * SIZES[i].d, built: builtOf(i) };
    const put = (v: View) => {
      viewRef.current = v;
      setView(v);
    };
    if (prefersReducedMotion()) {
      put({ ...to, settled: true });
      return;
    }
    const a = from ?? viewRef.current;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 820);
      const e = 1 - Math.pow(1 - p, 4);
      put({
        w: a.w + (to.w - a.w) * e,
        d: a.d + (to.d - a.d) * e,
        area: a.area + (to.area - a.area) * e,
        built: a.built + (to.built - a.built) * e,
        settled: p === 1,
      });
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  // The first time it is seen, the plot grows out of nothing, which also shows that it moves.
  useEffect(() => {
    if (prefersReducedMotion() || !drawRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        morph(0, { w: 8, d: 16, area: 0, built: 0, settled: false });
      },
      { threshold: 0.35 },
    );
    io.observe(drawRef.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [morph]);

  const choose = (i: number, el: HTMLElement) => {
    tap();
    const strip = slipsRef.current;
    if (strip && strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({
        left: el.offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
    if (i === size) return;
    setSize(i);
    morph(i);
  };

  const s = SIZES[size];
  const verb = {
    buy: `buy a ${s.name} plot in B-17`,
    build: `build a house on a ${s.name} plot in B-17`,
    sell: `sell my ${s.name} plot in B-17`,
  }[intent];
  const label = {
    buy: `Ask about buying ${s.name}`,
    build: `Ask about building on ${s.name}`,
    sell: `Ask about selling ${s.name}`,
  }[intent];

  return (
    <>
      <div className="wrap plan__grid">
        <div className="plan__intro">
          <SplitHeading text="Size up your plot" />
          <p className="lead" data-rise="">
            Pick a size. The plot redraws to scale, with a first sketch of the house that could stand on it.
          </p>
          <div className="seg" role="group" aria-label="What do you want to do with this plot?" data-rise="">
            {(
              [
                ["buy", "Buy it"],
                ["build", "Build on it"],
                ["sell", "Sell it"],
              ] as [Intent, string][]
            ).map(([k, text]) => (
              <button
                key={k}
                type="button"
                className="seg__b"
                aria-pressed={intent === k}
                onClick={() => {
                  tap();
                  setIntent(k);
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div className="sheetlet" data-ui="" data-rise="">
          <div className="sheetlet__draw" ref={drawRef}>
            <PlanDrawing view={view} size={size} floor={floor} />
          </div>
          <div className="sheetlet__read">
            <div className="seg seg--ink" role="group" aria-label="Which floor to show">
              {["Ground floor", "First floor"].map((text, i) => (
                <button
                  key={text}
                  type="button"
                  className="seg__b"
                  aria-pressed={floor === i}
                  onClick={() => {
                    tap();
                    setFloor(i);
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
            <dl className="read" aria-live="polite">
              <div><dt>Plot</dt><dd>{s.name}</dd></div>
              <div><dt>Measures</dt><dd>{s.w} × {s.d} ft</dd></div>
              <div><dt>Land</dt><dd>{fmt(view.area)} sq ft</dd></div>
              <div><dt>Built, two floors</dt><dd>{fmt(Math.round(view.built / 10) * 10)} sq ft</dd></div>
              <div><dt>Bedrooms</dt><dd>{countBeds(size)}</dd></div>
            </dl>
            <Btn wide id="planCta" href={waText(`Assalam o Alaikum, I would like to ${verb}. Please advise.`)} label={label} />
            <p className="note">A sketch for scale, not an approved drawing. These are the usual sizes; we confirm every plot against its file.</p>
          </div>
        </div>
      </div>

      <div className="slips" ref={slipsRef} role="group" aria-label="Plot size">
        {SIZES.map((z, i) => (
          <button key={z.name} type="button" className="slip" data-size={i} aria-pressed={size === i} onClick={(e) => choose(i, e.currentTarget)}>
            <b>{z.name}</b>
            <span className="slip__dash">- - - - - - -</span>
            <span>{z.w} × {z.d} ft</span>
            <span>{fmt(z.w * z.d)} sq ft</span>
          </button>
        ))}
        <a className="slip slip--ask" href={waText("Assalam o Alaikum, I have a plot of a different size in B-17 and would like your advice.") || WA} target="_blank" rel="noopener">
          <b>Other size?</b>
          <span className="slip__dash">- - - - - - -</span>
          <span>2 Kanal, a corner, a shop plot. Ask us.</span>
        </a>
      </div>
    </>
  );
}
