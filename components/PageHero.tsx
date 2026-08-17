// Photo hero banner for Phase 2 pages: kicker + big title bottom-left over a
// full-width image (layout per the reference site, Romero design language).
export default function PageHero({
  image,
  kicker,
  title,
}: {
  image: string;
  kicker: string;
  title: string;
}) {
  return (
    <section className="ph" style={{ backgroundImage: `url(${image})` }}>
      <div className="ph-inner">
        <p className="ph-kicker">{kicker}</p>
        <h1 className="ph-title">{title}</h1>
      </div>
    </section>
  );
}
