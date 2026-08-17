/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import EndorsementGrid from "../../components/EndorsementGrid";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";

export const metadata: Metadata = {
  title: "Endorsements - Romero for Colorado",
  description:
    "See who is on Team Romero — leaders and organizations across Colorado endorsing Dwayne Romero for Colorado’s Third Congressional District.",
  alternates: { canonical: "https://romeroforcolorado.com/endorsements/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Endorsements - Romero for Colorado",
    url: "https://romeroforcolorado.com/endorsements/",
    siteName: "Romero for Colorado",
    images: [
      {
        url: "https://romeroforcolorado.com/images/og-endorsements.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [] },
};

export default function Endorsements() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-endorse" />
        <TopNav current="/endorsements/" />
        <PageHero
          image="/images/endorsements-hero.jpg" imageSm="/images/endorsements-hero-sm.jpg"
          kicker="Team Romero"
          title="Endorsements"
        />
        <section className="en">
          <div className="en-head">
            <div className="en-star">
              <img src="/images/sst.svg" alt="" width={269} height={257} />
            </div>
            <h2 className="en-heading">We are on Team Romero</h2>
          </div>
          <EndorsementGrid />
        </section>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
