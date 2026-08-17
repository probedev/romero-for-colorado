/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Footer from "../../components/Footer";
import SignupForm from "../../components/SignupForm";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";
import IssueDeepLinks from "../../components/IssueDeepLinks";
import { CaretDownIcon, CaretRightIcon, StarFlagIcon } from "../../components/icons";
import { ACTBLUE_BASE, actblue } from "../../lib/urls";

export const metadata: Metadata = {
  title: "Issues - Romero for Colorado",
  alternates: { canonical: "https://romeroforcolorado.com/issues/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Issues - Romero for Colorado",
    description:
      "Donate to Support Dwayne Romero for Colorado FIGHT FOR CO-03 Donate to Support Romero for Colorado If you’ve saved your information with ActBlue Express, your donation will go through immediately. FIGHT FOR CO-03 Donate to Support Romero for Colorado If you’ve saved your information with ActBlue Express, your donation will go through immediately. Home TOGETHER […]",
    url: "https://romeroforcolorado.com/issues/",
    siteName: "Romero for Colorado",
    modifiedTime: "2026-05-01T18:45:52+00:00",
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

const ISSUES: { title: string; slug: string; body: React.ReactNode }[] = [
  {
    title: "LOWER THE COST OF LIVING",
    slug: "cost-of-living",
    body: (
      <p>
        Affordability is at the top of my priority list. Think about all the
        people in our district and what matters most to them — its cost of
        living: housing costs, access to health care, and prices at the pump
        and the grocery store for that matter. Washington has been making it
        harder for Coloradans to make ends meet. I&#8217;m going to fight to
        make it easier, starting with repealing these disastrous tariffs and
        expanding the Family Tax Credits.
      </p>
    ),
  },
  {
    title: "SUPPORT THE FUTURE OF AGRICULTURE",
    slug: "agriculture",
    body: (
      <p>
        Our farmers and ranchers are the bedrock of many of our communities and
        are a core part of our heritage. Many work the land that their parents
        and grandparents tended before them for generations. Right now,
        Washington is making their lives harder — not easier. That has to stop.
        I&#8217;ll fight for our family farms, ranches, and small agriculture
        businesses to strengthen rural economies for the next generation. We
        must pass a robust Farm Bill and keep foreign entities out of Colorado
        water and farmland ownership.
      </p>
    ),
  },
  {
    title: "PROTECT OUR WATER",
    slug: "water",
    body: (
      <p>
        Water is the key to life here in Colorado. As an elected member of my
        local water and sanitation district board, I see firsthand what&#8217;s
        at stake — from the challenges facing the Colorado River Compact, to
        attempts to take more water out of our home basins, and what this
        historic drought is doing to our water supply. We need someone in
        Congress who will hold the line for our district&#8217;s water
        resources. This is job number one.
      </p>
    ),
  },
  {
    title: "INCREASE AFFORDABLE ENERGY",
    slug: "energy",
    body: (
      <p>
        I&#8217;m a realist when it comes to energy. Turning an aircraft
        carrier takes energy and time. My approach is practical: we need to
        focus on using our legacy energy resources that are produced right here
        in CO-03 as we simultaneously press hard on the advancement and
        deployment of alternative energies. This transition window isn&#8217;t
        just pragmatic, it&#8217;s the only way we meet our ever increasing
        energy demand. An all-of-the-above approach is the only way we provide
        the reliable and affordable energy our communities need and deserve.
      </p>
    ),
  },
  {
    title: "DEFEND PUBLIC LANDS & ENVIRONMENT",
    slug: "public-lands",
    body: (
      <p>
        I look at our public lands and I see something worth fighting for.
        Right now, our national forests across CD3 have seen massive reductions
        in field staff. That&#8217;s not a policy disagreement; that&#8217;s a
        crisis for our lands, our communities, and our economies that depend on
        these multiuse lands being protected. We need to oppose efforts to sell
        or transfer out public lands to private interests and support our
        firefighters and increase fire resilience.
      </p>
    ),
  },
  {
    title: "CHAMPION ACCESS TO HOUSING",
    slug: "housing",
    body: (
      <p>
        We need to make sure the people who live in and love our district —
        from young people to families — can stay here. Right now, they are
        being priced out. Whether you&#8217;re a rancher&#8217;s kid hoping to
        take over the business or a working family trying to put down roots,
        you deserve a real shot. We need to build more housing and bring down
        the cost of staying here. Let&#8217;s stop Wall Street behemoths from
        buying up homes and driving up rents, repeal outdated red tape that
        hinders construction, and invest in housing construction in our rural
        communities.
      </p>
    ),
  },
  {
    title: "ADVOCATE FOR GOOD HEALTHCARE & RURAL HOSPITALS",
    slug: "healthcare",
    body: (
      <p>
        The One Big Ugly Bill completely turned our health care network on its
        head — Medicare, Medicaid, &amp; SNAP were decimated and people were
        kicked off their health plans. Rural hospitals are lifelines for both
        health care and jobs. When they close, communities lose. That&#8217;s a
        crisis. I will put healthcare at the top of my priority list.
        We&#8217;ve got to keep rural hospitals open and funded, allow medicare
        to negotiate lower drug prices, and protect women&#8217;s access to
        reproductive healthcare.
      </p>
    ),
  },
  {
    title: "FINALLY ENACT IMMIGRATION REFORM",
    slug: "immigration",
    body: (
      <p>
        Washington has failed on immigration for decades. I believe we can
        secure our border, uphold our values, and fix a broken system — all at
        the same time. That&#8217;s not a partisan position; it&#8217;s a
        practical one. And practical solutions are what this district deserves.
        Part of immigration reform needs to include a path to citizenship for
        long-term, law-abiding community members, and provide for more
        immigration judges to detain the bad guys and protect those seeking
        safe haven.
      </p>
    ),
  },
  {
    title: "KEEP THE FAITH WITH VETERANS & MILITARY FAMILIES",
    slug: "veterans",
    body: (
      <p>
        I served. I took an oath at 18 years old — 43 years ago — swearing to
        defend the Constitution against all enemies, foreign and domestic. I
        earned a Bronze Star in the Gulf War. Two of my daughters have served
        or are serving as military officers. I know what veterans gave, and I
        know they deserve real, dependable support when they come home — not
        bureaucratic delays and budget cuts.
      </p>
    ),
  },
  {
    title: "BRING ACCOUNTABILITY TO GOVERNMENT",
    slug: "accountability",
    body: (
      <p>
        Congress exists to represent the people, not to rubber-stamp
        whoever&#8217;s in the Oval Office. I&#8217;ll have the backbone to
        fight for what&#8217;s right, even at my own peril. This includes
        banning all federal officials from trading stocks, ending dark money in
        political spending, enacting term limits, and closing the revolving
        door between Congress and cushy lobbyist gigs.
      </p>
    ),
  },
  {
    title: "MAKE SURE YOUR VOICE IS HEARD",
    slug: "your-voice",
    body: (
      <p>
        Too many people in Western and Southern Colorado feel like DC
        doesn&#8217;t know they exist — let alone hear them. That has to
        change. As your Congressman, I&#8217;ll be accessible, responsive, and
        relentless about cutting through government bureaucracy to help
        everyday people get results. Whether it&#8217;s a veteran waiting on
        benefits, a family navigating a federal agency, or a small business
        owner fighting for answers — I&#8217;ll do the unglamorous but
        essential work of constituent service that too many politicians skip.
        No photo ops. No excuses. Just a fighter who answers the call, rolls up
        his sleeves, and gets to work for Colorado.
      </p>
    ),
  },
];

export default function Issues() {
  return (
    <>
      {/* LCP: photo hero background */}
      <link rel="preload" as="image" href="/images/phrr.jpg" />
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-issues" />

        <TopNav current="/issues/" />
        {/* Photo hero (9eff487) */}
        <section className="iss-hero">
          <div className="iss-hero-band">
            <div className="iss-hero-stack is-loaded">
              <div className="iss-hero-star">
                <img src="/images/cropped-faviconsm2.png" alt="" width={512} height={512} />
              </div>
              <h1 className="iss-hero-title">TOGETHER WE LEAD</h1>
              <div className="iss-divider">
                <span className="iss-divider-line" />
              </div>
            </div>
          </div>
        </section>

        {/* Platform intro (32b1a01) */}
        <section className="iss-platform">
          <div className="iss-platform-band">
            <div className="iss-platform-inner is-loaded">
              <h1 className="iss-platform-title">Platform &amp; Policy Priorities</h1>
              <div className="iss-platform-text">
                <p>
                  I stand for Colorado. I am a husband in this district. A
                  father. A veteran. A business owner employing over 120
                  Coloradans. A servant leader — and that goes back 43 years.
                  There are wins and losses in my record. That&#8217;s
                  relatable. And being relatable matters, because the people of
                  CO-03 deserve to see themselves in their leader.
                </p>
                <p>
                  I&#8217;m absolutely committed to fighting for what&#8217;s
                  best for this district. What the House needs is more
                  pragmatic problem-solvers who are willing to roll up their
                  sleeves, identify problems, and get things done. Someone with
                  the fortitude and resolve to stand up for the values of
                  Coloradans. That&#8217;s who I am.
                </p>
                <p>
                  I&#8217;ve spent my life in service — to this country, to my
                  family, and to this community. I know what it means to work
                  hard and still feel like the system isn&#8217;t working for
                  you. I was raised by a single mom on minimum wage and food
                  stamps. I know, with absolute humility, what it&#8217;s like
                  when the basics feel out of reach.
                </p>
                <p>
                  I&#8217;m not a career politician. I&#8217;m a husband and
                  father with a track record of service to this district — as a
                  veteran, a small business owner, a school board president, a
                  city councilman, and Director of Economic Development for our
                  state. I&#8217;ve done the work. And I&#8217;m ready to take
                  that experience to Congress and fight for CO-03.
                </p>
                <p>&#8211; Dwayne Romero</p>
              </div>
              <div className="iss-signature">
                <img src="/images/dwrosig.svg" alt="Dwayne Romero signature" width={1425} height={376} />
              </div>
            </div>
          </div>
        </section>

        {/* Accordion (41c507e) */}
        <section className="iss-acc">
          <div className="iss-acc-inner">
            <h2 className="iss-acc-title is-loaded">HOW I&#8217;M GOING TO FIGHT FOR YOU:</h2>
            <div className="iss-acc-divider">
              <span className="iss-divider-line" />
            </div>
            <div className="iss-acc-card is-loaded-2">
              {ISSUES.map((item, i) => (
                <details className="iss-acc-item" name="issues-accordion" id={item.slug} key={item.slug}>
                  <summary className="iss-acc-item-title">
                    <span className="iss-acc-item-text">{item.title}</span>
                    <span className="iss-acc-icon" aria-hidden="true">
                      <span className="e-opened">
                        <CaretDownIcon />
                      </span>
                      <span className="e-closed">
                        <CaretRightIcon />
                      </span>
                    </span>
                  </summary>
                  <div className="iss-acc-content">
                    <div className="iss-acc-content-inner">{item.body}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Chip in today (f05ec70) */}
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

        {/* Join our campaign (2b2c505) */}
        <section className="join">
          <div className="join-photo">
            <div className="join-photo-spacer" />
          </div>
          <div className="join-content">
            <div className="join-inner">
              <h2 className="join-title">JOIN OUR CAMPAIGN</h2>
              <SignupForm variant="foot" instance={1} submitLabel="STAY UPDATED" />
              <h2 className="sms-consent maxdesc2">
                <a href="/privacy-policy">
                  By submitting your cell phone number you are agreeing to
                  receive periodic text messages from Romero for Colorado.
                  Message and data rates may apply. Text HELP for more
                  information. Text STOP to stop receiving messages.{" "}
                  <u>Privacy Policy</u>
                </a>
              </h2>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SitePopups />
      <IssueDeepLinks />
    </>
  );
}
