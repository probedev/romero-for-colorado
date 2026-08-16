import { SOCIAL } from "../lib/urls";
import { socialIcon } from "./icons";

// Row of social links (header + mobile hero variants share styling hooks).
export default function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={`social-icons ${className ?? ""}`}>
      {SOCIAL.map((s) => (
        <a
          key={s.key}
          className={`social-icon social-icon-${s.key}`}
          href={s.href}
          target="_blank"
          rel="noopener"
        >
          <span className="screen-reader-text">{s.label}</span>
          {socialIcon(s.key, { "aria-hidden": true } as never)}
        </a>
      ))}
    </div>
  );
}
