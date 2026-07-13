'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import { useLanguage } from '../../_context/LanguageContext';

const COOKIE_HTML_TR = `<div style="width:100%;">
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>ÇEREZ POLİTİKASI</b></p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>1. Amaç ve Kapsam</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">İşbu Çerez Politikası ("Politika"), SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş. ("Siskon" veya "Şirket") tarafından işletilen www.siskon.com.tr internet sitesinde ("Web Sitesi") kullanılan çerezler ve benzer izleme teknolojileri hakkında ziyaretçileri bilgilendirmek amacıyla, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), 5651 sayılı Kanun ve Kişisel Verileri Koruma Kurulu'nun 20.06.2022 tarihli Çerez Uygulamaları Hakkında Rehber'i çerçevesinde hazırlanmıştır.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Bu Politika, Siskon Aydınlatma Metni'nin tamamlayıcı bir parçasıdır ve onunla birlikte okunmalıdır.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>2. Çerez Nedir?</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Çerez (cookie), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, tablet, telefon vb.) yerleştirilen küçük metin dosyalarıdır. Çerezler; oturumunuzun korunması, dil ve görüntüleme tercihlerinizin hatırlanması, web sitesinin güvenliği, performansı ve kullanım analizi gibi amaçlarla kullanılır.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Saklama süresine göre çerezler ikiye ayrılır:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Oturum çerezleri: yalnızca tarayıcı oturumu süresince saklanır, tarayıcı kapatıldığında silinir.</li>
<li>Kalıcı çerezler: belirli bir süre veya kullanıcı tarafından silinene kadar cihazda saklanır.</li>
</ul>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Kaynağına göre çerezler ikiye ayrılır:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Birinci taraf çerezler: doğrudan ziyaret ettiğiniz alan adı (siskon.com.tr) tarafından yerleştirilir.</li>
<li>Üçüncü taraf çerezler: web sitesinde gömülü bulunan üçüncü taraf hizmetler (ör. Google Analytics, sosyal medya eklentileri) tarafından yerleştirilir.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>3. Kullanılan Çerez Kategorileri</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Web Sitemizde Kişisel Verileri Koruma Kurulu'nun rehberi doğrultusunda dört ana çerez kategorisi kullanılmaktadır:</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(a) Zorunlu Çerezler.</b> Web Sitesi'nin temel işlevlerinin yerine getirilmesi için kesinlikle gerekli olan çerezlerdir. Oturum yönetimi, güvenlik (CSRF koruması), yük dengeleme, çerez tercih kayıtları gibi amaçlarla kullanılır. Bu çerezler ziyaretçinin açık rızasına tabi değildir; KVKK 5/2-f uyarınca meşru menfaat dayanağıyla yerleştirilir. Devre dışı bırakılırsa Web Sitesi'nin temel işlevleri çalışmaz.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(b) Performans / Analitik Çerezler.</b> Web Sitesi'nin nasıl kullanıldığını anlamak, ziyaretçi sayısını ölçmek, hangi sayfaların daha çok ziyaret edildiğini öğrenmek ve site performansını iyileştirmek amacıyla kullanılır. İstatistiksel analiz amaçlıdır ve genellikle anonimleştirilmiş veri toplar. Açık rızanıza tabidir.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(c) İşlevsellik Çerezleri.</b> Dil tercihi, görüntüleme ayarları, video oynatıcı kontrolü gibi kullanıcı tercihlerinin hatırlanması amacıyla kullanılır. Açık rızanıza tabidir.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(d) Hedefleme / Reklam Çerezleri.</b> Ziyaretçilerin ilgi alanlarına göre içerik veya reklam sunulması, sosyal medya entegrasyonu ve dijital pazarlama kampanyalarının ölçümlenmesi amacıyla kullanılır. Üçüncü taraf reklam ağları (Google Ads, LinkedIn Insight, Meta Pixel vb.) tarafından yerleştirilebilir. Açık rızanıza tabidir.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>4. Web Sitesinde Kullanılan Çerezler</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Aşağıdaki tabloda Web Sitemizde halihazırda kullanılan çerezler listelenmektedir. Liste, üçüncü taraf hizmetlerin güncellenmesi durumunda değişebilir; en güncel hâli için çerez yönetim panelimizdeki canlı listeye başvurabilirsiniz.</p>

<div style="overflow-x:auto;border:1px solid #ddd;padding:10px;border-radius:5px;margin-top:15px;">
<table style="border-collapse:collapse;width:100%;margin-top:10px;">
<thead><tr>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Çerez Adı</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Kategori</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Amaç</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Süre</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Sağlayıcı / Tip</th>
</tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #ddd;">PHPSESSID</td><td style="padding:10px;border:1px solid #ddd;">Zorunlu</td><td style="padding:10px;border:1px solid #ddd;">Oturum yönetimi ve kullanıcı kimliğinin korunması</td><td style="padding:10px;border:1px solid #ddd;">Oturum</td><td style="padding:10px;border:1px solid #ddd;">1. taraf (siskon.com.tr)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">cookie_consent</td><td style="padding:10px;border:1px solid #ddd;">Zorunlu</td><td style="padding:10px;border:1px solid #ddd;">Çerez tercih seçimlerinin saklanması</td><td style="padding:10px;border:1px solid #ddd;">12 ay</td><td style="padding:10px;border:1px solid #ddd;">1. taraf (siskon.com.tr)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">_ga</td><td style="padding:10px;border:1px solid #ddd;">Performans/Analitik</td><td style="padding:10px;border:1px solid #ddd;">Google Analytics — benzersiz ziyaretçi tanımlama</td><td style="padding:10px;border:1px solid #ddd;">2 yıl</td><td style="padding:10px;border:1px solid #ddd;">3. taraf (Google LLC)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">_ga_*</td><td style="padding:10px;border:1px solid #ddd;">Performans/Analitik</td><td style="padding:10px;border:1px solid #ddd;">Google Analytics 4 — oturum durumu</td><td style="padding:10px;border:1px solid #ddd;">2 yıl</td><td style="padding:10px;border:1px solid #ddd;">3. taraf (Google LLC)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">lang / locale</td><td style="padding:10px;border:1px solid #ddd;">İşlevsellik</td><td style="padding:10px;border:1px solid #ddd;">Dil tercihinin hatırlanması</td><td style="padding:10px;border:1px solid #ddd;">12 ay</td><td style="padding:10px;border:1px solid #ddd;">1. taraf (siskon.com.tr)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">li_at, lidc</td><td style="padding:10px;border:1px solid #ddd;">Hedefleme/Reklam</td><td style="padding:10px;border:1px solid #ddd;">LinkedIn Insight Tag — kampanya ölçümleme</td><td style="padding:10px;border:1px solid #ddd;">1-2 yıl</td><td style="padding:10px;border:1px solid #ddd;">3. taraf (LinkedIn Corp.)</td></tr>
</tbody>
</table>
</div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:8pt;font-size:0.9em;color:#555;">Yukarıdaki tablo örnek niteliğindedir. Web Sitesi'nde aktif olarak kullanılan çerezlerin tam ve güncel listesi, çerez yönetim panelinden (cookie consent banner) görüntülenebilir. Bu Politika, çerez panelinde değişiklik yapıldığında güncellenir.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>5. Üçüncü Taraf Çerezler ve Yurt Dışı Aktarım</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Web Sitemizde üçüncü taraf hizmetlerin (Google Analytics, LinkedIn Insight, sosyal medya eklentileri vb.) entegrasyonu nedeniyle, ilgili sağlayıcılar kendi çerezlerini cihazınıza yerleştirebilir. Bu çerezler aracılığıyla toplanan veriler söz konusu sağlayıcıların altyapısı kapsamında işlenir ve kendi gizlilik politikalarına tabidir.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Üçüncü taraf hizmetlerin sunucularının önemli bir kısmı yurt dışında bulunmaktadır. KVKK'nın 12.03.2024 tarih ve 7499 sayılı Kanun ile değişik 9. maddesi uyarınca bu aktarımlar; yeterlilik kararı, standart sözleşme veya bağlayıcı şirket kuralları gibi uygun güvenceler temin edilerek yapılır. Söz konusu güvencelerin bulunmadığı durumlarda, çerez kullanımı için açık rızanız esas alınır.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>6. Çerez Tercihlerinizi Yönetme</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Çerez yönetim paneli.</b> Web Sitemizi ilk ziyaretinizde karşınıza çıkan çerez bandı (cookie banner) üzerinden kategorilere göre çerezleri kabul edebilir, reddedebilir veya tercihlerinizi değiştirebilirsiniz. Verilen rıza tarayıcınızda saklanır ve istediğiniz zaman değiştirilebilir; sayfanın altında yer alan "Çerez Tercihleri" bağlantısını tıklayarak panele yeniden erişebilirsiniz.</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Tarayıcı ayarları.</b> Çerez tercihlerinizi tarayıcınızın ayarlarından da yönetebilirsiniz:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Google Chrome: Ayarlar > Gizlilik ve güvenlik > Çerezler ve diğer site verileri</li>
<li>Mozilla Firefox: Ayarlar > Gizlilik ve Güvenlik > Çerezler ve Site Verileri</li>
<li>Microsoft Edge: Ayarlar > Çerezler ve site izinleri</li>
<li>Safari: Tercihler > Gizlilik > Çerezler ve web sitesi verileri</li>
<li>iOS Safari: Ayarlar > Safari > Tüm Çerezleri Engelle</li>
</ul>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Önemli not.</b> Zorunlu çerezleri devre dışı bırakırsanız, Web Sitesi'nin bazı temel işlevleri (ör. oturum açma, güvenli form gönderimi) çalışmayabilir.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>7. Hukuki Dayanak ve Saklama</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Çerezler aracılığıyla işlenen kişisel veriler için hukuki sebepler kategori bazında farklılık gösterir:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Zorunlu çerezler: KVKK 5/2-f (meşru menfaat) ve 5651 sayılı Kanun çerçevesinde işlenir; rıza gerekmez.</li>
<li>Performans, işlevsellik ve hedefleme çerezleri: KVKK 5/1 uyarınca açık rıza ile işlenir.</li>
</ul>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Çerezler aracılığıyla toplanan kişisel veriler, ilgili çerezin saklama süresi sona erdiğinde veya rızanın geri çekilmesi hâlinde silinir. Sunucu erişim logları, 5651 sayılı Kanun çerçevesinde 2 yıl saklanır.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>8. Haklarınız ve İletişim</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Çerezler aracılığıyla işlenen kişisel verileriniz bakımından da KVKK'nın 11. maddesi kapsamındaki haklarınız geçerlidir. Bu hakların kullanımı ve daha fazla bilgi için lütfen Aydınlatma Metni'mize başvurun ve bizimle iletişime geçin:</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;padding-left:10px;">
<b>Veri Sorumlusu:</b> Siskon Endüstriyel Otomasyon Sistemleri San. ve Tic. A.Ş.<br>
<b>Adres:</b> Adatepe Mahallesi, Doğuş Caddesi No:207/AG, DEPARK Beta Binası, Kat:2 No:202, 35390 Buca/İzmir<br>
<b>E-posta (KVKK):</b> kvkk@siskon.com.tr<br>
<b>KEP:</b> siskon@hs02.kep.tr
</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Şirketimiz, VERBİS'e (Veri Sorumluları Sicili) kayıtlı veri sorumlusudur.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>9. Politikada Yapılacak Değişiklikler</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Bu Çerez Politikası, mevzuat değişiklikleri, Web Sitesi'nde kullanılan teknolojilerin güncellenmesi veya iş süreçlerinde meydana gelen değişikliklere bağlı olarak Şirketimiz tarafından güncellenebilir. Politikanın güncel sürümü her zaman Web Sitesi üzerinde yayınlanır. Önemli değişikliklerde ziyaretçilerimiz çerez bandı veya site içi bildirimle ayrıca uyarılır.</p>

<p style="line-height:115%;margin-bottom:14pt;margin-top:14pt;"><b>Yürürlük tarihi:</b> 13.05.2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Sürüm:</b> 2.0</p>

<div style="clear:both;"><p style="line-height:normal;margin-bottom:0pt;margin-top:0pt;color:#777;font-size:0.85em;">Herkese Açık & Kişisel Veri İçermez</p></div>
</div>`;

