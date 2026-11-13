"use client";

import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/site";
import { SplitHeading } from "./ui";

const STAGES = [
  { t: "You call us", p: "Call any time, day or night. Tell us the block, the size, and whether you want to buy, sell or build.", space: 110, sm: 44 },
  { t: "We walk the plot", p: "We meet you at the plot and mark out the corners, so you can stand on the land before you decide.", space: 44, sm: 20 },
  { t: "The file is checked", p: "We check ownership, dues and society papers line by line, so you know the plot is clean before any money is paid.", space: 140, sm: 56 },
  { t: "Drawings first", p: "Rooms, windows, parking and the front of the house, all drawn on paper while changes are still free.", space: 72, sm: 30 },
  { t: "The foundation", p: "Digging, footings and the base. Most of what holds the house up goes in here, out of sight.", space: 120, sm: 48 },
  { t: "The grey structure", p: "Columns, slabs and brick walls go up. You can walk through your own rooms at this stage.", space: 56, sm: 24 },
  { t: "Finishing", p: "Plaster, floors, doors, windows and kitchen. The bare walls turn into a home.", space: 132, sm: 52 },
  { t: "The keys", p: "A final walk-through together, any remaining issues fixed, and the keys are yours.", space: 64, sm: 28 },
];

// A day passes along the row: dawn at the first call, night with the lights on at the keys.
const SKY = ["#e6ecea", "#d9e8ea", "#c9e1e8", "#bcdbe6", "#b4d6e4", "#ecd9bd", "#e9b48f", "#1f2c45"];
const HILL1 = ["#a9bda9", "#a0b9a3", "#97b49c", "#8fb096", "#8aad92", "#a3a57f", "#8f7f6a", "#2a3a4c"];
const HILL2 = ["#6d8f72", "#648b6b", "#5b8664", "#55825f", "#507d5a", "#6d7b54", "#5e5645", "#18242f"];

const Pegs = () => (
  <>
    {[70, 330].map((x) => (
      <g key={x}>
        <rect x={x - 3} y={374} width={6} height={34} fill="#256f82" />
        <circle cx={x} cy={372} r={7} fill="#256f82" />
      </g>
    ))}
  </>
);
const Found = () => (
  <>
    <rect x={58} y={392} width={284} height={14} fill="#5c5852" />
    {[70, 192, 314].map((x) => <rect key={x} x={x} y={406} width={16} height={30} fill="#79746b" />)}
  </>
);
const Walls = () => (
  <>
    <rect x={70} y={212} width={261} height={182} fill="#ecebe7" />
    <rect x={60} y={300} width={281} height={10} fill="#c4bfb5" />
    <rect x={60} y={204} width={281} height={12} fill="#0a0a0a" />
  </>
);
const Openings = () => (
  <>
    {[[94, 234, 48], [176, 234, 130], [94, 328, 48], [256, 328, 50]].map(([x, y, w]) => (
      <rect key={`${x}${y}`} x={x} y={y} width={w} height={50} fill="#2f5a66" />
    ))}
    <rect x={176} y={326} width={48} height={68} fill="#0a0a0a" />
  </>
);

function layers(i: number): ReactNode {
  switch (i) {
    case 0:
      return <g className="new"><rect x={60} y={400} width={280} height={8} fill="#79746b" /></g>;
    case 1:
      return (
        <>
          <g className="new"><Pegs /></g>
          <path className="draw" pathLength={1} d="M70 378H330" stroke="#0a0a0a" strokeWidth={2} fill="none" />
        </>
      );
    case 2:
      return (
        <>
          <Pegs />
          <g className="new">
            <g>
              <g transform="translate(120 250)">
                <rect width={160} height={128} fill="#ecebe7" />
                <rect x={16} y={20} width={96} height={6} fill="#0a0a0a" />
                {[38, 52].map((y) => <rect key={y} x={16} y={y} width={128} height={4} fill="#5c5852" />)}
                <rect x={16} y={66} width={86} height={4} fill="#5c5852" />
                <circle cx={118} cy={96} r={20} fill="#256f82" />
                <path d="m108 96 7 7 13-14" stroke="#fff" strokeWidth={3.5} fill="none" />
              </g>
            </g>
          </g>
        </>
      );
    case 3:
      return (
        <>
          <Pegs />
          <path className="draw" pathLength={1} d="M70 404V210h260v194M70 305h260M150 210v194M250 210v194M178 404v-58h44v58M60 210h280" stroke="#0a0a0a" strokeWidth={2.4} fill="none" />
        </>
      );
    case 4:
      return <g className="new"><Found /></g>;
    case 5:
      return (
        <>
          <Found />
          <g className="new">
            {[70, 150, 250, 320].map((x) => <rect key={x} x={x} y={212} width={11} height={182} fill="#79746b" />)}
            <rect x={60} y={300} width={280} height={12} fill="#5c5852" />
            <rect x={60} y={204} width={280} height={12} fill="#5c5852" />
            <rect x={81} y={312} width={69} height={82} fill="#a0634a" />
            <rect x={261} y={312} width={59} height={82} fill="#a0634a" />
            <rect x={161} y={236} width={89} height={66} fill="#a0634a" />
          </g>
        </>
      );
    case 6:
      return (
        <>
          <Found />
          <g className="new"><g><Walls /><Openings /></g></g>
        </>
      );
    default:
      return (
        <>
          <Found />
          <Walls />
          <Openings />
          <rect className="glow" x={94} y={234} width={48} height={50} fill="#f3d98a" />
          <rect className="glow" x={176} y={234} width={130} height={50} fill="#f3d98a" style={{ animationDelay: ".8s" }} />
          <rect className="glow" x={94} y={328} width={48} height={50} fill="#f3d98a" style={{ animationDelay: "1.5s" }} />
          <g className="new">
            <rect x={20} y={370} width={30} height={34} fill="#c4bfb5" />
            <rect x={350} y={370} width={30} height={34} fill="#c4bfb5" />
            <rect x={32} y={310} width={6} height={60} fill="#3a2d22" />
            <circle cx={35} cy={298} r={26} fill="#3f5f49" />
            <circle cx={365} cy={316} r={18} fill="#3f5f49" />
          </g>
        </>
      );
  }
}

