/**
 * The hero photographs, in the order they play. The hero only shows B-17 and Faisal Hills.
 *
 * To add one: put the file in public/assets/img/ and add an entry here with its place and what it shows.
 * `wide` is used on desktop and `tall` on phones; pass the same file to both if there is only one.
 * Any size works, since it is compressed automatically. The controls under the name update themselves.
 */
export type HeroImage = { src: string; width: number; height: number };
export type HeroPhoto = {
  place: "B-17" | "Faisal Hills";
  alt: string;
  wide: HeroImage;
  tall: HeroImage;
  /** "whole": the picture is shown complete on a black ground, for a subject that must not be cropped. */
  fit?: "whole";
};

const img = (name: string, width: number, height: number): HeroImage => ({
  src: `/assets/img/${name}.webp`,
  width,
  height,
});

export const HERO_PHOTOS: HeroPhoto[] = [
  {
    place: "Faisal Hills",
    alt: "The Faisal Hills arch monument lit up gold against the night sky",
    wide: img("faisal-hills-portrait", 1500, 1800),
    tall: img("faisal-hills-portrait", 1500, 1800),
    fit: "whole",
  },
  {
    place: "Faisal Hills",
    alt: "Lights along the cornice at the top of the Faisal Hills arch",
    wide: img("faisal-hills-cornice-wide", 2000, 1250),
    tall: img("faisal-hills-cornice-tall", 1200, 2000),
  },
  {
    place: "Faisal Hills",
    alt: "The carved, lit vault inside the opening of the Faisal Hills arch",
    wide: img("faisal-hills-vault-wide", 2000, 1250),
    tall: img("faisal-hills-vault-tall", 1200, 2000),
  },
];