const COOKIE_HTML_EN = `<div style="width:100%;">
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>COOKIE POLICY</b></p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>1. Purpose and Scope</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">This Cookie Policy ("Policy") describes the cookies and similar tracking technologies used on the website www.siskon.com.tr ("Website") operated by Siskon Endüstriyel Otomasyon Sistemleri San. ve Tic. A.Ş. ("Siskon" or the "Company"). It has been prepared in compliance with Law No. 6698 on the Protection of Personal Data (KVKK), Law No. 5651, the Personal Data Protection Board's Guidelines on Cookie Practices dated 20.06.2022, and — where applicable to data subjects located in the European Economic Area or the United Kingdom — the EU General Data Protection Regulation (GDPR) and UK GDPR.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">This Policy is a complementary part of Siskon's Privacy Notice and should be read together with it.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>2. What is a Cookie?</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Cookies are small text files that a website places on your device (computer, tablet, mobile phone) through your browser when you visit. Cookies are used to maintain your session, remember your language and display preferences, ensure website security and performance, and analyse usage.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">By duration, cookies are divided into two categories:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Session cookies: stored only for the duration of your browser session and deleted when the browser is closed.</li>
<li>Persistent cookies: stored on your device for a defined period or until manually deleted.</li>
</ul>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">By origin, cookies are divided into two categories:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>First-party cookies: set directly by the domain you are visiting (siskon.com.tr).</li>
<li>Third-party cookies: set by third-party services embedded on the Website (e.g., Google Analytics, social media plugins).</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>3. Cookie Categories</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">In line with the Personal Data Protection Board's guidelines and EDPB recommendations, our Website uses four main cookie categories:</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(a) Strictly Necessary Cookies.</b> Cookies that are strictly necessary for the basic functioning of the Website. They are used for purposes such as session management, security (CSRF protection), load balancing, and storing cookie preferences. These cookies do not require visitor consent and are placed on the basis of legitimate interest under KVKK Article 5(2)(f) and Article 6(1)(f) of GDPR. If disabled, the basic functions of the Website will not work.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(b) Performance / Analytics Cookies.</b> Used to understand how the Website is used, measure visitor numbers, identify the most visited pages, and improve performance. They serve statistical analysis purposes and generally collect anonymised data. Subject to your explicit consent.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(c) Functionality Cookies.</b> Used to remember user preferences such as language, display settings, and video player controls. Subject to your explicit consent.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>(d) Targeting / Advertising Cookies.</b> Used to deliver content or advertising tailored to visitor interests, integrate social media, and measure digital marketing campaigns. They may be set by third-party advertising networks (Google Ads, LinkedIn Insight, Meta Pixel, etc.). Subject to your explicit consent.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>4. Cookies Used on the Website</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">The table below lists the cookies currently in use on our Website. The list may change as third-party services are updated; the most current version is always available through our cookie management panel.</p>

<div style="overflow-x:auto;border:1px solid #ddd;padding:10px;border-radius:5px;margin-top:15px;">
<table style="border-collapse:collapse;width:100%;margin-top:10px;">
<thead><tr>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Cookie Name</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Category</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Purpose</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Duration</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Provider / Type</th>
</tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #ddd;">PHPSESSID</td><td style="padding:10px;border:1px solid #ddd;">Strictly Necessary</td><td style="padding:10px;border:1px solid #ddd;">Session management and user identification</td><td style="padding:10px;border:1px solid #ddd;">Session</td><td style="padding:10px;border:1px solid #ddd;">1st party (siskon.com.tr)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">cookie_consent</td><td style="padding:10px;border:1px solid #ddd;">Strictly Necessary</td><td style="padding:10px;border:1px solid #ddd;">Storing cookie preferences</td><td style="padding:10px;border:1px solid #ddd;">12 months</td><td style="padding:10px;border:1px solid #ddd;">1st party (siskon.com.tr)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">_ga</td><td style="padding:10px;border:1px solid #ddd;">Performance/Analytics</td><td style="padding:10px;border:1px solid #ddd;">Google Analytics — unique visitor identification</td><td style="padding:10px;border:1px solid #ddd;">2 years</td><td style="padding:10px;border:1px solid #ddd;">3rd party (Google LLC)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">_ga_*</td><td style="padding:10px;border:1px solid #ddd;">Performance/Analytics</td><td style="padding:10px;border:1px solid #ddd;">Google Analytics 4 — session state</td><td style="padding:10px;border:1px solid #ddd;">2 years</td><td style="padding:10px;border:1px solid #ddd;">3rd party (Google LLC)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">lang / locale</td><td style="padding:10px;border:1px solid #ddd;">Functionality</td><td style="padding:10px;border:1px solid #ddd;">Storing language preference</td><td style="padding:10px;border:1px solid #ddd;">12 months</td><td style="padding:10px;border:1px solid #ddd;">1st party (siskon.com.tr)</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">li_at, lidc</td><td style="padding:10px;border:1px solid #ddd;">Targeting/Advertising</td><td style="padding:10px;border:1px solid #ddd;">LinkedIn Insight Tag — campaign measurement</td><td style="padding:10px;border:1px solid #ddd;">1-2 years</td><td style="padding:10px;border:1px solid #ddd;">3rd party (LinkedIn Corp.)</td></tr>
</tbody>
</table>
</div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:8pt;font-size:0.9em;color:#555;">The table above is illustrative. The complete and current list of cookies actively used on the Website is available through our cookie management panel (cookie consent banner). This Policy is updated whenever the cookie panel is changed.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>5. Third-Party Cookies and International Transfers</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Due to the integration of third-party services on our Website (Google Analytics, LinkedIn Insight, social media plugins, etc.), the relevant providers may place their own cookies on your device. Data collected through these cookies is processed by the providers' infrastructure and is subject to their respective privacy policies.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">A significant portion of third-party services have servers located outside Türkiye. Pursuant to Article 9 of KVKK as amended by Law No. 7499 dated 12 March 2024, such transfers are made by relying on appropriate safeguards (adequacy decision, standard contractual clauses, binding corporate rules). Where such safeguards are not in place, your explicit consent is relied upon for cookie placement.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">For data subjects located in the EEA or UK, transfers from the EEA/UK to Türkiye and other non-adequate jurisdictions are made on the basis of EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) supplemented by appropriate technical and organisational measures.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>6. Managing Your Cookie Preferences</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Cookie management panel.</b> Through the cookie banner displayed on your first visit to our Website, you can accept, reject or change your cookie preferences by category. Your consent is stored in your browser and may be changed at any time; you can re-access the panel by clicking the "Cookie Preferences" link at the bottom of the page.</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Browser settings.</b> You can also manage your cookie preferences through your browser settings:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Google Chrome: Settings > Privacy and security > Cookies and other site data</li>
<li>Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data</li>
<li>Microsoft Edge: Settings > Cookies and site permissions</li>
<li>Safari: Preferences > Privacy > Cookies and website data</li>
<li>iOS Safari: Settings > Safari > Block All Cookies</li>
</ul>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Important note.</b> If you disable strictly necessary cookies, certain core functions of the Website (such as login or secure form submission) may not work.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>7. Legal Basis and Retention</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">The legal grounds for processing personal data through cookies vary by category:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Strictly necessary cookies: KVKK Article 5(2)(f) (legitimate interest), GDPR Article 6(1)(f), and Law No. 5651; consent is not required.</li>
<li>Performance, functionality and targeting cookies: KVKK Article 5(1) and GDPR Article 6(1)(a) — explicit consent.</li>
</ul>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Personal data collected through cookies is deleted when the cookie's retention period expires or when consent is withdrawn. Server access logs are retained for 2 years under Law No. 5651.</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>8. Your Rights and How to Contact Us</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Your rights under Article 11 of KVKK (and, where applicable, under GDPR Articles 15-22 and the UK GDPR) apply to personal data processed through cookies. To exercise these rights or for further information, please refer to our Privacy Notice and contact us:</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;padding-left:10px;">
<b>Data Controller:</b> Siskon Endüstriyel Otomasyon Sistemleri San. ve Tic. A.Ş.<br>
<b>Address:</b> Adatepe Mahallesi, Doğuş Caddesi No:207/AG, DEPARK Beta Building, Floor 2 No:202, 35390 Buca/İzmir, Türkiye<br>
<b>E-mail (privacy matters):</b> kvkk@siskon.com.tr<br>
<b>KEP (registered e-mail):</b> siskon@hs02.kep.tr
</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Our company is a data controller registered with VERBIS (Data Controllers Registry).</p>

<div style="margin-bottom:8pt;"><p style="line-height:115%;"><b>9. Updates to this Policy</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">We may update this Cookie Policy from time to time in response to legislative changes, updates to the technologies used on the Website or changes in our business processes. The current version is always published on the Website. For material changes, visitors will be additionally notified through the cookie banner or an in-site notice.</p>

<p style="line-height:115%;margin-bottom:14pt;margin-top:14pt;"><b>Effective date:</b> 13.05.2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Version:</b> 2.0</p>

<div style="clear:both;"><p style="line-height:normal;margin-bottom:0pt;margin-top:0pt;color:#777;font-size:0.85em;">Public & Does Not Contain Personal Data</p></div>
</div>`;

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toParagraphHtml(text) {
  const lines = String(text || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return '<div style="width:100%;"><p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Conținutul nu a putut fi încărcat.</p></div>';
  }

  const headingRegex = /^(\d+)\.\s+/;
  const cookieTableHtml = `
    <div style="overflow-x:auto;border:1px solid #ddd;padding:10px;border-radius:5px;margin-top:15px;">
      <table style="border-collapse:collapse;width:100%;margin-top:10px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Denumire Cookie</th>
            <th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Categorie</th>
            <th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Scop</th>
            <th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Durată</th>
            <th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Furnizor / Tip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">PHPSESSID</td>
            <td style="padding:10px;border:1px solid #ddd;">Strict necesar</td>
            <td style="padding:10px;border:1px solid #ddd;">Gestionarea sesiunii și identificarea utilizatorului</td>
            <td style="padding:10px;border:1px solid #ddd;">Sesiune</td>
            <td style="padding:10px;border:1px solid #ddd;">First-party (siskon.ro)</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">cookie_consent</td>
            <td style="padding:10px;border:1px solid #ddd;">Strict necesar</td>
            <td style="padding:10px;border:1px solid #ddd;">Stocarea preferințelor privind cookie-urile</td>
            <td style="padding:10px;border:1px solid #ddd;">12 luni</td>
            <td style="padding:10px;border:1px solid #ddd;">First-party (siskon.ro)</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">_ga</td>
            <td style="padding:10px;border:1px solid #ddd;">Performanță / Analiză</td>
            <td style="padding:10px;border:1px solid #ddd;">Google Analytics - identificare vizitatori unici</td>
            <td style="padding:10px;border:1px solid #ddd;">2 ani</td>
            <td style="padding:10px;border:1px solid #ddd;">Third-party (Google LLC)</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">_ga_*</td>
            <td style="padding:10px;border:1px solid #ddd;">Performanță / Analiză</td>
            <td style="padding:10px;border:1px solid #ddd;">Google Analytics 4 - stare sesiune</td>
            <td style="padding:10px;border:1px solid #ddd;">2 ani</td>
            <td style="padding:10px;border:1px solid #ddd;">Third-party (Google LLC)</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">lang / locale</td>
            <td style="padding:10px;border:1px solid #ddd;">Funcționalitate</td>
            <td style="padding:10px;border:1px solid #ddd;">Memorarea limbii selectate</td>
            <td style="padding:10px;border:1px solid #ddd;">12 luni</td>
            <td style="padding:10px;border:1px solid #ddd;">First-party (siskon.ro)</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">li_at, lidc</td>
            <td style="padding:10px;border:1px solid #ddd;">Targetare / Publicitate</td>
            <td style="padding:10px;border:1px solid #ddd;">Măsurarea campaniilor digitale LinkedIn</td>
            <td style="padding:10px;border:1px solid #ddd;">1-2 ani</td>
            <td style="padding:10px;border:1px solid #ddd;">Third-party (LinkedIn Corp.)</td>
          </tr>
        </tbody>
      </table>
    </div>`;

  const renderLine = (line, index) => {
    const safe = escapeHtml(line);
    if (index === 0) {
      return { html: `<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>${safe}</b></p>`, section4: false };
    }
    if (index === 1) {
      return { html: `<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>${safe}</b></p>`, section4: false };
    }
    if (headingRegex.test(line)) {
      return {
        html: `<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>${safe}</b></p></div>`,
        section4: /^4\.\s+/i.test(line),
      };
    }
    if (/^Pe scurt:/i.test(line)) {
      return { html: `<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>${safe}</b></p>`, section4: false };
    }
    if (/^Data intrării în vigoare:/i.test(line)) {
      return { html: `<p style="line-height:115%;margin-bottom:14pt;margin-top:14pt;"><b>${safe}</b></p>`, section4: false };
    }
    return { html: `<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">${safe}</p>`, section4: false };
  };

  let tableInserted = false;
  const rendered = lines.flatMap((line, index) => {
    const piece = renderLine(line, index);
    if (piece.section4 && !tableInserted) {
      tableInserted = true;
      return [piece.html, cookieTableHtml];
    }
    return [piece.html];
  });

  return `<div style="width:100%;">${rendered.join('')}</div>`;
}

