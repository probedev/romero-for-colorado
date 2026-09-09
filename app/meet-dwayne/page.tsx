/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";
import { ArrowIcon } from "../../components/icons";

export const metadata: Metadata = {
  title: "Meet Dwayne - Romero for Colorado",
  description:
    "United States Army Engineer Officer Dwayne Romero is a husband, father, combat veteran, small business owner, and Democratic candidate for Colorado’s Third Congressional District.",
  alternates: { canonical: "https://romeroforcolorado.com/meet-dwayne/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Meet Dwayne - Romero for Colorado",
    url: "https://romeroforcolorado.com/meet-dwayne/",
    siteName: "Romero for Colorado",
    images: [
      {
        url: "https://romeroforcolorado.com/images/og-meet-dwayne.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [] },
};

// Bio content moved from the former "about" popup to a core page (Phase 2).
export default function MeetDwayne() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-meet" />
        <TopNav current="/meet-dwayne/" />
        <PageHero image="/images/meet-dwayne-hero.jpg" imageSm="/images/meet-dwayne-hero-sm.jpg" kicker="Team Romero" title="Meet Dwayne" />
        <div className="md">
          <div className="md-intro">
            <h2 className="md-title">FIGHTER. VETERAN. HUSBAND. FATHER. Leader.</h2>
            <div className="md-text">
              <p>
                United States Army Engineer Officer Dwayne Romero is a husband,
                father, combat veteran, small business owner, and Democratic
                candidate for{" "}
                <strong>Colorado&#8217;s Third Congressional District.</strong>
              </p>
              <p>
                Raised by a single mom, Dwayne understands the challenges
                working Coloradans are facing. At age 12, Dwayne started
                folding laundry at his family&#8217;s apartment complex to help
                the family make ends&#8217; meet, an experience that taught him
                hard work, responsibility, and the value of a dollar. At 18,
                Dwayne was recruited to play baseball at the United States
                Military Academy at West Point, where he made the Dean&#8217;s
                List all four years.
              </p>
            </div>
          </div>
          <div className="md-photos">
            <div>
              <img src="/images/bb2.jpg" alt="Dwayne Romero in uniform" width={800} height={594} />
            </div>
            <div>
              <img src="/images/bb1.jpg" alt="Dwayne Romero during his Army service" width={800} height={594} />
            </div>
            <div>
              <img src="/images/bb4.jpg" alt="Dwayne Romero with fellow soldiers" width={800} height={594} />
            </div>
          </div>
          <div className="md-more md-text">
            <p>
              Dwayne served in the U.S. Army Corps of Engineers for seven years
              and graduated from the Army Ranger School. As Combat Engineer
              Executive Officer during the Persian Gulf War, Dwayne earned a
              Bronze Star for exceptionally meritorious achievement. During his
              time in the Army, Dwayne was stationed at Fort Carson, Colorado.
            </p>
            <p>
              After his military service, Dwayne returned to Colorado to raise
              a family with his wife Margaret. They just celebrated their 35th
              wedding anniversary. Dwayne and Margaret &#8211; a kindergarten
              teacher for 25 years and Gold Star family member &#8211; are
              proud to have lived and worked in Colorado for more than 35
              years. They have three daughters, two of whom serve or have
              served as officers in the U.S. military.
            </p>
          </div>
          <div className="md-photos">
            <div>
              <img src="/images/bb6.jpg" alt="Dwayne Romero with his family" width={800} height={594} />
            </div>
            <div>
              <img src="/images/bb7.jpg" alt="Dwayne Romero coaching baseball" width={800} height={594} className="obj-top" />
            </div>
            <div>
              <img src="/images/bb5.jpg" alt="Dwayne Romero in the community" width={800} height={594} />
            </div>
          </div>
          <div className="md-more md-text">
            <p>
              Committed to his community, Dwayne joined then-Governor John
              Hickenlooper&#8217;s Administration as Director of Economic
              Development &#8212; the top official in charge of creating
              good-paying jobs, growing our economy, and strengthening the
              middle class.
            </p>
            <p>
              Dwayne also served on his local City Council, as a board member
              of both his Fire Protection District and Roaring Fork Transit
              Authority, and on the local School District Board of Education,
              including as President from 2020 to 2021. He coached the local
              high school baseball team for nine years and he currently serves
              as an elected Board Director for the Snowmass Village Water and
              Sanitation Board.
            </p>
            <p>
              Today, Dwayne employs 120 Coloradans as the owner and operator of
              a property management company on the Western Slope.
            </p>
          </div>
          <div className="md-cta">
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
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