function StageDrawing({ i }: { i: number }) {
  const night = i === 7;
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={`Drawing of a house at the stage: ${STAGES[i].t}`} preserveAspectRatio="xMidYMax slice">
      <rect width={400} height={500} fill={SKY[i]} />
      <circle cx={340 - i * 40} cy={150 - Math.round(Math.sin((i / 7) * 3.14) * 80)} r={night ? 22 : 32} fill={night ? "#ecebe7" : i > 4 ? "#f6e3b8" : "#f8f6f0"} />
      <path className="bird" d="M0 120q8-8 14 0q6-8 14 0" fill="none" stroke={night ? "#ecebe7" : "#0a0a0a"} strokeWidth={2} />
      <path d="M0 300 60 240l40 26 56-62 52 44 44-30 58 50 50-36 40 30v138H0z" fill={HILL1[i]} />
      <path d="M0 340l70-40 60 22 80-50 70 44 60-26 60 30v80H0z" fill={HILL2[i]} />
      <rect y={404} width={400} height={96} fill="#22211e" />
      {layers(i)}
    </svg>
  );
}

export function BuildRow() {
  const row = useRef<HTMLOListElement>(null);
  const meter = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = row.current!;
    const setMeter = () => {
      const max = el.scrollWidth - el.clientWidth;
      const seen = el.clientWidth / el.scrollWidth;
      if (meter.current) meter.current.style.transform = `scaleX(${Math.min(1, seen + (1 - seen) * (max > 0 ? el.scrollLeft / max : 0)) })`;
    };
    el.addEventListener("scroll", setMeter, { passive: true });
    addEventListener("resize", setMeter);
    setMeter();

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("go"); }),
      { threshold: 0.45 },
    );
    el.querySelectorAll(".stage").forEach((s) => io.observe(s));

    // Mouse drag; touch already scrolls natively.
    let dragging = false, sx = 0, sl = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      sx = e.clientX;
      sl = el.scrollLeft;
      el.classList.add("is-drag");
    };
    const move = (e: PointerEvent) => { if (dragging) el.scrollLeft = sl - (e.clientX - sx); };
    const up = () => {
      if (dragging) {
        dragging = false;
        el.classList.remove("is-drag");
      }
    };
    el.addEventListener("pointerdown", down);
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    return () => {
      io.disconnect();
      el.removeEventListener("scroll", setMeter);
      removeEventListener("resize", setMeter);
      el.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
    };
  }, []);

  const stepBy = (dir: number) => {
    const el = row.current!;
    const col = el.querySelector<HTMLElement>(".stage")!;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 32;
    el.scrollBy({ left: dir * (col.offsetWidth + gap), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); stepBy(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); stepBy(-1); }
  };

  return (
    <>
      <div className="wrap build__top">
        <SplitHeading text="From call to keys" />
        <div className="build__arrows">
          <button type="button" aria-label="Previous stage" onClick={() => stepBy(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" /></svg>
          </button>
          <button type="button" aria-label="Next stage" onClick={() => stepBy(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" /></svg>
          </button>
        </div>
      </div>
      <div className="wrap"><div className="meter"><i ref={meter} /></div></div>
      <ol className="row" ref={row} tabIndex={0} onKeyDown={onKey} aria-label="The stages from your first call to the keys">
        {STAGES.map((st, i) => (
          <li className="stage" key={st.t} style={{ "--space": `${st.space}px`, "--space-sm": `${st.sm}px` } as CSSProperties}>
            <h3>{st.t}</h3>
            <p>{st.p}</p>
            <div className="stage__space" />
            <div className="stage__draw"><StageDrawing i={i} /></div>
          </li>
        ))}
      </ol>
    </>
  );
}
