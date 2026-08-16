import { actblue } from "../lib/urls";
import { ChevronRightIcon, WindowCloseIcon } from "./icons";

// Expandable "Donate to Support..." banner at the very top of home + issues.
// Uses native <details>/<summary> like the live site's Elementor accordion.
export default function TopBanner({ headingId }: { headingId: string }) {
  return (
    <div className="tb">
      <details className="tb-item" id={headingId}>
        <summary className="tb-title" aria-controls={headingId}>
          <span className="tb-title-text">
            Donate to Support Dwayne Romero for Colorado
          </span>
          <span className="tb-title-icon" aria-hidden="true">
            <span className="tb-icon-opened">
              <WindowCloseIcon />
            </span>
            <span className="tb-icon-closed">
              <ChevronRightIcon />
            </span>
          </span>
        </summary>
        <div className="tb-content">
          <div className="tb-inner">
            <div className="tb-left">
              <h2 className="tb-kicker">FIGHT FOR CO-03</h2>
              <h1 className="tb-heading">Donate to Support Romero for Colorado</h1>
              <div className="tb-text">
                <p>
                  If you&#8217;ve saved your information with ActBlue Express,
                  your donation will go through immediately.
                </p>
              </div>
            </div>
            <div className="tb-right">
              <div className="tb-col">
                <a className="tier tb-tier" href={actblue(5)}>
                  <span className="tier-label">$5</span>
                </a>
                <a className="tier tb-tier" href={actblue(25)}>
                  <span className="tier-label">$25</span>
                </a>
                <a className="tier tb-tier" href={actblue(250)}>
                  <span className="tier-label">$250</span>
                </a>
              </div>
              <div className="tb-col">
                <a className="tier tb-tier" href={actblue(10)}>
                  <span className="tier-label">$10</span>
                </a>
                <a className="tier tb-tier" href={actblue(100)}>
                  <span className="tier-label">$100</span>
                </a>
                <a className="tier tb-tier tb-tier-other" href={actblue()}>
                  <span className="tier-label">Other Amount</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
