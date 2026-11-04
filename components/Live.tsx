"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, tap } from "@/lib/site";

/** The time in Islamabad right now. */
export function Clock({ fallback = " " }: { fallback?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const read = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "numeric", minute: "2-digit", hour12: true })
          .format(new Date())
          .replace(/\s?am/i, " am")
          .replace(/\s?pm/i, " pm"),
      );
    read();
    const t = setInterval(read, 15000);
    return () => clearInterval(t);
  }, []);
  return <>{now ?? fallback}</>;
}

/** Kites circling over the Margalla Hills, and a slight parallax on the hero picture. */
export function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const sky = ref.current!;
    const ctx = sky.getContext("2d")!;
    let W = 0, H = 0, on = true, frame = 0, last = performance.now();
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = sky.clientWidth;
      H = sky.clientHeight;
      sky.width = W * dpr;
      sky.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    addEventListener("resize", size);
    const birds = Array.from({ length: innerWidth < 760 ? 6 : 10 }, (_, i) => ({
      x: Math.random(),
      y: 0.12 + Math.random() * 0.55,
      r: 28 + Math.random() * 40,
      s: 5 + Math.random() * 7,
      a: Math.random() * 6.28,
      sp: 0.1 + Math.random() * 0.18,
      wing: Math.random() * 6.28,
      big: 6 + Math.random() * 7,
      dir: i % 3 ? 1 : -1,
    }));
    const draw = (t: number) => {
      if (!on) return;
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(12,18,14,.82)";
      ctx.lineCap = "round";
      for (const b of birds) {
        b.a += b.sp * dt * b.dir;
        b.x += (b.s / Math.max(W, 1)) * dt;
        if (b.x > 1.08) b.x = -0.08;
        b.wing += dt * (1.4 + Math.sin(b.a) * 0.8);
        const px = b.x * W + Math.cos(b.a) * b.r, py = b.y * H + Math.sin(b.a) * b.r * 0.42;
        const flap = Math.sin(b.wing) * 0.34 + 0.3;
        ctx.lineWidth = Math.max(1.1, b.big * 0.2);
        ctx.beginPath();
        ctx.moveTo(px - b.big, py - b.big * flap);
        ctx.quadraticCurveTo(px - b.big * 0.4, py - b.big * 0.14, px, py);
        ctx.quadraticCurveTo(px + b.big * 0.4, py - b.big * 0.14, px + b.big, py - b.big * flap);
        ctx.stroke();
      }
      frame = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = on;
      on = e.isIntersecting;
      if (on && !was) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    });
    io.observe(sky);
    frame = requestAnimationFrame(draw);

    const view = document.getElementById("heroView");
    const hero = document.getElementById("hero");
    const onScroll = () => {
      if (view && hero && scrollY < hero.offsetHeight) view.style.transform = `translate3d(0,${scrollY * 0.05}px,0)`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      on = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      removeEventListener("resize", size);
      removeEventListener("scroll", onScroll);
    };
  }, []);
  return <canvas className="hero__sky" ref={ref} aria-hidden="true" />;
}

/** The marquee walks on its own and quickens with the scroll. */
export function Band({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !track.current) return;
    const anim = track.current.getAnimations()[0];
    if (!anim) return;
    let speed = 0, rate = 1, lastY = scrollY, frame = 0, on = false;
    const onScroll = () => {
      speed = Math.min(5, Math.abs(scrollY - lastY) / 14);
      lastY = scrollY;
    };
    const loop = () => {
      speed *= 0.94;
      rate += (1 + speed - rate) * 0.08;
      anim.playbackRate = rate;
      if (on) frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = on;
      on = e.isIntersecting;
      if (on && !was) frame = requestAnimationFrame(loop);
    });
    io.observe(track.current);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      on = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track" ref={track}>
        {children}
      </div>
    </div>
  );
}

/**
 * The page-wide layer: reveals on entry, picture loaders, slow photo drift, button loader and pull.
 * It only adds classes and styles to server-rendered markup, so everything reads without it.
 */
export function PageMotion() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    $$("[data-split], [data-rise], [data-open], .stamp li, .card").forEach((el) => io.observe(el));

    const cleanups: (() => void)[] = [() => io.disconnect()];

    $$<HTMLImageElement>(".frame img").forEach((img) => {
      const frame = img.closest(".frame")!;
      const done = () => frame.classList.add("is-loaded");
      if (img.complete && img.naturalWidth) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });

    const timers = new Map<Element, ReturnType<typeof setTimeout>>();
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest?.(".btn[data-load]");
      if (!btn) return;
      tap();
      btn.classList.add("is-loading");
      clearTimeout(timers.get(btn));
      timers.set(btn, setTimeout(() => btn.classList.remove("is-loading"), 1500));
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    if (!reduce) {
      const active = new Set<HTMLElement>();
      let frame = 0;
      const loop = () => {
        active.forEach((img) => {
          const box = img.closest(".frame, .visit__bg");
          if (!box) return;
          const r = box.getBoundingClientRect();
          const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
          img.style.transform = `scale(1.08) translate3d(0,${(p * -3.6).toFixed(2)}%,0)`;
        });
        frame = active.size ? requestAnimationFrame(loop) : 0;
      };
      const dIO = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting) active.add(e.target as HTMLElement);
          else active.delete(e.target as HTMLElement);
        });
        if (active.size && !frame) frame = requestAnimationFrame(loop);
      });
      $$("[data-drift]").forEach((d) => dIO.observe(d));
      cleanups.push(() => {
        dIO.disconnect();
        cancelAnimationFrame(frame);
      });

      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const onMove = (e: PointerEvent) => {
          const b = (e.target as Element).closest?.(".btn") as HTMLElement | null;
          if (!b) return;
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.08}px, ${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
        };
        const onOut = (e: PointerEvent) => {
          const b = (e.target as Element).closest?.(".btn") as HTMLElement | null;
          if (b && !b.contains(e.relatedTarget as Node)) b.style.transform = "";
        };
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerout", onOut);
        cleanups.push(() => {
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerout", onOut);
        });
      }
    }
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
