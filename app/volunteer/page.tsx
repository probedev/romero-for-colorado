import type { Metadata } from "next";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";
import { NUMERO_VOLUNTEER } from "../../lib/urls";

export const metadata: Metadata = {
  title: "Volunteer - Romero for Colorado",
  description:
    "Join Team Romero — knock doors, make calls, write postcards, host events, and help send Dwayne Romero to Congress for Colorado’s Third District.",
  alternates: { canonical: "https://romeroforcolorado.com/volunteer/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Volunteer - Romero for Colorado",
    url: "https://romeroforcolorado.com/volunteer/",
    siteName: "Romero for Colorado",
    images: [
      {
        url: "https://romeroforcolorado.com/images/og-volunteer.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: [] },
};

const WAYS = [
  "Knock Doors",
  "Make Calls (virtual)",
  "Write post cards",
  "Deliver yard signs",
  "Host a fundraiser",
  "Host a meet and greet (CO-03 only)",
  "Request a yard sign",
  "Social Media amplification",
];

// Branded volunteer page. The form hands off to the campaign's Numero
// volunteer signup with the fields prefilled via URL params (verified —
// Numero reads first_name/last_name/email/zip/phone). Volunteers pick how
// they want to help and confirm there; data lands in the same account.
export default function Volunteer() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-volunteer" />
        <TopNav current="/volunteer" />
        <PageHero image="/images/volunteer-hero.jpg" imageSm="/images/volunteer-hero-sm.jpg" kicker="Team Romero" title="Volunteer" />
        <section className="vol">
          <div className="vol-inner">
            <div className="vol-head">
              <h2 className="vol-kicker">Join Team Romero</h2>
              <h2 className="vol-title">This campaign is powered by people like you</h2>
              <p className="vol-text">
                Together we lead — and it starts with neighbors knocking doors,
                making calls, and showing up for CO-03. Tell us who you are and
                we&#8217;ll get you plugged in.
              </p>
            </div>
            <form className="vf" action={NUMERO_VOLUNTEER} method="GET" name="volunteer" acceptCharset="utf-8" autoComplete="on">
              <div className="vf-row">
                <div className="vf-field">
                  <label htmlFor="vf_first">First Name</label>
                  <input type="text" id="vf_first" name="first_name" placeholder="First Name" autoComplete="given-name" required />
                </div>
                <div className="vf-field">
                  <label htmlFor="vf_last">Last Name</label>
                  <input type="text" id="vf_last" name="last_name" placeholder="Last Name" autoComplete="family-name" required />
                </div>
              </div>
              <div className="vf-field">
                <label htmlFor="vf_email">Email Address</label>
                <input type="email" id="vf_email" name="email" placeholder="Email Address" autoComplete="email" required />
              </div>
              <div className="vf-row">
                <div className="vf-field">
                  <label htmlFor="vf_zip">Zip Code</label>
                  <input type="text" id="vf_zip" name="zip" placeholder="Zip Code" maxLength={5} autoComplete="postal-code" />
                </div>
                <div className="vf-field">
                  <label htmlFor="vf_phone">Phone (Optional)</label>
                  <input type="text" id="vf_phone" name="phone" placeholder="Phone (Optional)" maxLength={25} autoComplete="tel-national" />
                </div>
              </div>
              <input type="submit" className="vf-submit" value="SIGN UP TO VOLUNTEER" name="" />
              <p className="vf-note">
                Next you&#8217;ll pick how you want to help and confirm your
                signup on our secure form.
              </p>
            </form>
            <h2 className="sms-consent vol-consent">
              <a href="/privacy-policy">
                By submitting your cell phone number you are agreeing to
                receive periodic text messages from Romero for Colorado.
                Message and data rates may apply. Text HELP for more
                information. Text STOP to stop receiving messages.{" "}
                <u>Privacy Policy</u>
              </a>
            </h2>
            <div className="vol-ways">
              <h3 className="vol-ways-title">Ways to help</h3>
              <ul>
                {WAYS.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
