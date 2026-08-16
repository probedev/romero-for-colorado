import { NUMERO_SIGNUP } from "../lib/urls";

// Numero lead-capture form. Action URL, method, field names, and hidden
// fields must stay EXACTLY as on the live site so submissions land in the
// same Numero account. Payload shape:
//   GET {NUMERO_SIGNUP}?type=SignupForm&email=…&zip=…&phone=…
//       &YesSignMeUpForUpdatesForBinder=true
export default function SignupForm({
  variant,
  instance,
  submitLabel,
}: {
  variant: "hd" | "foot";
  instance: number; // for unique input ids across the page
  submitLabel: string;
}) {
  const id = (f: string) => `f${instance}_${f}`;
  return (
    <div className={`form-${variant} fadeInUp`}>
      <form
        action={NUMERO_SIGNUP}
        method="GET"
        name="signup"
        acceptCharset="utf-8"
        className="ngp-signup-header"
        autoComplete="on"
      >
        <input name="type" type="hidden" value="SignupForm" />
        <div className="inputs clearfix">
          <div className="email">
            <label htmlFor={id("email")}>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              id={id("email")}
              name="email"
              required
            />
          </div>
          <div className="zip">
            <label htmlFor={id("zip")}>Zip Code</label>
            <input
              type="text"
              placeholder="Zip Code"
              name="zip"
              id={id("zip")}
              maxLength={5}
            />
          </div>
          <div className="phone">
            <label htmlFor={id("phone")}>Phone Number (Optional)</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone (Optional)"
              id={id("phone")}
              maxLength={25}
            />
          </div>
        </div>
        <input name="YesSignMeUpForUpdatesForBinder" type="hidden" value="true" />
        <div className="submit-input">
          <input type="submit" className="btno btno-red" value={submitLabel} name="" />
        </div>
      </form>
    </div>
  );
}