export default function CookiePolicyPage() {
  const { lang, localizePath } = useLanguage();
  const isTR = lang === 'TR';
  const isRO = lang === 'RO';
  let localeKey = 'en';
  if (isTR) {
    localeKey = 'tr';
  } else if (isRO) {
    localeKey = 'ro';
  }
  const [cookieRoText, setCookieRoText] = useState('');

  const labels = {
    tr: {
      title: 'Çerez Politikası',
      subtitle: 'Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş.',
      home: 'Ana Sayfa',
      legal: 'Yasal',
      official: 'Resmi Metin',
      ctaTitle: 'Çerez ayarları ve veri tercihlerinizi birlikte netleştirelim',
      ctaText: 'Çerez kullanımı ve veri tercihlerinize dair tüm sorularınız için ekibimizle iletişime geçebilirsiniz.',
      ctaButton: 'Çerez Politikası Hakkında Sor',
    },
    en: {
      title: 'Cookie Policy',
      subtitle: 'Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş.',
      home: 'Home',
      legal: 'Legal',
      official: 'Official Document',
      ctaTitle: 'Let us help you clarify cookie settings and data preferences',
      ctaText: 'Reach out to our team for any questions regarding cookies and your data preferences.',
      ctaButton: 'Ask About Cookie Policy',
    },
    ro: {
      title: 'Politica de Cookie-uri',
      subtitle: 'Siskon Software & Automation S.R.L.',
      home: 'Acasă',
      legal: 'Legal',
      official: 'Document Oficial',
      ctaTitle: 'Să clarificăm preferințele dvs. privind cookie-urile',
      ctaText: 'Contactați echipa noastră pentru orice întrebări despre cookie-uri și preferințele dvs. de date.',
      ctaButton: 'Întrebați despre Politica de Cookie-uri',
    },
  };

  const ui = labels[localeKey];

  useEffect(() => {
    if (!isRO) return;

    fetch('/downloads/cookie_ro_extracted.txt')
      .then((response) => response.text())
      .then((text) => setCookieRoText(text))
      .catch(() => setCookieRoText(''));
  }, [isRO]);

  const officialHtml = useMemo(() => {
    if (isTR) return COOKIE_HTML_TR;
    if (isRO) return toParagraphHtml(cookieRoText);
    return COOKIE_HTML_EN;
  }, [isTR, isRO, cookieRoText]);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={ui.title}
        subtitle={ui.subtitle}
        breadcrumbs={[
          ui.home,
          ui.legal,
          ui.title,
        ]}
      />

      <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="container-wide">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(2,6,23,0.08)]">
            <header className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4 md:px-8 md:py-5">
              <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.14em] text-sky-700">
                {ui.official}
              </p>
            </header>
            <div
              className="px-5 py-6 md:px-10 md:py-10 text-slate-700 leading-relaxed text-[15px] md:text-[16px] legal-html"
              dangerouslySetInnerHTML={{ __html: officialHtml }}
            />
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{ui.ctaTitle}</h2>
          <p>{ui.ctaText}</p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">
            {ui.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
