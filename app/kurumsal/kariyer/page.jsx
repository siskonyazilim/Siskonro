'use client';

import Link from 'next/link';
import { useLanguage } from '../../_context/LanguageContext';
import PageHero from '../../components/PageHero';

export default function CareerPage() {
  const { locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  const openings = isRo
    ? [
      'Dezvoltator Full Stack (React / .NET)',
      'Inginer Automatizare Industrială',
      'Inginer Date & AI',
      'Inginer de Service pe Teren',
    ]
    : isEn
    ? [
      'Full Stack Developer (React / .NET)',
      'Industrial Automation Engineer',
      'Data & AI Engineer',
      'Field Service Engineer',
    ]
    : [
      'Full Stack Yazılım Geliştirici (React / .NET)',
      'Endüstriyel Otomasyon Mühendisi',
      'Veri ve Yapay Zeka Mühendisi',
      'Saha Servis Mühendisi',
    ];

  const roleHighlights = isRo
    ? [
      {
        title: 'Profunzime Inginerească',
        text: 'Lucrați pe sisteme reale de producție, protocoale industriale și software critic utilizat în fabrici globale de producție.',
      },
      {
        title: 'Colaborare Interfuncțională',
        text: 'Construiți soluții împreună cu echipele de automatizare, software și de teren, de la arhitectură la implementare.',
      },
      {
        title: 'Dezvoltare Continuă',
        text: 'Dezvoltați-vă expertiza prin proiecte practice în AI, IIoT, MES și sisteme enterprise cu disponibilitate ridicată.',
      },
    ]
    : isEn
    ? [
      {
        title: 'Engineering Depth',
        text: 'Work on real production systems, industrial protocols, and mission-critical software used in global manufacturing plants.',
      },
      {
        title: 'Cross-functional Collaboration',
        text: 'Build solutions together with automation, software, and field teams from architecture to deployment.',
      },
      {
        title: 'Continuous Growth',
        text: 'Develop your expertise with hands-on projects in AI, IIoT, MES, and high-availability enterprise systems.',
      },
    ]
    : [
      {
        title: 'Derin Mühendislik Kültürü',
        text: 'Global üretim tesislerinde kullanılan kritik yazılımlar, endüstriyel protokoller ve gerçek üretim süreçleri üzerinde çalışın.',
      },
      {
        title: 'Çapraz Ekip İş Birliği',
        text: 'Otomasyon, yazılım ve saha ekipleriyle birlikte uçtan uca çözüm geliştirerek projeleri canlıya alın.',
      },
      {
        title: 'Sürekli Gelişim',
        text: 'AI, IIoT, MES ve yüksek erişilebilirlik gerektiren kurumsal sistemlerde uygulamalı deneyim kazanın.',
      },
    ];

  const processSteps = isRo
    ? [
      'Distribuiți CV-ul și o scurtă scrisoare de motivație prin formularul de contact sau e-mail.',
      'Pre-selecție tehnică și evaluare a potrivirii rolului de către echipa noastră.',
      'Interviu concentrat pe proiecte cu liderii de inginerie.',
      'Feedback final și plan de integrare în cel mai scurt timp.',
    ]
    : isEn
    ? [
      'Share your CV and short motivation note via contact form or e-mail.',
      'Technical pre-screen and role fit evaluation by our team.',
      'Project-focused interview with the engineering leads.',
      'Final feedback and onboarding plan within the shortest time.',
    ]
    : [
      'CVnizi ve kısa motivasyon notunuzu iletişim formu veya e-posta ile paylaşın.',
      'Teknik ön değerlendirme ve rol uyumu incelemesi gerçekleştirilir.',
      'Mühendislik liderleri ile proje odaklı mülakat gerçekleştirilir.',
      'En kısa sürede geri bildirim ve işe başlangıç planı iletilir.',
    ];

  return (
    <div className="bg-white">
      <PageHero
        title={isRo ? 'Carieră' : isEn ? 'Career' : 'Kariyer'}
        subtitle={
          isRo
            ? 'Construiți viitorul software-ului industrial cu echipele noastre de inginerie.'
            : isEn
            ? 'Build the future of industrial software with our engineering teams.'
            : 'Mühendislik ekiplerimizle endüstriyel yazılımın geleceğini birlikte inşa edin.'
        }
        breadcrumbs={isRo ? ['Acasă', 'Corporate', 'Carieră'] : isEn ? ['Home', 'Corporate', 'Career'] : ['Ana Sayfa', 'Kurumsal', 'Kariyer']}
      />

      <section className="py-20 md:py-28 px-6">
        <div className="container-wide max-w-5xl mx-auto">
          <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-8 md:p-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {isRo ? 'Poziții Deschise' : isEn ? 'Open Positions' : 'Açık Pozisyonlar'}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {isRo
                ? 'Alăturați-vă echipelor care construiesc soluții software și de automatizare pentru o excelență măsurabilă în producție.'
                : isEn
                ? 'Join teams that build software and automation solutions for measurable production excellence.'
                : 'Ölçülebilir üretim mükemmelliği için yazılım ve otomasyon çözümleri geliştiren ekiplerimize katılın.'}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openings.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-bold text-slate-800">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-primary">
                {isRo ? 'Aplicați Acum' : isEn ? 'Apply Now' : 'Hemen Başvur'}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {roleHighlights.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-black text-slate-900 mb-5">
              {isRo ? 'Procesul de Aplicare' : isEn ? 'Application Process' : 'Başvuru Süreci'}
            </h3>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processSteps.map((step, idx) => (
                <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 font-medium leading-relaxed">
                  <span className="inline-flex w-7 h-7 rounded-full bg-sky-600 text-white items-center justify-center text-xs font-black mr-3">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{isRo ? 'Sunteți gata să conturați software-ul industrial alături de noi?' : isEn ? 'Ready to shape industrial software with us?' : 'Endüstriyel yazılımın geleceğini bizimle şekillendirmeye hazır mısınız?'}</h2>
          <p>
            {isRo
              ? 'Trimiteți-vă profilul și rolurile de interes; vă vom contacta cu cea mai relevantă poziție.'
              : isEn
              ? 'Send your profile and role interests; we will get back to you with the most relevant position.'
              : 'Profilinizi ve ilgilendiğiniz rolü paylaşın, size en uygun pozisyon için en kısa sürede geri dönüş yapalım.'}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">
            {isRo ? 'Trimiteți Aplicația' : isEn ? 'Send Your Application' : 'Başvurunuzu Gönderin'}
          </Link>
        </div>
      </section>
    </div>
  );
}
