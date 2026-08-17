"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { XmarkIcon } from "./icons";

const CARDS = [
  { slug: "john-hickenlooper", name: "U.S. Senator John Hickenlooper" },
  // jason-crow.png excluded: source asset carries Pam DiFatta's quote and
  // the Service First logo — awaiting a corrected card from the design team
  { slug: "john-salazar", name: "Former Congressman John Salazar" },
  { slug: "vote-vets", name: "VoteVets" },
  { slug: "nalc", name: "National Association of Letter Carriers" },
  { slug: "marsha-porter-norton", name: "Marsha Porter-Norton" },
  { slug: "alex-sanchez", name: "Alex Sanchez" },
  { slug: "erica-sparkhawk", name: "Erica Sparkhawk" },
  { slug: "jan-vigil", name: "Jan Vigil" },
  { slug: "pam-difatta", name: "Pam DiFatta" },
];

export default function EndorsementGrid() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = CARDS.find((c) => c.slug === openSlug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlug(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("pp-scroll-lock", !!openSlug);
    return () => document.body.classList.remove("pp-scroll-lock");
  }, [openSlug]);

  return (
    <>
      <div className="en-grid">
        {CARDS.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="en-card"
            onClick={() => setOpenSlug(c.slug)}
            aria-label={`View endorsement from ${c.name}`}
          >
            <img
              src={`/images/endorsements/${c.slug}.jpg`}
              alt={`Endorsement card: Dwayne is proud to be endorsed by ${c.name}`}
              width={1080}
              height={1350}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <div
        className={`en-lightbox${open ? " en-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={open ? `Endorsement from ${open.name}` : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenSlug(null);
        }}
      >
        <button type="button" className="pp-close" aria-label="Close" onClick={() => setOpenSlug(null)}>
          <XmarkIcon />
        </button>
        {open && (
          <img
            src={`/images/endorsements/${open.slug}.jpg`}
            alt={`Endorsement card: Dwayne is proud to be endorsed by ${open.name}`}
            width={1080}
            height={1350}
          />
        )}
      </div>
    </>
  );
}
