import type { Metadata } from "next";
import Footer from "../../components/Footer";
import NewsGrid from "../../components/NewsGrid";
import PageHero from "../../components/PageHero";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";

export const metadata: Metadata = {
  title: "News - Romero for Colorado",
  description:
    "The latest campaign developments, news coverage, and press releases from Romero for Colorado.",
  alternates: { canonical: "https://romeroforcolorado.com/news/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "News - Romero for Colorado",
    url: "https://romeroforcolorado.com/news/",
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
  twitter: { card: "summary_large_image", images: [] },
};

export default function News() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-news" />
        <TopNav current="/news/" />
        <PageHero image="/images/news-hero.jpg" kicker="Team Romero" title="News & Press" />
        <section className="nw">
          <div className="nw-head">
            <p className="nw-kicker">News &amp; Press</p>
            <h2 className="nw-heading">Latest Campaign Developments</h2>
          </div>
          <NewsGrid />
        </section>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
