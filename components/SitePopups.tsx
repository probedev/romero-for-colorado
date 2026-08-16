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
// - "about" popup (6127): manual trigger only (Read More button).
function sourcesAllowed(): boolean {
  // Elementor: sources = ["search", "external"]
  const ref = document.referrer.replace(/https?:\/\/(?:www\.)?/, "");
  const host = location.host.replace("www.", "");
  if (ref.indexOf(host) === 0) return false; // internal
  return true; // external matches; search is a subset of non-internal
}

export default function SitePopups() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollFired = useRef(false);

  // Lock page scroll while a prevent_scroll popup is open (6127 + 8567)
  useEffect(() => {
    const lock = aboutOpen || fundOpen || lightboxOpen;
    document.body.classList.toggle("pp-scroll-lock", lock);
    return () => document.body.classList.remove("pp-scroll-lock");
  }, [aboutOpen, fundOpen, lightboxOpen]);

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

  // Delegated triggers for Read More / video lightbox links
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        "[data-open-about],[data-open-lightbox]"
      );
      if (!t) return;
      e.preventDefault();
      if (t.hasAttribute("data-open-about")) setAboutOpen(true);
      else setLightboxOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Escape closes the topmost popup
  const closeTop = useCallback(() => {
    if (lightboxOpen) setLightboxOpen(false);
    else if (aboutOpen) setAboutOpen(false);
    else if (fundOpen) setFundOpen(false);
    else if (scrollOpen) setScrollOpen(false);
  }, [lightboxOpen, aboutOpen, fundOpen, scrollOpen]);

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

      {/* ===== About popup (6127) ===== */}
      <div
        className={`pp-modal pp-about${aboutOpen ? " pp-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Meet Dwayne"
        onClick={(e) => {
          if (e.target === e.currentTarget) setAboutOpen(false);
        }}
      >
        <div className="pp-content">
          <button
            type="button"
            className="pp-close"
            aria-label="Close"
            onClick={() => setAboutOpen(false)}
          >
            <XmarkIcon />
          </button>
          <div className="pp-message">
            <div className="pp-about-body">
              <div className="pp-about-intro">
                <h2 className="pp-about-kicker">MEET DWAYNE</h2>
                <h2 className="pp-about-title">
                  FIGHTER. VETERAN. HUSBAND. FATHER. Leader.
                </h2>
                <div className="pp-about-text">
                  <p>
                    United States Army Engineer Officer Dwayne Romero is a
                    husband, father, combat veteran, small business owner, and
                    Democratic candidate for{" "}
                    <strong>Colorado&#8217;s Third Congressional District.</strong>
                  </p>
                  <p>
                    Raised by a single mom, Dwayne understands the challenges
                    working Coloradans are facing. At age 12, Dwayne started
                    folding laundry at his family&#8217;s apartment complex to
                    help the family make ends&#8217; meet, an experience that
                    taught him hard work, responsibility, and the value of a
                    dollar. At 18, Dwayne was recruited to play baseball at the
                    United States Military Academy at West Point, where he made
                    the Dean&#8217;s List all four years.
                  </p>
                </div>
              </div>
              <div className="pp-about-photos">
                <div>
                  <img src="/images/bb2.jpg" alt="" width={800} height={594} />
                </div>
                <div>
                  <img src="/images/bb1.jpg" alt="" width={800} height={594} />
                </div>
                <div>
                  <img src="/images/bb4.jpg" alt="" width={800} height={594} />
                </div>
              </div>
              <div className="pp-about-more pp-about-text">
                <p>
                  Dwayne served in the U.S. Army Corps of Engineers for seven
                  years and graduated from the Army Ranger School. As Combat
                  Engineer Executive Officer during the Persian Gulf War,
                  Dwayne earned a Bronze Star for leadership valor. During his
                  time in the Army, Dwayne was stationed at Fort Carson,
                  Colorado.
                </p>
                <p>
                  After his military service, Dwayne returned to Colorado to
                  raise a family with his wife Margaret. They just celebrated
                  their 35th wedding anniversary. Dwayne and Margaret &#8211; a
                  kindergarten teacher for 25 years and Gold Star family member
                  &#8211; are proud to have lived and worked in Colorado for
                  more than 35 years. They have three daughters, two of whom
                  serve or have served as officers in the U.S. military.
                </p>
              </div>
              <div className="pp-about-photos">
                <div>
                  <img src="/images/bb6.jpg" alt="" width={800} height={594} />
                </div>
                <div>
                  <img src="/images/bb7.jpg" alt="" width={800} height={594} className="obj-top" />
                </div>
                <div>
                  <img src="/images/bb5.jpg" alt="" width={800} height={594} />
                </div>
              </div>
              <div className="pp-about-more pp-about-text">
                <p>
                  Committed to his community, Dwayne joined then-Governor John
                  Hickenlooper&#8217;s Administration as Director of Economic
                  Development &#8212; the top official in charge of creating
                  good-paying jobs, growing our economy, and strengthening the
                  middle class.
                </p>
                <p>
                  Dwayne also served on his local City Council, as a board
                  member of both his Fire Protection District and Roaring Fork
                  Transit Authority, and on the local School District Board of
                  Education, including as President from 2020 to 2021. He
                  coached the local high school baseball team for nine years
                  and he currently serves as an elected Board Director for the
                  Snowmass Village Water and Sanitation Board.
                </p>
                <p>
                  Today, Dwayne employs 120 Coloradans as the owner and
                  operator of a property management company on the Western
                  Slope.
                </p>
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
