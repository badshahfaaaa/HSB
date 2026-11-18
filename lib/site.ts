export const PHONE_DISPLAY = "0335 9548102";
export const PHONE_TEL = "tel:+923359548102";
export const WA = "https://wa.me/923359548102";
export const waText = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;
export const MAPS_LISTING = "https://www.google.com/maps/search/?api=1&query=HSB+Associates+%26+Builders+B-17+Islamabad";
export const MAPS_DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=MRQC%2B39+Islamabad";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A very short buzz under the thumb, on phones that support it. */
export const tap = () => {
  try {
    navigator.vibrate?.(8);
  } catch {
    /* not allowed here; the visual feedback is enough */
  }
};
