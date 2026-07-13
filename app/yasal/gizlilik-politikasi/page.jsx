'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import { useLanguage } from '../../_context/LanguageContext';

const PRIVACY_HTML_TR = `<div style="width:100%;">
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ<br>SANAYİ VE TİCARET ANONİM ŞİRKETİ</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA AYDINLATMA METNİ</b></p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>a) Veri Sorumlusu</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.</b> (Bundan sonra "Şirket" olarak anılacaktır.), 6698 sayılı Kişisel Verilerin Korunması Kanunu (Bundan sonra "KVKK" olarak anılacaktır.) uyarınca veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan kapsamda ve KVKK ile sair mevzuat tarafından emredilen sınırlar çerçevesinde işlemektedir.</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;padding-left:10px;">
<b>Vergi Dairesi / No:</b> Konak Vergi Dairesi, 7710337656<br>
<b>MERSİS No:</b> 0771033765600027<br>
<b>Tescilli Merkez Adresi:</b> Çankaya Mahallesi, 153 Sokak No:23/A, Hatay 35250 Konak/İzmir<br>
<b>İş Yeri Adresi:</b> Adatepe Mahallesi, Doğuş Caddesi No:207/AG, Dokuz Eylül Üniversitesi Tınaztepe Yerleşkesi, DEPARK Beta Binası, Kat:2 No:202, 35390 Buca/İzmir
</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Şirketimiz, VERBİS'e (Veri Sorumluları Sicili) kayıtlı veri sorumlusudur.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Kişisel verileriniz tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilebilecek, kaydedilebilecek, depolanabilecek, muhafaza edilebilecek, değiştirilebilecek, yeniden düzenlenebilecek, açıklanabilecek, aktarılabilecek, devralınabilecek, elde edilebilir hâle getirilebilecek, sınıflandırılabilecek ve mevzuatın izin verdiği ölçüde üçüncü kişilere aktarılabilecektir.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>b) Kişisel Verilerin Hangi Amaçla İşleneceği</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dâhilinde aşağıdaki amaçlarla işlenmektedir:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Şirketimiz tarafından sunulan ürün ve hizmetlerden faydalanmanız için gerekli çalışmaların yürütülmesi,</li>
<li>Ürün ve hizmetlerin satış, pazarlama ve satış sonrası destek faaliyetlerinin planlanması ve icrası,</li>
<li>Sözleşme süreçlerinin ve hukuki taleplerin takibi,</li>
<li>İş ilişkisi içerisinde olan ilgili kişilerin hukuki, teknik ve ticari iş güvenliğinin temini,</li>
<li>İnsan kaynakları süreçlerinin yürütülmesi; iş başvurusu yapmanız hâlinde başvurunuzun değerlendirilmesi; çalışan olmanız hâlinde kanuni ve sözleşmesel yükümlülüklerin yerine getirilmesi,</li>
<li>Ürün ve hizmetlerimize dair kalite ve uygunluk takibinin sağlanması,</li>
<li>Tedarik zinciri ve tedarikçi ilişkilerinin yönetimi,</li>
<li>Şirketimizi ziyaret etmeniz hâlinde fiziksel mekan ve bilgi güvenliğinin sağlanması, kimlik tespiti ve misafir kablosuz ağ erişiminin yönetilmesi,</li>
<li>Şirketimizden bilgi talep etmeniz hâlinde sizinle irtibat kurulması,</li>
<li>Bilgi güvenliği süreçlerinin planlanması, denetimi ve icrası,</li>
<li>Bilgi teknolojileri altyapısının oluşturulması ve yönetilmesi,</li>
<li>Finans, muhasebe ve hukuk işlerinin takibi,</li>
<li>Şirket faaliyetlerinin planlanması ve icrası, kurumsal iletişim ve lojistik faaliyetlerinin yürütülmesi,</li>
<li>Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>c) İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Kişisel verileriniz, yukarıda (b) bendinde belirtilen amaçların gerçekleştirilmesi ile sınırlı olmak üzere; KVKK'nın 8. maddesinde belirtilen kişisel veri işleme şartları çerçevesinde:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>İş ortaklarımıza, tedarikçilerimize, hissedarlarımıza ve iştiraklerimize,</li>
<li>Kanunen yetkili kamu kurum ve kuruluşlarına (TÜBİTAK, SGK, Vergi Daireleri, Çalışma Bakanlığı vb.),</li>
<li>Kanunen yetkili özel hukuk kişilerine (denetçiler, hukuk müşavirleri, mali müşavirler, sigorta şirketleri, bankalar vb.),</li>
<li>Kullanmakta olduğumuz bilgi teknolojileri hizmetleri kapsamında bulut hizmet sağlayıcıları ve barındırma hizmeti sağlayıcılarına</li>
</ul>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">aktarılabilecektir.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>d) Kişisel Verilerin Yurt Dışına Aktarılması</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Kişisel verileriniz, 12.03.2024 tarih ve 7499 sayılı Kanun ile değişik KVKK'nın 9. maddesi uyarınca aşağıdaki şartlardan birinin varlığı hâlinde yurt dışına aktarılabilir:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Aktarım yapılacak ülke, ülke içerisindeki sektörler veya uluslararası kuruluşlar hakkında Kişisel Verileri Koruma Kurulu tarafından yeterlilik kararı verilmiş olması,</li>
<li>Yeterlilik kararı bulunmaması hâlinde; tarafların yazılı taahhüdü ve Kurul'un izni şartıyla bağlayıcı şirket kuralları, standart sözleşme veya yazılı taahhütname gibi uygun güvencelerden birinin sağlanması,</li>
<li>KVKK 9/6'da düzenlenen arızi hâllerden birinin (açık rıza, sözleşmenin ifası, üstün kamu yararı, hayati menfaatlerin korunması vb.) bulunması.</li>
</ul>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Bu çerçevede; Şirketimizin Romanya'daki iştiraki Siskon Software & Automation S.R.L. (Brașov) ve Estonya'daki iştiraki ile insan kaynakları, ortak müşteri/proje yönetimi ve grup içi raporlama amaçlarıyla; ayrıca Avrupa Birliği veya diğer yurt dışı bölgelerde sunucu ve bulut hizmet altyapısı barındıran teknoloji sağlayıcılarıyla (e-posta, dosya depolama, kurumsal yazılım hizmetleri) zorunlu olduğu ölçüde kişisel veri aktarımı gerçekleştirilebilmektedir. Bu aktarımlar, yukarıda belirtilen yasal güvenceler temin edilmek suretiyle yapılır.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>e) Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Kişisel verileriniz; Şirketimiz ile kurduğunuz iletişim ve sözleşme ilişkileri kapsamında, Şirketimizi ziyaretiniz sırasında, web sitemiz (www.siskon.com.tr) üzerinden iletişim formu doldurmanız veya kullanıcı hesabı oluşturmanız aracılığıyla, ticari ilişki kurma amacıyla üçüncü kişilerin sizin bilgilerinizi tarafımıza iletmesi yoluyla, fuar, eğitim ve konferans gibi organizasyonlarda paylaşılan bilgiler aracılığıyla ve benzeri kanallarla otomatik veya otomatik olmayan yöntemlerle toplanmaktadır.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Bu kişisel veriler, KVKK'nın 5. ve 6. maddelerinde belirtilen "sözleşmenin kurulması veya ifası", "hukuki yükümlülüğün yerine getirilmesi", "meşru menfaat", "açık rıza" ve diğer hukuki sebeplere dayalı olarak işlenmekte; işbu Aydınlatma Metni'nin (b) ve (c) maddelerinde belirtilen amaçlarla işlenebilmekte ve aktarılabilmektedir.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>f) Kişisel Verilerinizin Muhafaza Edileceği Süre</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">KVKK ve Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik uyarınca işlediğimiz kişisel verileriniz, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde resen veya talebiniz üzerine Şirketimizin Saklama ve İmha Politikası'nda belirlenen süreler dâhilinde silinecek, yok edilecek veya anonim hâle getirilecektir.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Saklama süreleri belirlenirken; 6102 sayılı Türk Ticaret Kanunu, 6098 sayılı Türk Borçlar Kanunu, 4857 sayılı İş Kanunu, 6331 sayılı İş Sağlığı ve Güvenliği Kanunu, 213 sayılı Vergi Usul Kanunu, 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu, 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun başta olmak üzere ilgili mevzuatta öngörülen zamanaşımı süreleri ve saklama yükümlülükleri dikkate alınmaktadır.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>g) Web Sitesi ve Çerez Politikası</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Web sitemiz (www.siskon.com.tr) ziyaretiniz sırasında IP adresi, çerez bilgileri, tarayıcı türü, ziyaret tarih/saati gibi teknik veriler otomatik yollarla toplanmaktadır. Zorunlu çerezler dışındaki çerezler için açık rızanız alınmakta olup, çerezlerin türü, amacı ve saklama süresi hakkında detaylı bilgi web sitemizde yayımlanan Çerez Politikası dokümanında yer almaktadır.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>h) KVKK'nın 11. Maddesi Kapsamındaki Haklarınız ve Başvurunuz</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">KVKK'nın 11. maddesi kapsamında, ilgili kişi olarak Şirketimize başvurarak aşağıdaki haklarınızı kullanabilirsiniz:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
<li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
<li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
<li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</li>
<li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
<li>KVKK ile ilgili diğer kanun ve sair mevzuat hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerinizin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
<li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
<li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
</ul>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">KVKK'nın 13. maddesinin 1. fıkrası ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ gereğince yukarıdaki haklarınızı kullanmaya yönelik talebinizi (tercihen web sitemizde yer alan Başvuru Formu'ndaki bilgileri eksiksiz doldurarak) aşağıdaki yöntemlerden birini tercih ederek bize iletebilirsiniz:</p>

<div style="overflow-x:auto;border:1px solid #ddd;padding:10px;border-radius:5px;margin-top:15px;">
<table style="border-collapse:collapse;width:100%;margin-top:10px;">
<thead><tr>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Başvuru Yöntemi</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Başvurunun Yapılacağı Adres</th>
<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Başvuruda Belirtilecek Bilgi</th>
</tr></thead>
<tbody>
<tr><td style="padding:10px;border:1px solid #ddd;">Şahsen Başvuru (kimliği tevsik edici belge ile)</td><td style="padding:10px;border:1px solid #ddd;">Adatepe Mahallesi, Doğuş Caddesi No:207/AG, DEPARK Beta Binası, Kat:2 No:202, 35390 Buca/İzmir</td><td style="padding:10px;border:1px solid #ddd;">Zarfın üzerine "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi" yazılır. Kimlik belgenizi yanınızda bulundurun.</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">Noter aracılığıyla tebligat</td><td style="padding:10px;border:1px solid #ddd;">Adatepe Mahallesi, Doğuş Caddesi No:207/AG, DEPARK Beta Binası, Kat:2 No:202, 35390 Buca/İzmir</td><td style="padding:10px;border:1px solid #ddd;">Tebligat zarfının üzerine "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi" yazılır.</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">Kayıtlı Elektronik Posta (KEP)</td><td style="padding:10px;border:1px solid #ddd;">siskon@hs02.kep.tr</td><td style="padding:10px;border:1px solid #ddd;">E-posta konusu: "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi"</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">Güvenli elektronik imza / mobil imza ile imzalı e-posta</td><td style="padding:10px;border:1px solid #ddd;">kvkk@siskon.com.tr</td><td style="padding:10px;border:1px solid #ddd;">E-posta konusu: "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi"</td></tr>
<tr><td style="padding:10px;border:1px solid #ddd;">Sistemlerimizde kayıtlı e-posta adresinizden</td><td style="padding:10px;border:1px solid #ddd;">kvkk@siskon.com.tr</td><td style="padding:10px;border:1px solid #ddd;">E-posta konusu: "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi"</td></tr>
</tbody>
</table>
</div>

<p style="line-height:115%;margin-bottom:8pt;margin-top:14pt;">Başvurunuzda; ad, soyad ve başvuru yazılı ise imza, T.C. kimlik numarası (yabancılar için uyruk + pasaport numarası), tebligata esas yerleşim yeri veya iş yeri adresi, varsa bildirime esas elektronik posta adresi, telefon ve faks numarası ve talep konusu bilgilerinin bulunması zorunludur. Konuya ilişkin bilgi ve belgelerin başvurunuza eklenmesi gerekmektedir.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Şirketimiz, talebinizin niteliğine göre cevabını en geç otuz gün içinde ücretsiz olarak iletecektir. İşlemin ayrıca bir maliyeti gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu'nca belirlenen tarifedeki ücret talep edilebilir.</p>

<p style="line-height:115%;margin-bottom:14pt;margin-top:14pt;"><b>Yürürlük tarihi:</b> 13.05.2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Sürüm:</b> 3.0</p>

<div style="clear:both;"><p style="line-height:normal;margin-bottom:0pt;margin-top:0pt;color:#777;font-size:0.85em;">Herkese Açık & Kişisel Veri İçermez</p></div>
</div>`;

