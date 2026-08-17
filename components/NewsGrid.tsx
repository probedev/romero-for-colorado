import { NEWS, NewsItem } from "../lib/news";
import { ArrowIcon } from "./icons";

function Card({ item }: { item: NewsItem }) {
  return (
    <article className="nw-card">
      <div className="nw-date" aria-hidden="true">
        <span className="nw-mon">{item.date.mon}</span>
        <span className="nw-day">{item.date.day}</span>
        <span className="nw-yr">{item.date.yr}</span>
      </div>
      <p className="nw-type">{item.type}</p>
      <h2 className="nw-title">{item.title}</h2>
      <a
        className="nw-more nw-link"
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener" : undefined}
      >
        Read More
        <ArrowIcon aria-hidden="true" />
        <span className="screen-reader-text">
          : {item.title}
          {item.external ? " (opens in a new tab)" : ""}
        </span>
      </a>
    </article>
  );
}

export default function NewsGrid({ filter }: { filter?: NewsItem["type"] }) {
  const items = filter ? NEWS.filter((n) => n.type === filter) : NEWS;
  return (
    <div className="nw-grid">
      {items.map((n) => (
        <Card key={n.href} item={n} />
      ))}
    </div>
  );
}
