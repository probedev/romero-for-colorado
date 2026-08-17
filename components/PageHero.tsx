// Photo hero banner for Phase 2 pages: kicker + big title bottom-left over a
// full-width image (layout per the reference site, Romero design language).
export default function PageHero({
  image,
  imageSm,
  kicker,
  title,
}: {
  image: string;
  imageSm?: string;
  kicker: string;
  title: string;
}) {
  const style = {
    "--ph-img": `url(${image})`,
    "--ph-img-sm": `url(${imageSm ?? image})`,
  } as React.CSSProperties;
  return (
    <section className="ph" style={style}>
      <div className="ph-inner">
        <p className="ph-kicker">{kicker}</p>
        <h1 className="ph-title">{title}</h1>
      </div>
    </section>
  );
}