const PRIVACY_HTML_EN = `<div style="width:100%;">
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ<br>SANAYİ VE TİCARET A.Ş.</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>PROTECTION OF PERSONAL DATA (PRIVACY NOTICE)</b></p>

<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">This Privacy Notice describes how Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş. ("Siskon", "we", "us", or "our") collects, stores, uses and shares ("processes") your personal information when you:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>visit our website at www.siskon.com.tr,</li>
<li>contact us by e-mail, phone or via our online contact forms,</li>
<li>apply for a position with us, request a quote, or submit a partnership inquiry,</li>
<li>engage with us in other related ways, including any sales, marketing, or events.</li>
</ul>

<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>Applicable law.</b> As a controller established in the Republic of Türkiye, our processing activities are primarily governed by Law No. 6698 on the Protection of Personal Data ("KVKK") and the secondary legislation issued by the Personal Data Protection Authority. Where we process the personal data of individuals located in the European Economic Area (EEA) or the United Kingdom in the context of offering goods or services to them or monitoring their behaviour, the EU General Data Protection Regulation (GDPR) and the UK GDPR also apply. Both frameworks are reflected in this Notice.</p>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Controller details:</b></p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;padding-left:10px;">
<b>Tax Office / No.:</b> Konak Tax Office, 7710337656<br>
<b>MERSIS No.:</b> 0771033765600027<br>
<b>Registered Office:</b> Çankaya Mahallesi, 153 Sokak No:23/A, Hatay 35250 Konak/İzmir, Türkiye<br>
<b>Place of Business:</b> Adatepe Mahallesi, Doğuş Caddesi No:207/AG, Dokuz Eylül University Tınaztepe Campus, DEPARK Beta Building, Floor 2, No:202, 35390 Buca/İzmir, Türkiye<br>
<b>Contact for privacy matters:</b> kvkk@siskon.com.tr
</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Our company is a data controller registered with VERBIS (Data Controllers Registry).</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>1. What information do we collect?</b></p></div>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Personal information you provide to us</b></p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">We collect personal information that you voluntarily provide when you express an interest in our products and Services, when you participate in activities on the Services, or otherwise when you contact us. The personal information we collect may include:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li><b>Identity data:</b> name and surname,</li>
<li><b>Contact data:</b> business or personal e-mail address, phone number, postal address, country,</li>
<li><b>Professional data</b> (where you submit a job application or business inquiry): CV/résumé, employment history, qualifications, position, employer, references,</li>
<li><b>Communication content:</b> the content of messages you send us through contact forms, e-mail or phone,</li>
<li><b>Visitor data</b> (if you visit our premises): identity and visit log information collected for security purposes.</li>
</ul>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Sensitive personal information</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">We do not actively request and we make every reasonable effort to avoid processing special categories of personal data ("sensitive personal information") under KVKK Article 6 or GDPR Article 9 through our website. If you choose to share such information voluntarily (for example in a cover letter), we will process it only on the basis of your explicit consent or another lawful basis.</p>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Information automatically collected</b></p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">We automatically collect certain information when you visit, use, or navigate the Services. This information does not generally reveal your specific identity but may include device and usage information such as IP address, browser and device characteristics, operating system, language preferences, referring URLs, country, location, information about how and when you use our Services, and other technical information. The information we collect includes:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li><b>Log and Usage Data.</b> Service-related, diagnostic, usage and performance information our servers automatically collect when you access or use our Services (date/time stamps, pages and files viewed, searches, features used, error reports).</li>
<li><b>Device Data.</b> Information about your device such as IP address, device and application identification numbers, browser type, hardware model, internet service provider, operating system, and system configuration information.</li>
<li><b>Location Data.</b> Approximate location information derived from your IP address. We do not collect precise GPS location through our website.</li>
<li><b>Cookies.</b> We use cookies and similar tracking technologies. Strictly necessary cookies are placed on your device by default; for all other cookies (analytics, performance, marketing) we obtain your consent through our cookie banner. For details please see our separate Cookie Policy published on the website.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>2. How do we process your information?</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">We process your personal information for a variety of reasons, including:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>To respond to your inquiries and provide the products and services you request,</li>
<li>To establish and perform contracts to which you or your employer are a party,</li>
<li>To evaluate job applications and manage recruitment processes,</li>
<li>To improve, maintain and secure our Services and prevent fraud or abuse,</li>
<li>To send service-related and, with your consent, marketing communications,</li>
<li>To comply with legal obligations and respond to lawful requests from public authorities,</li>
<li>To establish, exercise or defend legal claims,</li>
<li>Where strictly necessary, to protect the vital interests of any individual.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>3. What legal bases do we rely on?</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">We process your personal information only when we have a valid legal basis under KVKK and, where applicable, GDPR/UK GDPR.</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Under KVKK (Articles 5 and 6):</b></p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Explicit consent of the data subject,</li>
<li>Express provision in the laws,</li>
<li>Necessity arising from a contract to which the data subject is a party,</li>
<li>Compliance with a legal obligation of the data controller,</li>
<li>The data has been made public by the data subject,</li>
<li>Necessity for the establishment, exercise or protection of a right,</li>
<li>Necessity for the legitimate interests of the data controller, provided that the fundamental rights and freedoms of the data subject are not violated.</li>
</ul>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Under GDPR / UK GDPR (Article 6):</b></p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li><b>Consent.</b> Where you have given us specific consent, e.g. for marketing communications or non-essential cookies. You can withdraw consent at any time.</li>
<li><b>Contract.</b> Where processing is necessary to enter into or perform a contract with you.</li>
<li><b>Legal obligations.</b> Where processing is necessary for compliance with our legal obligations.</li>
<li><b>Legitimate interests.</b> Where processing is necessary for our legitimate interests (such as network security, fraud prevention, internal administration) and not overridden by your fundamental rights.</li>
<li><b>Vital interests.</b> Where processing is necessary to protect the vital interests of you or another person.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>4. When and with whom do we share your personal information?</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">We may share your personal information in the following situations:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li><b>Service providers and processors.</b> With IT, hosting, e-mail, cloud, cybersecurity, analytics, professional services and similar third-party providers acting under our written instructions.</li>
<li><b>Affiliates.</b> With our subsidiary Siskon Software & Automation S.R.L. (Romania, Brașov) and our affiliate in Estonia for HR, customer/project management and group reporting purposes, where necessary.</li>
<li><b>Business partners and customers.</b> Where required to perform a contract or pre-contractual measures requested by you.</li>
<li><b>Legal authorities and advisers.</b> With courts, regulators, law enforcement, lawyers, auditors and other advisers where necessary to comply with legal obligations or protect our rights.</li>
<li><b>Business transfers.</b> In connection with, or during negotiations of, any merger, sale of assets, financing or acquisition of all or part of our business.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>5. International transfers of personal data</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Pursuant to KVKK Article 9 as amended by Law No. 7499 dated 12 March 2024, personal data may be transferred abroad based on (i) an adequacy decision issued by the Personal Data Protection Board, (ii) appropriate safeguards such as binding corporate rules, standard contractual clauses or written undertakings approved by the Board, or (iii) one of the limited exceptional grounds set out in Article 9(6).</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Under GDPR/UK GDPR, where we transfer personal data of individuals in the EEA or UK to a country that has not received an adequacy decision, we rely on appropriate safeguards such as the European Commission's Standard Contractual Clauses or, where applicable, derogations under Article 49.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">In practice, transfers may occur to our affiliate Siskon Software & Automation S.R.L. in Brașov, Romania, to our affiliate in Estonia, and to cloud / SaaS providers located in EEA countries or other jurisdictions.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>6. How long do we keep your information?</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">We keep your information only for as long as necessary for the purposes set out in this Privacy Notice or as required by law. Specific retention periods are set out in our internal Personal Data Retention and Destruction Policy and are determined by reference to the purposes of processing and the requirements of applicable laws (including the Turkish Commercial Code, Code of Obligations, Labour Law, Tax Procedure Law, Social Security Law and Law No. 5651). When we have no ongoing legitimate business need to process your personal information, we will delete or anonymise it, or, if this is not possible (for example because the data has been stored in backup archives), we will securely store and isolate it from any further processing until deletion is possible.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>7. How do we keep your information safe?</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">We have implemented appropriate technical and organisational measures designed to protect the security of any personal information we process, including access controls, encryption in transit, secure development practices, vendor management and incident response procedures aligned with ISO/IEC 27001 and ISO/IEC 27701. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure; we cannot warrant absolute security. Transmission of personal information to and from our Services is at your own risk.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>8. Do we collect information from minors?</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Our Services are directed to professionals and adults. We do not knowingly collect or solicit data from children under 18 years of age. If we learn that we have collected personal information from a person under 18 without verified parental consent, we will deactivate the relevant record and take reasonable measures to delete such data. If you believe we may hold information about a person under 18, please contact us at kvkk@siskon.com.tr.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>9. What are your rights?</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Your rights under KVKK Article 11:</b></p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Learn whether your personal data is processed,</li>
<li>Request information if it has been processed,</li>
<li>Learn the purpose of processing and whether the data is used for that purpose,</li>
<li>Know the third parties to whom your personal data is transferred, in Türkiye or abroad,</li>
<li>Request rectification of incomplete or inaccurate data,</li>
<li>Request erasure or destruction of your personal data when the conditions of Article 7 are met,</li>
<li>Request that the rectification, erasure or destruction be notified to third parties to whom the data has been transferred,</li>
<li>Object to the occurrence of a result against you by analysis of your data exclusively through automated systems,</li>
<li>Claim compensation for damages arising from the unlawful processing of your personal data.</li>
</ul>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Your rights under GDPR / UK GDPR:</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">If you are located in the EEA or the UK, you also have the rights of access, rectification, erasure, restriction of processing, data portability, objection (including to direct marketing), and the right to withdraw consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal.</p>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>Exercising your rights.</b> You may submit a request by completing the Data Subject Application Form published on our website and sending it to kvkk@siskon.com.tr, to our registered electronic mail address siskon@hs02.kep.tr, or by post to the Place of Business address. We will respond to your request within thirty (30) days. Where the request requires additional cost, we may charge the fee determined by the Personal Data Protection Board.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">You also have the right to lodge a complaint with the Turkish Personal Data Protection Authority (KVKK) and, if you are in the EEA or UK, with your local supervisory authority.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>10. Controls for Do-Not-Track features</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature you can activate to signal your privacy preference not to have your online browsing activity monitored. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As a result, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard is adopted in the future that we must follow, we will inform you in a revised version of this Notice.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>11. Updates to this notice</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">We may update this Privacy Notice from time to time to remain compliant with relevant laws. The updated version will be indicated by an updated "Revised" date and will be effective as soon as it is accessible. Where the changes are material, we will notify you by prominently posting a notice on the website or by sending you a direct notification.</p>

<p style="line-height:115%;margin-bottom:14pt;margin-top:14pt;"><b>Effective date:</b> 13.05.2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Version:</b> 3.0</p>

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
  const rendered = lines.map((line, index) => {
    const safe = escapeHtml(line);

    if (index === 0) {
      return `<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>${safe}</b></p>`;
    }

    if (index === 1) {
      return `<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>${safe}</b></p>`;
    }

    if (headingRegex.test(line)) {
      return `<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>${safe}</b></p></div>`;
    }

    if (/^Pe scurt:/i.test(line)) {
      return `<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;"><b>${safe}</b></p>`;
    }

    if (/^Data intrării în vigoare:/i.test(line)) {
      return `<p style="line-height:115%;margin-bottom:14pt;margin-top:14pt;"><b>${safe}</b></p>`;
    }

    return `<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">${safe}</p>`;
  });

  return `<div style="width:100%;">${rendered.join('')}</div>`;
}

