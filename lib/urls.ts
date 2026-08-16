// Canonical outbound URLs — preserved EXACTLY from the live site.
// Do not normalize amounts, param order, or tier ordering.

export const ACTBLUE_BASE = "https://secure.actblue.com/donate/rfc-website";

export const actblue = (amount?: number) =>
  amount === undefined
    ? ACTBLUE_BASE
    : `${ACTBLUE_BASE}?amount=${amount}&express_lane=true`;

export const NUMERO_SIGNUP =
  "https://secure.numero.ai/signup/Sign-Up-227ef8ab-ce0e-4354-b510-b62d3cb58a71";

export const NUMERO_VOLUNTEER =
  "https://secure.numero.ai/signup/Volunteer-with-Romero-for-Colorado";

export const EMAIL_INFO = "info@romeroforcolorado.com";
export const EMAIL_PRESS = "press@romeroforcolorado.com";

export const YOUTUBE_LIGHTBOX_URL =
  "https://www.youtube.com/embed/ZGcTJrVIAk8?feature=oembed&autoplay=1";

export const SOCIAL = [
  { key: "facebook", href: "/facebook", label: "Facebook" },
  { key: "x-twitter", href: "/twitter", label: "X-twitter" },
  { key: "instagram", href: "/instagram", label: "Instagram" },
  { key: "youtube", href: "/youtube", label: "Youtube" },
  { key: "bluesky", href: "/bluesky", label: "Bluesky" },
  { key: "threads", href: "/threads", label: "Threads" },
  { key: "tiktok", href: "/tiktok", label: "Tiktok" },
] as const;
