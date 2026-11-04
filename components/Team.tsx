import Image from "next/image";
import type { CSSProperties } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { TEAM } from "@/lib/team";
import { SplitHeading } from "./ui";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** 923001234567 -> 0300 1234567 */
const localNumber = (p: string) => `0${p.slice(2, 5)} ${p.slice(5)}`;

export function Team() {
  return (
    <section className="team" id="team">
      <div className="wrap">
        <SplitHeading text="Meet the team" />
        <ul className="team__grid">
          {TEAM.map((m, i) => (
            <li className="member" key={m.name} data-rise="" style={{ "--i": i } as CSSProperties}>
              <div className="member__pic" data-open="">
                <div className="frame">
                  {m.photo ? (
                    <Image src={m.photo} alt={`Portrait of ${m.name}`} fill quality={80} sizes="(max-width: 760px) 50vw, 25vw" />
                  ) : (
                    <span className="member__mono" aria-hidden="true">{initials(m.name)}</span>
                  )}
                </div>
              </div>
              <h3>{m.name}</h3>
              {m.role ? <p className="member__role">{m.role}</p> : null}
              {m.phone ? (
                <p className="member__links">
                  <a href={`tel:+${m.phone}`}>{localNumber(m.phone)}</a>
                  <a href={`https://wa.me/${m.phone}`} target="_blank" rel="noopener">WhatsApp</a>
                </p>
              ) : (
                <p className="member__links">
                  <a href={PHONE_TEL} aria-label={`Call the office on ${PHONE_DISPLAY} and ask for ${m.name}`}>Call the office</a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