export default function PrivacyPage() {
  const { lang, localizePath } = useLanguage();
  const isTR = lang === 'TR';
  const isRO = lang === 'RO';
  let localeKey = 'en';
  if (isTR) {
    localeKey = 'tr';
  } else if (isRO) {
    localeKey = 'ro';
  }
  const [privacyRoText, setPrivacyRoText] = useState('');

  const labels = {
    tr: {
      title: 'Gizlilik Politikası',
      subtitle: 'Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş.',
      home: 'Ana Sayfa',
      legal: 'Yasal',
      official: 'Resmi Metin',
      ctaTitle: 'Gizlilik politikasına dair sorularınızı yanıtlayalım',
      ctaText: 'Veri işleme, saklama ve aktarım süreçleriyle ilgili sorularınız için bizimle iletişime geçebilirsiniz.',
      ctaButton: 'Gizlilik İçin İletişim',
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş.',
      home: 'Home',
      legal: 'Legal',
      official: 'Official Document',
      ctaTitle: 'Let us clarify your privacy policy questions',
      ctaText: 'Contact us for questions about data processing, retention, and transfer practices.',
      ctaButton: 'Contact for Privacy Questions',
    },
    ro: {
      title: 'Politică de Confidențialitate',
      subtitle: 'Siskon Software & Automation S.R.L.',
      home: 'Acasă',
      legal: 'Legal',
      official: 'Document Oficial',
      ctaTitle: 'Să clarificăm întrebările dvs. privind confidențialitatea',
      ctaText: 'Ne puteți contacta pentru întrebări privind prelucrarea, stocarea și transferul datelor.',
      ctaButton: 'Contact pentru Confidențialitate',
    },
  };

  const ui = labels[localeKey];

  useEffect(() => {
    if (!isRO) return;

    fetch('/downloads/privacy_ro_extracted.txt')
      .then((response) => response.text())
      .then((text) => setPrivacyRoText(text))
      .catch(() => setPrivacyRoText(''));
  }, [isRO]);

  const officialHtml = useMemo(() => {
    if (isTR) return PRIVACY_HTML_TR;
    if (isRO) return toParagraphHtml(privacyRoText);
    return PRIVACY_HTML_EN;
  }, [isTR, isRO, privacyRoText]);

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
