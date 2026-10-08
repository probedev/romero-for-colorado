// News & Press listing data. Newest first. External coverage opens the
// outlet's article in a new tab; "Press Release" links to the internal
// press-release page. Quotes must be verbatim from the linked source.
export type NewsItem = {
  type: "News Article" | "Press Release" | "Interview" | "Letter to the Editor";
  outlet?: string;
  date: { mon: string; day: string; yr: string };
  title: string;
  quote?: string;
  href: string;
  external?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    type: "Letter to the Editor",
    outlet: "Durango Herald",
    date: { mon: "Sep", day: "25", yr: "2026" },
    title: "When is enough enough? Vote Romero",
    quote:
      "Because enough is enough, vote for Dwayne Romero for Congress – a man who committed his life to military and public service.",
    href: "https://www.durangoherald.com/articles/opinion/when-is-enough-enough-vote-romero",
    external: true,
  },
  {
    type: "Interview",
    outlet: "Daily Kos",
    date: { mon: "Sep", day: "23", yr: "2026" },
    title: "From ‘negative net worth’ to a run for Congress: Daily Kos sits down with Dwayne Romero",
    quote: "I come at it from the perspective of servant-based leadership.",
    href: "https://www.dailykos.com/stories/2026/9/23/800102562/series/how-this-democrat-went-from-negative-net-worth-to-a-run-for-congress/",
    external: true,
  },
  {
    type: "News Article",
    outlet: "CPR News",
    date: { mon: "Sep", day: "20", yr: "2026" },
    title:
      "In Club 20 debate, Romero holds Hurd to his broken promises on healthcare and cost of living",
    quote:
      "He promised to also defend our cost of living. He promised to help provide access to healthcare and he promised to get out of forever wars.",
    href: "https://www.cpr.org/2026/09/20/colorado-third-congressional-district-debate/",
    external: true,
  },
  {
    type: "News Article",
    outlet: "The New York Times",
    date: { mon: "Sep", day: "7", yr: "2026" },
    title: "Trump’s Trade War Is Shaping the Fight for Congress",
    quote:
      "One alternative vote doesn’t make the man, doesn’t make the backbone. Doesn’t make the position of defending his constituents. It is almost a throwaway.",
    href: "https://www.nytimes.com/2026/09/07/us/trump-tariffs-iran-congress-colorado.html",
    external: true,
  },
  {
    type: "News Article",
    outlet: "Grand Junction Daily Sentinel",
    date: { mon: "Sep", day: "5", yr: "2026" },
    title: "Romero calls GAME Act public-land swap “unacceptable” as opposition grows",
    quote:
      "The bill sidesteps the typical process: public comment period, independent appraisal, and an appraisal review, that exists to protect taxpayers from shady deals like this.",
    href: "https://www.gjsentinel.com/news/western_colorado/gathering-opposition-to-large-land-swap-in-garfield-county/article_ede86541-2680-41a8-8de8-3136c426081f.html",
    external: true,
  },
  {
    type: "News Article",
    outlet: "Durango Herald",
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
