import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import SitePopups from "../../../components/SitePopups";
import TopBanner from "../../../components/TopBanner";
import TopNav from "../../../components/TopNav";
import { ArrowIcon } from "../../../components/icons";

const HEADLINE =
  "New poll finds Dwayne Romero tied with incumbent Republican in race for Colorado’s 3rd Congressional District";

export const metadata: Metadata = {
  title: `${HEADLINE} - Romero for Colorado`,
  description:
    "A new Keating Research poll shows Army combat veteran and small business owner Dwayne Romero statistically tied with Jeff Hurd at 45%–46% in the race for Colorado’s 3rd Congressional District.",
  alternates: {
    canonical: "https://romeroforcolorado.com/press/new-poll-romero-tied-cd3/",
  },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: HEADLINE,
    url: "https://romeroforcolorado.com/press/new-poll-romero-tied-cd3/",
    siteName: "Romero for Colorado",
    publishedTime: "2026-07-30T00:00:00-06:00",
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

// Press release content verbatim from in/Press Release -1 .txt
export default function PressRelease() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-pr1" />
        <TopNav />
        <div className="pr-band">
          <div className="pr-band-inner">
            <p className="ph-kicker">Press Release</p>
            <h1 className="pr-band-title">
              New poll finds Dwayne Romero tied with incumbent Republican
            </h1>
          </div>
        </div>
        <article className="pr">
          <div className="pr-inner">
            <p className="pr-meta">For immediate release</p>
            <p className="pr-date">July 30, 2026</p>
            <h2 className="pr-headline">
              NEW POLL FINDS DWAYNE ROMERO TIED WITH INCUMBENT REPUBLICAN IN
              RACE FOR COLORADO&#8217;S 3rd CONGRESSIONAL DISTRICT
            </h2>
            <div className="pr-contact">
              Contact:
              <br />
              Ryan Paolilli
              <br />
              (845) 797-3334
              <br />
              <a href="mailto:Ryan@Romeroforcolorado.com">Ryan@Romeroforcolorado.com</a>
            </div>
            <div className="pr-body">
              <p>
                PUEBLO, CO - Today, a new poll shows Army combat veteran and
                small business owner Dwayne Romero statistically tied with Jeff
                Hurd at 45% - 46% in the race for Colorado&#8217;s 3rd
                Congressional District.
              </p>
              <p>
                &#8220;Coloradans in this district are done watching their
                representative answer to lobbyists and party bosses instead of
                the people who actually elected him,&#8221; said Dwayne Romero.
                &#8220;These results show that the people of CD3 are ready for
                someone who will fight to lower costs, protect Social Security,
                and hold corrupt politicians accountable — not rubber-stamp
                Washington&#8217;s chaos. I&#8217;m running because this
                district deserves a fighter who works for working Coloradans,
                not for special interests.&#8221;
              </p>
              <p>
                Conducted by Keating Research, the poll paints a picture of a
                starkly vulnerable Republican incumbent and a Democrat with a
                uniquely appealing profile. In 2022, Keating Research&#8217;s
                polling correctly predicted that CO-03 would be one of the most
                competitive seats in the country, and the Democratic candidate
                went on to lose by less than 600 votes. This year, with control
                of the House on the line, they have once again found this
                district represents an incredible opportunity for Democrats to
                pick up a seat.
              </p>
            </div>
            <p className="pr-end">###</p>
            <div className="pr-boiler">
              <p>
                Dwayne Romero has spent his life serving his country and his
                community- from graduating at West Point and fighting in the
                First Gulf War to being elected to positions on his local city
                council and school board. Now, Dwayne is running for Congress
                to fight back against Washington D.C.&#8217;s chaos, end
                Trump&#8217;s reckless war in Iran, and reverse healthcare cuts
                that are hurting our rural communities. Dwayne has lived in the
                district for over 30 years with his wife Margaret, where they
                raised three daughters. You can watch Dwayne&#8217;s launch
                video{" "}
                <a
                  href="https://www.youtube.com/watch?v=ZGcTJrVIAk8"
                  target="_blank"
                  rel="noopener"
                >
                  here
                </a>
                .
              </p>
            </div>
            <a className="pr-back" href="/news/">
              <ArrowIcon aria-hidden="true" />
              Back to News &amp; Press
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
