/**
 * Ana sayfa Global İstatistikler bölümü — Server Component
 * Strapi'den gelen data.stats verisiyle çalışır.
 */
export default function GlobalStatsSection({ data }) {
  const stats = data.stats ?? [];

  return (
    <section className="section-dark py-12 md:py-20" style={{ background: '#0A192F' }}>
      <div className="container-wide px-6">
        <div className="section-head reveal text-center max-w-4xl mx-auto mb-12">
          <span className="eyebrow" style={{ color: '#7dd3fc' }}>
            {data.globalEyebrow}
          </span>
          <h2 style={{ color: '#fff' }} className="text-3xl md:text-5xl font-black">
            {data.globalTitle}
          </h2>
          <p className="lead text-slate-300 mt-5">
            {data.globalDescription}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 text-center"
            >
              <div className="val text-3xl sm:text-4xl md:text-5xl font-black text-sky-300">
                {stat.num}
              </div>
              <div className="lbl text-white/75 mt-2 text-xs font-bold tracking-[0.14em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
