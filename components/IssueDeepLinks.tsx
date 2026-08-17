"use client";
import { useEffect } from "react";

// Deep links for the issues accordion: /issues#water opens and scrolls to
// that item (the details `name` group closes the others automatically).
// Opening an item also updates the hash so positions are shareable.
export default function IssueDeepLinks() {
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(location.hash.replace("#", ""));
      if (!slug) return;
      const el = document.getElementById(slug);
      if (!el || el.tagName !== "DETAILS") return;
      (el as HTMLDetailsElement).open = true;
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (!d.matches(".iss-acc-item") || !d.id) return;
      if (d.open) {
        history.replaceState(null, "", `#${d.id}`);
      } else if (location.hash === `#${d.id}`) {
        history.replaceState(null, "", location.pathname);
      }
    };
    document.addEventListener("toggle", onToggle, true);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);
  return null;
}
