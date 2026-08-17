/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";
import ShortsCarousel from "../components/ShortsCarousel";
import SitePopups from "../components/SitePopups";
import SocialIcons from "../components/SocialIcons";
import TopBanner from "../components/TopBanner";
import TopNav from "../components/TopNav";
import { ArrowIcon, PlayCircleIcon, PlayIcon, StarFlagIcon } from "../components/icons";
import { ACTBLUE_BASE, actblue } from "../lib/urls";

const DESCRIPTION =
  "United States Army Engineer Officer Dwayne Romero is a husband, father, combat veteran, small business owner, and Democratic candidate for Colorado’s Third Congressional District.";

export const metadata: Metadata = {
  title: "Romero for Colorado",
  description: DESCRIPTION,
  alternates: { canonical: "https://romeroforcolorado.com/" },
  openGraph: {
    locale: "en_US",
    type: "website",
    title: "Romero for Colorado",
    description: DESCRIPTION,
    url: "https://romeroforcolorado.com/",
    siteName: "Romero for Colorado",
    images: [
      {
        url: "https://romeroforcolorado.com/images/drshare.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://romeroforcolorado.com/images/drshare.png"],
  },
};

function SmsConsent({ className }: { className?: string }) {
  return (
    <h2 className={`sms-consent ${className ?? ""}`}>
      <a href="/privacy-policy">
        By submitting your cell phone number you are agreeing to receive
        periodic text messages from Romero for Colorado. Message and data rates
        may apply. Text HELP for more information. Text STOP to stop receiving
        messages. <u>Privacy Policy</u>
      </a>
    </h2>
  );
}

export default function Home() {
  return (
    <>
      {/* WP emits article:modified_time even with og:type website; Next's
          typed metadata can't — hoisted by React into <head>. */}
      <meta property="article:modified_time" content="2026-04-30T16:34:37+00:00" />
      {/* LCP: hero background images */}
      <link
        rel="preload"
        as="image"
        href="/images/new-hero.jpg"
        media="(min-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/new-hero-mobile.jpg"
        media="(max-width: 767px)"
      />
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-home" />

        <TopNav />

        {/* Hero (567ea19, desktop/tablet) */}
        <section className="hero hide-mobile">
          <div className="hero-inner">
            <div className="hero-left">
              <h2 className="hero-title hero-title-1 workintxt is-loaded">TOGETHER</h2>
              <h2 className="hero-title hero-title-2 courgtxt is-loaded">
                WE <mark>LEAD</mark>
              </h2>
              <div className="hero-form">
                <SignupForm variant="hd" instance={1} submitLabel="JOIN US" />
              </div>
              <SmsConsent className="maxhdr is-loaded-3" />
            </div>
            <div className="hero-right" />
          </div>
        </section>

        {/* Mobile hero (4d37f2c + a67d8ce) */}
        <section className="mhero hide-desktop hide-tablet">
          <div className="mhero-photo">
            <div className="mhero-spacer" />
          </div>
          <div className="mhero-body">
            <div className="mhero-card">
              <div className="mhero-content">
                <div className="mhero-video-icon">
                  <a className="eicon" href="#" data-open-lightbox aria-label="Watch our latest video">
                    <PlayIcon aria-hidden="true" />
                  </a>
                </div>
                <h2 className="mhero-title">
                  TOGETHER <br />
                  WE LEAD
                </h2>
                <div className="mhero-form">
                  <SignupForm variant="hd" instance={2} submitLabel="JOIN US" />
                </div>
                <SmsConsent className="maxhdr" />
                <SocialIcons className="mhero-social" />
              </div>
            </div>
          </div>
        </section>

        {/* Watch Our Latest Video (fd22e49) */}
        <section className="vid hide-mobile">
          <a className="vid-card is-loaded" href="#" data-open-lightbox>
            <div className="vid-icon">
              <span className="eicon">
                <PlayCircleIcon aria-hidden="true" />
              </span>
            </div>
            <h2 className="vid-title">
              Watch Our <br />
              Latest Video
            </h2>
          </a>
        </section>

        {/* Meet Dwayne (b914417) */}
        <section className="meet" id="about">
          <div className="meet-card">
            <div className="meet-inner">
              <div className="meet-star">
                <img src="/images/sst.svg" alt="" width={269} height={257} />
              </div>
              <h2 className="meet-kicker">MEET DWAYNE ROMERO</h2>
              <h2 className="meet-title">Forged in Service</h2>
              <div className="meet-text">
                <p>
                  United States Army Engineer Officer Dwayne Romero is a
                  husband, father, combat veteran, small business owner, and
                  Democratic candidate for Colorado&#8217;s Third Congressional
                  District. Raised by a single mom, Dwayne understands the
                  challenges working Coloradans are facing. At age 12, Dwayne
                  started folding laundry at his family&#8217;s apartment
                  complex to help the family make ends&#8217; meet, an
                  experience that taught him hard work, responsibility, and the
                  value of a dollar.
                </p>
              </div>
              <div className="meet-buttons">
                <a className="btn-arrow" href="/meet-dwayne/">
                  <span className="btn-label">Read More</span>
                  <span className="btn-icon">
                    <ArrowIcon aria-hidden="true" />
                  </span>
                </a>
                <a className="btn-arrow btn-arrow-outline" href="/issues">
                  <span className="btn-label">Issues</span>
                  <span className="btn-icon">
                    <ArrowIcon aria-hidden="true" />
                  </span>
                </a>
                <a className="btn-arrow btn-arrow-outline" href="/volunteer">
                  <span className="btn-label">Volunteer</span>
                  <span className="btn-icon">
                    <ArrowIcon aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Shorts carousel (Phase 2 addition) */}
        <ShortsCarousel />

        {/* Chip in today (84c4781) */}
        <section className="chip">
          <div className="chip-inner">
            <h2 className="chip-title">Chip in today to Team Romero</h2>
            <div className="chip-grid">
              <a className="tier chip-tier" href={actblue(10)}>
                <span className="tier-label">$10</span>
              </a>
              <a className="tier chip-tier" href={actblue(25)}>
                <span className="tier-label">$25</span>
              </a>
              <a className="tier chip-tier" href={actblue(50)}>
                <span className="tier-label">$50</span>
              </a>
              <a className="tier chip-tier" href={actblue(250)}>
                <span className="tier-label">$250</span>
              </a>
              <a className="tier chip-tier" href={actblue(500)}>
                <span className="tier-label">$500</span>
              </a>
              <a className="tier chip-tier chip-tier-other" href={actblue()}>
                <span className="tier-label">
                  Other <br />
                  Amount
                </span>
              </a>
            </div>
            <div className="chip-note">
              <div className="chip-note-icon">
                <span className="eicon">
                  <StarFlagIcon aria-hidden="true" />
                </span>
              </div>
              <h2 className="chip-note-text">
                If you've saved your information with ActBlue Express, your
                donation will go through immediately.
              </h2>
            </div>
          </div>
        </section>

        {/* Join our campaign (7bdc004) */}
        <section className="join">
          <div className="join-photo">
            <div className="join-photo-spacer" />
          </div>
          <div className="join-content">
            <div className="join-inner">
              <h2 className="join-title">JOIN OUR CAMPAIGN</h2>
              <SignupForm variant="foot" instance={3} submitLabel="STAY UPDATED" />
              <SmsConsent className="maxdesc2" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
