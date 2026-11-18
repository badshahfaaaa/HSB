import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

/** Button with a rolling label, a rising fill, and a plot-perimeter loader. Behaviour lives in <PageMotion>. */
export function Btn({
  href,
  label,
  accent = true,
  wide = false,
  id,
}: {
  href: string;
  label: string;
  accent?: boolean;
  wide?: boolean;
  id?: string;
}) {
  return (
    <a
      id={id}
      className={`btn${accent ? " btn--accent" : ""}${wide ? " btn--wide" : ""}`}
      data-load
      href={href}
      target="_blank"
      rel="noopener"
    >
      <span className="btn__roll">
        <span data-t={label}>{label}</span>
      </span>
      <span className="btn__go">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12h17M14 5l7 7-7 7" />
        </svg>
        <svg className="btn__trace" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" />
        </svg>
      </span>
    </a>
  );
}

/** Masked per-character type, split on the server so the markup is identical before and after scripts. */
export function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  let n = start;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="w" aria-hidden="true">
            {[...word].map((ch, k) => (
              <span className="c" key={k} style={{ "--n": n++ } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function SplitHeading({ text, className = "head" }: { text: string; className?: string }) {
  return (
    <h2 className={className} data-split="">
      <span className="sr">{text}</span>
      <SplitWords text={text} />
    </h2>
  );
}

/** A photograph with a different crop for phones. */
export function ArtPicture({
  alt,
  wide,
  tall,
  priority = false,
  drift = false,
  id,
}: {
  alt: string;
  wide: { src: string; width: number; height: number };
  tall: { src: string; width: number; height: number };
  priority?: boolean;
  drift?: boolean;
  id?: string;
}) {
  const common = { alt, sizes: "100vw", quality: 80 };
  const { props: wideProps } = getImageProps({ ...common, ...wide });
  const { props: tallProps } = getImageProps({ ...common, ...tall });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { srcSet: wideSet, style: _style, ...rest } = wideProps;
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={tallProps.srcSet} />
      <source media="(min-width: 761px)" srcSet={wideSet} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        id={id}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        data-drift={drift ? "" : undefined}
      />
    </picture>
  );
}
