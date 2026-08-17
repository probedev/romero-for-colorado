// YouTube Shorts for the home page carousel (order per client).
// Thumbnails are self-hosted in public/images/shorts/<id>.jpg — the YouTube
// player only loads when a card is clicked.
export type Short = { id: string; title: string };

export const SHORTS: Short[] = [
  { id: "1yrrKuuHvdM", title: "I’ll have your back" },
  { id: "QNonrIlmSfI", title: "It’s about legacy" },
  { id: "yn3V8LgCPUk", title: "I will fight for these communities." },
  { id: "TqZKfkYPnD4", title: "Service is our family's legacy" },
  {
    id: "KqGJaquhZso",
    title:
      "Servant leadership isn’t about trophies or photos. It’s about giving back to those that give to you.",
  },
  { id: "5dAs99nWgd8", title: "We need leaders who lean in, not shirk responsibilities" },
  { id: "CdS5x3hK1EA", title: "Jeff Hurd buckled" },
  { id: "HWGjCJ8E2OA", title: "Rural Hospitals are at Risk" },
  { id: "PmMl5sdTCLY", title: "No Community Left Behind" },
  { id: "b03CVJMSgMc", title: "We need a strong leader, not a weak alwyer" },
];
