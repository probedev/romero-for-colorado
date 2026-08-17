import type { Metadata } from "next";
import Footer from "../../components/Footer";
import NewsGrid from "../../components/NewsGrid";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";
import { EMAIL_PRESS } from "../../lib/urls";

export const metadata: Metadata = {
  title: "Press - Romero for Colorado",
  description:
    "Official press releases from the Romero for Colorado campaign. Media inquiries: press@romeroforcolorado.com.",
  alternates: { canonical: "https://romeroforcolorado.com/press/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Press - Romero for Colorado",
    url: "https://romeroforcolorado.com/press/",
    siteName: "Romero for Colorado",
    images: [
      {
        url: "https://romeroforcolorado.com/images/og-news.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [] },
};

export default function Press() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-press" />
        <TopNav />
        <div className="pr-band">
          <div className="pr-band-inner">
            <p className="ph-kicker">Team Romero</p>
            <h1 className="pr-band-title">Press Releases</h1>
          </div>
        </div>
        <section className="nw">
          <div className="nw-head">
            <p className="nw-kicker">Media inquiries</p>
            <h2 className="nw-heading">
              <a href={`mailto:${EMAIL_PRESS}`}>{EMAIL_PRESS}</a>
            </h2>
          </div>
          <NewsGrid filter="Press Release" />
        </section>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
