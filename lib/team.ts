/**
 * The team. To finish a person's entry:
 *  - photo: put the file in public/assets/team/ and set e.g. "/assets/team/usman-shareef.jpg".
 *    Any size or shape works: it is cropped to the same 4:5 frame and compressed automatically.
 *  - phone: digits with the country code and no spaces, e.g. "923001234567".
 * Until then the card shows initials, and its button calls the office line.
 */
export type Member = { name: string; role?: string; photo?: string; phone?: string };

export const TEAM: Member[] = [
  { name: "Usman Shareef", role: "CEO" },
  { name: "Ahsan Maqsood Gheba" },
  { name: "Huzaifa Farooq" },
  { name: "Ahsan Seemab" },
];
