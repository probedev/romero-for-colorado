"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { actblue, YOUTUBE_LIGHTBOX_URL } from "../lib/urls";
import { ChevronRightIcon, XmarkIcon } from "./icons";

// Popup behavior replicated from Elementor Pro (elements-handlers.min.js):
// - "fund" popup (8567): opens on page load, delay 0, but ONLY when the
//   traffic source is search or external. Empty referrer counts as external.
// - "scroll" popup (7857): opens after scrolling 80% down the page, same
//   source gating. Not closable via background click; page stays interactive.
// (The former "about" popup moved to the /meet-dwayne/ page in Phase 2.)
function sourcesAllowed(): boolean {
  // Elementor: sources = ["search", "external"]
  const ref = document.referrer.replace(/https?:\/\/(?:www\.)?/, "");
  const host = location.host.replace("www.", "");
  if (ref.indexOf(host) === 0) return false; // internal
  return true; // external matches; search is a subset of non-internal
}

export default function SitePopups() {
  const [fundOpen, setFundOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollFired = useRef(false);

  // Lock page scroll while a blocking popup is open
  useEffect(() => {
    const lock = fundOpen || lightboxOpen;
    document.body.classList.toggle("pp-scroll-lock", lock);
    return () => document.body.classList.remove("pp-scroll-lock");
  }, [fundOpen, lightboxOpen]);

  // Page-load popup (source-gated)
  useEffect(() => {
    if (sourcesAllowed()) setFundOpen(true);
  }, []);

  // Scroll popup at 80% down (source-gated, fires once). Also checked at
  // mount and when the page-load popup closes, so restored/anchored scroll
  // positions past 80% still trigger it without a further scroll event.
  useEffect(() => {
    if (!sourcesAllowed()) return;
    const check = () => {
      if (scrollFired.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= 0.8) {
        scrollFired.current = true;
        setScrollOpen(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [fundOpen]);

  // Delegated trigger for video lightbox links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-open-lightbox]");
      if (!t) return;
      e.preventDefault();
      setLightboxOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Escape closes the topmost popup
  const closeTop = useCallback(() => {
    if (lightboxOpen) setLightboxOpen(false);
    else if (fundOpen) setFundOpen(false);
    else if (scrollOpen) setScrollOpen(false);
  }, [lightboxOpen, fundOpen, scrollOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTop();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeTop]);

  const fundTiers = [10, 25, 50, 100, 250];

  return (
    <>
      {/* ===== Page-load donate popup (8567) ===== */}
      <div
        className={`pp-modal pp-fund${fundOpen ? " pp-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Stand with Dwayne Romero"
        onClick={(e) => {
          if (e.target === e.currentTarget) setFundOpen(false);
        }}
      >
        <div className="pp-content">
          <button
            type="button"
            className="pp-close"
            aria-label="Close"
            onClick={() => setFundOpen(false)}
          >
            <XmarkIcon />
          </button>
          <div className="pp-message">
            <div className="pp-fund-body">
              <div className="pp-fund-video">
                <div className="video-frame">
                  {fundOpen && (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/ZGcTJrVIAk8?start=1&loop=1&playlist=ZGcTJrVIAk8&controls=1"
                      title="Dwayne Romero for Colorado"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>
              </div>
              <div className="pp-fund-main">
                <div className="pp-fund-inner">
                  <div className="pp-fund-star">
                    <div className="pp-fund-star-in">
                      <img src="/images/sst.svg" alt="" width={269} height={257} />
                    </div>
                  </div>
                  <h2 className="pp-fund-title">STAND WITH DWAYNE ROMERO</h2>
                  <div className="pp-fund-note-wrap">
                    <p className="pp-fund-note">
                      If you&#8217;ve saved your payment info with ActBlue
                      Express, your donation will go through immediately.
                    </p>
                  </div>
                  <div className="pp-fund-grid">
                    {fundTiers.map((a) => (
                      <a key={a} className="tier pp-fund-tier" href={actblue(a)}>
                        <span className="tier-label">${a}</span>
                      </a>
                    ))}
                    <a className="tier pp-fund-tier pp-fund-tier-other" href={actblue()}>
                      <span className="tier-label">Other Amount</span>
                    </a>
                  </div>
                  <div className="pp-fund-continue">
                    <div>
                      <button
                        type="button"
                        className="pp-fund-continue-btn"
                        onClick={() => setFundOpen(false)}
                      >
                        <ChevronRightIcon aria-hidden="true" />
                        <span>Continue to Website</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Scroll donate popup (7857) — bottom-left panel ===== */}
      <div
        className={`pp-modal pp-scroll${scrollOpen ? " pp-open" : ""}`}
        role="dialog"
        aria-label="Donate to Team Romero"
      >
        <div className="pp-content">
          <button
            type="button"
            className="pp-close"
            aria-label="Close"
            onClick={() => setScrollOpen(false)}
          >
            <XmarkIcon />
          </button>
          <div className="pp-message">
            <div className="pp-scroll-body">
              <div className="pp-scroll-panel">
                <h2 className="pp-scroll-title">Donate to TEAM ROMERO</h2>
                <div className="pp-scroll-inner">
                  <div className="pp-scroll-grid">
                    {fundTiers.map((a) => (
                      <a key={a} className="tier pp-scroll-tier" href={actblue(a)}>
                        <span className="tier-label">${a}</span>
                      </a>
                    ))}
                    <a
                      className="tier pp-scroll-tier pp-scroll-tier-other"
                      href={actblue()}
                    >
                      <span className="tier-label">Other Amount</span>
                    </a>
                  </div>
                  <div className="pp-scroll-note-wrap">
                    <p className="pp-scroll-note">
                      If you&#8217;ve saved your payment info with ActBlue
                      Express, your donation will go through immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== YouTube lightbox ===== */}
      <div
        className={`pp-modal pp-lightbox${lightboxOpen ? " pp-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Watch our latest video"
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightboxOpen(false);
        }}
      >
        <button
          type="button"
          className="pp-close"
          aria-label="Close"
          onClick={() => setLightboxOpen(false)}
        >
          <XmarkIcon />
        </button>
        <div className="video-frame">
          {lightboxOpen && (
            <iframe
              src={YOUTUBE_LIGHTBOX_URL}
              title="Watch Our Latest Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </>
  );
}
