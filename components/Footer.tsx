/* eslint-disable @next/next/no-img-element */
import { ACTBLUE_BASE, EMAIL_INFO, EMAIL_PRESS, SOCIAL } from "../lib/urls";
import { socialIcon } from "./icons";

// Site footer (Elementor template 3864). The FEC disclaimer, military
// disclaimer, SMS consent, and "Powered By Apollo" credit are legally
// required content — byte-for-byte from the live site. Do not edit.
export default function Footer() {
  return (
    <footer>
      <div className="ft-cta">
        <div className="ft-cta-row">
          <a className="ft-btn ft-btn-donate" href={ACTBLUE_BASE}>
            <span className="btn-label">Donate</span>
          </a>
          <a className="ft-btn ft-btn-volunteer" href="/volunteer">
            <span className="btn-label">Volunteer</span>
          </a>
        </div>
      </div>
      <div className="ft">
        <div className="ft-inner">
          <div className="ft-logo">
            <a href="/">
              <img
                src="/images/drlogob.svg"
                alt="Dwayne Romero for Colorado"
                width={322}
                height={122}
              />
            </a>
          </div>
          <nav className="ft-nav" aria-label="Footer">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/meet-dwayne/">Meet Dwayne</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <a href="/issues">Issues</a>
              </li>
              <li>
                <a href="/volunteer">Volunteer</a>
              </li>
              <li>
                <a href={ACTBLUE_BASE}>Donate</a>
              </li>
            </ul>
          </nav>
          <div className="ft-social">
            {SOCIAL.map((s) => (
              <div key={s.key}>
                <a className="eicon" href={s.href} target="_blank" rel="noopener">
                  <span className="screen-reader-text">{s.label}</span>
                  {socialIcon(s.key, { "aria-hidden": true } as never)}
                </a>
              </div>
            ))}
          </div>
          <div className="ft-contact">
            <h2 className="ft-address">
              PO Box 371, Woody Creek, CO 81656 <br />
              <a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a>
            </h2>
            <div className="ft-links">
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL_INFO}`}>Contact</a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL_PRESS}`}>Press</a>
                </li>
                <li>
                  <a href="/privacy-policy/#accessibility">Accessibility</a>
                </li>
              </ul>
            </div>
            <div className="ft-paidfor">
              <div className="ft-paidfor-text">Paid for by Romero for Colorado</div>
            </div>
            <div className="ft-legal">
              <h2 className="ft-disclaimer">
                Use of his military rank, job titles and photographs in uniform
                does not imply endorsement by the U.S. Army or the Department of
                War.
              </h2>
            </div>
            <h2 className="ft-apollo">
              <a href="http://apolloartistry.com/" target="_blank" rel="noopener">
                Powered By <span>Apollo</span>
              </a>
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
