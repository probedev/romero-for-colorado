import type { Metadata } from "next";
import Script from "next/script";
import "../styles/tokens.css";
import "../styles/fonts.css";
import "../styles/base.css";
import "../styles/banner.css";
import "../styles/header.css";
import "../styles/forms.css";
import "../styles/home.css";
import "../styles/issues.css";
import "../styles/privacy.css";
import "../styles/footer.css";
import "../styles/popups.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://romeroforcolorado.com"),
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [
      { url: "/images/cropped-faviconsm2-32x32.png", sizes: "32x32" },
      { url: "/images/cropped-faviconsm2-192x192.png", sizes: "192x192" },
    ],
    apple: [{ url: "/images/cropped-faviconsm2-180x180.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US">
      <head>
        {/* Adobe Fonts kit (brothers / stratos) — same third-party kit the
            live site loads; these fonts cannot be self-hosted per license. */}
        <link rel="stylesheet" type="text/css" href="https://use.typekit.net/ncg8rno.css" />
      </head>
      <body>
        <a className="skip-link screen-reader-text" href="#content">
          Skip to content
        </a>
        {children}
        {/* UserWay accessibility widget (same account as live site) */}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="I1rdyyTswi"
          strategy="afterInteractive"
        />
        {/* Meta pixel (same ID as live site) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '955177076981934');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=955177076981934&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
