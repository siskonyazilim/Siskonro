import Link from 'next/link';

export const metadata = {
  title: '404 | Sayfa Bulunamadı | Siskon',
  description: 'Aradığınız sayfa bulunamadı. Siskon ana sayfasına veya popüler sayfalara dönebilirsiniz.',
};

export default function NotFound() {
  return (
    <div className="bg-white min-h-[70vh]">
      <section className="relative overflow-hidden bg-[#0A192F] pt-36 md:pt-44 pb-24 md:pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-700/25 via-transparent to-blue-900/20" />
        <div className="absolute -top-24 -right-20 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container max-w-5xl relative z-10">
          <div className="rounded-[28px] md:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-sky-300 font-bold mb-4">Error 404</p>
            <h1 className="text-6xl md:text-8xl font-black mb-2 text-white">404</h1>
            <h2 className="text-2xl md:text-5xl font-bold mb-5 text-white">Sayfa Bulunamadı</h2>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              Aradığınız sayfa taşınmış, kaldırılmış veya bağlantı yanlış olabilir. Hemen aşağıdaki yönlendirmelerle doğru içeriklere ulaşabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-primary px-7 py-3 rounded-xl">
                Ana Sayfa
              </Link>
              <Link href="/hizmetler" className="px-7 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-all font-semibold text-center">
                Hizmetler
              </Link>
              <Link href="/iletisim#contact-form" className="px-7 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-all font-semibold text-center">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Popüler Sayfalar</h3>
            <p className="text-slate-600 mb-7 leading-relaxed">Kullanıcıların en çok ziyaret ettiği sayfalara tek tıkla geçiş yapın.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/onsuite" className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all font-semibold text-slate-800">OnSuite</Link>
              <Link href="/referanslar" className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all font-semibold text-slate-800">Referanslar</Link>
              <Link href="/kurumsal/bizi-taniyin" className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all font-semibold text-slate-800">Bizi Tanıyın</Link>
              <Link href="/hizmetler" className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all font-semibold text-slate-800">Çözüm Alanları</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
