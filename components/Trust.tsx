"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/site";

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 25, suffix: "+", label: "Properties Sold" },
];

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) {
      setN(target);
      return;
    }
    if (prefersReducedMotion()) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      setN(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return n;
}

function StatBadge({ stat, run, i }: { stat: Stat; run: boolean; i: number }) {
  const n = useCountUp(stat.value, run);
  return (
    <div className="trust__badge" data-rise="" style={{ "--i": i } as React.CSSProperties}>
      <div className="trust__num">
        <span className="trust__value">{n}</span>
        <span className="trust__suffix">{stat.suffix}</span>
      </div>
      <div className="trust__label">{stat.label}</div>
    </div>
  );
}

export function Trust() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRun(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="trust" id="trust" ref={ref} aria-label="Our track record">
      <div className="wrap trust__wrap">
        {STATS.map((s, i) => (
          <StatBadge key={s.label} stat={s} run={run} i={i} />
        ))}
      </div>
    </section>
  );
}
