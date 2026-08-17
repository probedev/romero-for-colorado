// News & Press listing data. Newest first. type "news" opens the external
// article; type "press" links to the internal press-release page.
export type NewsItem = {
  type: "News Article" | "Press Release";
  date: { mon: string; day: string; yr: string };
  title: string;
  href: string;
  external?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    type: "News Article",
    date: { mon: "Aug", day: "8", yr: "2026" },
    title:
      "What are the key issues separating Jeff Hurd and Dwayne Romero in CD3 race?",
    href: "https://www.durangoherald.com/articles/news/what-are-the-key-issues-separating-jeff-hurd-and-dwayne-romero-in-cd3-race/?link_source=ta_first_comment&taid=6a77b5003869d40001e4b5be&utm_campaign=trueanthem&utm_medium=social&utm_source=facebook",
    external: true,
  },
  {
    type: "Press Release",
    date: { mon: "Jul", day: "30", yr: "2026" },
    title:
      "New poll finds Dwayne Romero tied with incumbent Republican in race for Colorado’s 3rd Congressional District",
    href: "/press/new-poll-romero-tied-cd3/",
  },
];
