import type { Metadata } from "next";
import Footer from "../../components/Footer";
import SignupForm from "../../components/SignupForm";
import SitePopups from "../../components/SitePopups";
import TopBanner from "../../components/TopBanner";
import TopNav from "../../components/TopNav";

export const metadata: Metadata = {
  title: "Sign Up - Romero for Colorado",
  description:
    "Sign up for updates from Romero for Colorado — Dwayne Romero’s campaign for Colorado’s Third Congressional District.",
  alternates: { canonical: "https://romeroforcolorado.com/signup/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Sign Up - Romero for Colorado",
    url: "https://romeroforcolorado.com/signup/",
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

// Branded signup page — same GET handoff/payload as the homepage forms.
export default function SignUp() {
  return (
    <>
      <main id="content" className="site-main">
        <TopBanner headingId="top-donate-signup" />
        <TopNav />
        <div className="pr-band">
          <div className="pr-band-inner">
            <p className="ph-kicker">Team Romero</p>
            <h1 className="pr-band-title">Sign Up</h1>
          </div>
        </div>
        <section className="su">
          <div className="su-inner">
            <h2 className="join-title">JOIN OUR CAMPAIGN</h2>
            <SignupForm variant="foot" instance={9} submitLabel="STAY UPDATED" />
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
        </section>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
