"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { SHORTS } from "../lib/shorts";
import { ChevronRightIcon, PlayIcon, XmarkIcon } from "./icons";

// Home page Shorts carousel. Fast by construction: self-hosted vertical
// thumbnails, scroll-snap track, no YouTube assets until a card is clicked
// (then the Short plays in a vertical lightbox). Auto-rotates one card at a
// time; pauses on hover/touch/focus and honors prefers-reduced-motion.
export default function ShortsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const open = SHORTS.find((s) => s.id === playing);

  const step = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".sh-card");
    if (!card) return;
    const delta = card.offsetWidth + 16; // card + gap
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - delta / 2;
    if (dir === 1 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: dir * delta, behavior: "smooth" });
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const iv = window.setInterval(() => {
      if (!paused.current && !document.hidden && !playing) step(1);
    }, 3500);
    return () => window.clearInterval(iv);
  }, [step, playing]);

  // Lightbox close handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("pp-scroll-lock", !!playing);
    return () => document.body.classList.remove("pp-scroll-lock");
  }, [playing]);

  return (
    <section className="sh" aria-label="Team Romero on YouTube Shorts">
      <div className="sh-head">
        <p className="sh-kicker">On the Trail</p>
        <h2 className="sh-heading">Watch the Latest from Team Romero</h2>
      </div>
      <div
        className="sh-wrap"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
      >
        <button type="button" className="sh-arrow sh-arrow-prev" aria-label="Previous videos" onClick={() => step(-1)}>
          <ChevronRightIcon aria-hidden="true" />
        </button>
        <div className="sh-track" ref={trackRef} tabIndex={0} role="group" aria-label="Video carousel">
          {SHORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="sh-card"
              onClick={() => setPlaying(s.id)}
              aria-label={`Play video: ${s.title}`}
            >
              <img
                src={`/images/shorts/${s.id}.jpg`}
                alt=""
                width={720}
                height={1280}
                loading="lazy"
              />
              <span className="sh-card-shade" aria-hidden="true" />
              <span className="sh-card-play" aria-hidden="true">
                <PlayIcon />
              </span>
              <span className="sh-card-title">{s.title}</span>
            </button>
          ))}
        </div>
        <button type="button" className="sh-arrow sh-arrow-next" aria-label="Next videos" onClick={() => step(1)}>
          <ChevronRightIcon aria-hidden="true" />
        </button>
      </div>

      {/* Vertical player lightbox */}
      <div
        className={`pp-modal sh-lightbox${playing ? " pp-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={open ? `Playing: ${open.title}` : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPlaying(null);
        }}
      >
        <button type="button" className="pp-close" aria-label="Close" onClick={() => setPlaying(null)}>
          <XmarkIcon />
        </button>
        <div className="sh-player">
          {playing && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${playing}?autoplay=1&playsinline=1&rel=0`}
              title={open?.title ?? "Team Romero video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  );
}
