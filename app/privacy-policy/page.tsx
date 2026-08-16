/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Footer from "../../components/Footer";
import SitePopups from "../../components/SitePopups";

export const metadata: Metadata = {
  title: "Privacy Policy - Romero for Colorado",
  alternates: { canonical: "https://romeroforcolorado.com/privacy-policy/" },
  openGraph: {
    locale: "en_US",
    type: "article",
    title: "Privacy Policy - Romero for Colorado",
    description:
      "Privacy Policy INFORMATION THAT IS GATHERED FROM VISITORS In common with other websites, log files are stored on the web server saving details such as the visitor’s IP address, browser type, referring page and time of visit. Cookies may be used to remember visitor preferences when interacting with the website. Where registration is required, the [&hellip;]",
    url: "https://romeroforcolorado.com/privacy-policy/",
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
  twitter: { card: "summary_large_image" },
};

// The Privacy Policy + Accessibility copy below is legally required content,
// byte-for-byte from the live site. Do not edit without flagging.
export default function PrivacyPolicy() {
  return (
    <>
      <main id="content" className="site-main">
        <div className="priv">
          <div className="priv-logo">
            <a href="/">
              <img src="/images/logorr.svg" alt="Romero for Colorado" width={374} height={192} />
            </a>
          </div>
          <div className="priv-inner">
            <h2 className="priv-title">Privacy Policy</h2>
            <div className="priv-text pritxt">
              <p>
                <strong>INFORMATION THAT IS GATHERED FROM VISITORS</strong>
              </p>
              <p>
                In common with other websites, log files are stored on the web
                server saving details such as the visitor&#8217;s IP address,
                browser type, referring page and time of visit. Cookies may be
                used to remember visitor preferences when interacting with the
                website. Where registration is required, the visitor&#8217;s
                email and a username will be stored on the server.
              </p>
              <p>
                <strong>HOW THE INFORMATION IS USED</strong>
              </p>
              <p>
                The information is used to enhance the vistor&#8217;s
                experience when using the website to display personalised
                content and possibly advertising. E-mail addresses will not be
                sold, rented or leased to 3rd parties. E-mail may be sent to
                inform you of news of our services or offers by us or our
                affiliates.
              </p>
              <p>
                <strong>VISITOR OPTIONS</strong>
              </p>
              <p>
                If you have subscribed to one of our services, you may
                unsubscribe by following the instructions which are included in
                e-mail that you receive. You may be able to block cookies via
                your browser settings but this may prevent you from access to
                certain features of the website.
              </p>
              <p>
                <strong>COOKIES</strong>
              </p>
              <p>
                Cookies are small digital signature files that are stored by
                your web browser that allow your preferences to be recorded
                when visiting the website. Also they may be used to track your
                return visits to the website. 3rd party advertising companies
                may also use cookies for tracking purposes.
              </p>
              <p>
                <strong>GOOGLE ADS</strong>
              </p>
              <p>
                Google, as a third party vendor, uses cookies to serve ads.
                Google&#8217;s use of the DART cookie enables it to serve ads
                to visitors based on their visit to sites they visit on the
                Internet. Website visitors may opt out of the use of the DART
                cookie by visiting the Google ad and content network privacy
                policy.
              </p>
              <p>
                <strong>TEXTING</strong>
              </p>
              <p>
                The above excludes text messaging originator opt-in data and
                consent, which information will not be shared with any third
                parties, provided that the foregoing does not apply to sharing
                (1) with vendors, consultants and other service providers who
                need access to such information to carry out work on our behalf
                (and who will not use such information for their own purposes);
                and (2) if we believe disclosure is required by any applicable
                law, rule, or regulation or to comply with law enforcement or
                legal process.
              </p>
            </div>
            <div className="priv-spacer" id="accessibility" />
            <div className="priv-divider">
              <span className="priv-divider-line" />
            </div>
            <h2 className="priv-title">Accessibility</h2>
            <div className="priv-text pritxt">
              <p>
                <strong>General</strong>
              </p>
              <p>
                Our Organization strives to ensure that its services are
                accessible to people with disabilities. We have invested a
                significant amount of resources to help ensure that its website
                is made easier to use and more accessible for people with
                disabilities, with the strong belief that website accessibility
                efforts assist all users and that every person has the right to
                live with dignity, equality, comfort and independence.
              </p>
              <p>
                Accessibility on our website by the UserWay&#8217;s Web
                Accessibility Widget is powered by a dedicated accessibility
                server. The software allows this website to improve its
                compliance with the Web Content Accessibility Guidelines (WCAG
                2.1).
              </p>
              <p>
                <strong>Enabling the Accessibility Menu</strong>
              </p>
              <p>
                The accessibility menu can be enabled by clicking the
                accessibility menu icon that appears on the corner of the page.
                After triggering the accessibility menu, please wait a moment
                for the accessibility menu to load in its entirety.
              </p>
              <p>
                <strong>Disclaimer</strong>
              </p>
              <p>
                We are committed to continuing efforts to constantly improve
                the accessibility of our site and services in the belief that
                it is our collective moral obligation to allow seamless,
                accessible and unhindered use also for those of us with
                disabilities.
              </p>
              <p>
                In an ongoing effort to continually improve and remediate
                accessibility issues, we also regularly rescan with
                UserWay&#8217;s Accessibility Scanner to identify and fix every
                possible accessibility barrier on our site. Despite our efforts
                to make all pages and content fully accessible, some content
                may not have yet been fully adapted to the strictest
                accessibility standards. This may be a result of not having
                found or identified the most appropriate technological
                solution.
              </p>
              <p>
                <strong>Here For You</strong>
              </p>
              <p>
                If you are experiencing difficulty with any content or require
                assistance with any part of our site, please contact us during
                normal business hours as detailed below and we will be happy to
                assist.
              </p>
              <p>
                <strong>Contact Us</strong>
              </p>
              <p>
                If you wish to report an accessibility issue, have any
                questions or need assistance, please contact us.
              </p>
            </div>
            <div className="priv-return">
              <a className="btn-return" href="/">
                <span className="btn-label">RETURN HOME</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SitePopups />
    </>
  );
}
