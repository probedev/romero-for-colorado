"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { ACTBLUE_BASE, SOCIAL } from "../lib/urls";
import { socialIcon, XmarkIcon } from "./icons";

const LINKS = [
  { label: "Meet Dwayne", href: "/meet-dwayne/" },
  { label: "Issues", href: "/issues/" },
  { label: "Endorsements", href: "/endorsements/" },
  { label: "News", href: "/news/" },
  { label: "Volunteer", href: "/volunteer" },
];

// Site-wide top navigation (Phase 2). Layout mirrors the reference:
// [logo] [links] ... [social icons] [Donate]. `overlay` lets the bar sit on
// top of a page hero (negative bottom margin, transparent background).
export default function TopNav({
  overlay = true,
  current,
}: {
  overlay?: boolean;
  current?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("pp-scroll-lock", open);
    return () => document.body.classList.remove("pp-scroll-lock");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav className={`tn${overlay ? " tn-overlay" : ""}`} aria-label="Main">
        <a className="tn-logo" href="/">
          <img src="/images/logorr.svg" alt="Romero for Colorado" width={1324} height={592} />
        </a>
        <div className="tn-links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={current === l.href ? "tn-active" : undefined}
              aria-current={current === l.href ? "page" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="tn-right">
          <div className="tn-social">
            {SOCIAL.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener">
                <span className="screen-reader-text">{s.label}</span>
                {socialIcon(s.key, { "aria-hidden": true } as never)}
              </a>
            ))}
          </div>
          <a className="btn-donate tn-donate" href={ACTBLUE_BASE}>
            <span className="btn-label">Donate</span>
          </a>
          <button
            type="button"
            className="tn-burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`tn-menu${open ? " tn-menu-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <button type="button" className="tn-menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <XmarkIcon />
        </button>
        <div className="tn-menu-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={ACTBLUE_BASE}>Donate</a>
        </div>
        <div className="tn-menu-social">
          {SOCIAL.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noopener">
              <span className="screen-reader-text">{s.label}</span>
              {socialIcon(s.key, { "aria-hidden": true } as never)}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
