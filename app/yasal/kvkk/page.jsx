'use client';

import Link from 'next/link';
import PageHero from '../../components/PageHero';
import { useLanguage } from '../../_context/LanguageContext';

const KVKK_HTML = `<div class="col-md-9 page-right" style="margin: 0px; padding-top: 25px;">
        <p align="center">
	<strong>SİSKON</strong></p>
<p align="center">
	<strong>ENDÜSTRİYEL OTOMASYON SİSTEMLERİ </strong></p>
<p align="center">
	<strong>SANAYİ VE TİCARET ANONİM ŞİRKETİ</strong></p>
<p align="center">
	<br>
	<strong>6698 SAYILI KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA</strong></p>
<p align="center">
	<strong>AYDINLATMA METNİ</strong></p>
<p>
	&nbsp;</p>
<p>
	<strong>a)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Veri Sorumlusu ve Temsilcisi</strong></p>
<p>
	<strong><em>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.</em></strong> olarak (Bundan sonra <em>"<strong>Şirket</strong>"</em> olarak anılacaktır.),&nbsp;<strong><em>6698 sayılı Kişisel Verilerin Korunması</em></strong><em>&nbsp;<strong>Kanunu</strong></em>&nbsp;(Bundan sonra <em>"<strong>KVKK</strong>"</em> olarak anılacaktır.) uyarınca kişisel verilerinizi aşağıda açıklanan kapsamda ve KVKK ile sair mevzuat tarafından emredilen sınırlar çerçevesinde işlemekteyiz.</p>
<p>
	Bu doğrultuda, kişisel verileriniz tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilecek, kaydedilecek, depolanacak, muhafaza edilecek, değiştirilecek, yeniden düzenlenecek, açıklanacak, aktarılacak, devralınacak, elde edilebilir hâle getirilecek, sınıflandırılacak, üçüncü kişi ya da kurumlara aktarılacaktır.</p>
<p>
	<strong>b)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kişisel Verilerin Hangi Amaçla İşleneceği</strong></p>
<p>
	Kişisel verileriniz, Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması; Şirketimiz tarafından sunulan ürün ve hizmetlerin sizlere önerilmesi; ürün ve hizmetlerin satış ve pazarlaması için pazar araştırması faaliyetlerinin planlanması ve/veya icrası; satış sonrası destek hizmetleri aktivitelerinin planlanması ve/veya icrası; sözleşme süreçlerinin ve/veya hukuki taleplerin takibi; iş ilişkisi içerisinde olan ilgili kişilerin hukuki, teknik ve ticari iş güvenliğinin temin edilmesi; Şirketimizin insan kaynakları politikalarının yürütülmesi, iş başvurusu yapmanız halinde değerlendirme yapılması, çalışanımız olmanız halinde kanuni ve hukuki yükümlülüklerimizin yerine getirilmesi; ürün ve hizmetlerimize dair kalite takibinin sağlanması; tedarik edilen ürünlerin takibi; Şirketimizi ziyaret ettiğinizde güvenliğin sağlanması, kimliğinizin tespit edilmesi ve kablosuz ağa bağlantınızın sağlanması; Şirketimizden bilgi talep etmeniz halinde sizinle irtibat kurulması; ürün veya hizmet satın almanız halinde bu satış veya hizmet sözleşmesinin ifası; bilgi güvenliği süreçlerinin planlanması, denetimi ve icrası; bilgi teknolojileri alt yapısının oluşturulması ve yönetilmesi; finans ve/veya muhasebe işlerinin takibi; hukuk işlerinin takibi; Şirket faaliyetlerinin planlanması ve icrası; kurumsal iletişim faaliyetlerinin planlanması ve icrası; lojistik faaliyetlerinin planlanması ve icrası; Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması amaçlarıyla KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dâhilinde işlenecektir.</p>
<p>
	<strong>c)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</strong></p>
<p>
	Kişisel verileriniz; Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması; Şirketimiz tarafından sunulan ürün ve hizmetlerin ihtiyaçlarınıza göre özelleştirilerek sizlere önerilmesi; Şirketimizin insan kaynakları politikalarının yürütülmesinin temini; Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin/kurumların hukuki ve ticari güvenliğinin temini; Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması amaçlarıyla; iş ortaklarımıza, tedarikçilerimize, hissedarlarımıza, iştiraklerimize, kanunen yetkili kamu kurumlarına ve özel kişilere, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.</p>
<p>
	<strong>d)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Yurt Dışına Aktarım&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong></p>
<p>
	Kişisel verileriniz işbu Aydınlatma Metninde belirtilen durumlar dışında üçüncü kişilere aktarılamayacaktır. Şirket olarak, Aydınlatma Metni kapsamındaki kişisel verilerinizi yukarıda belirtilen amaçların gerçekleştirilebilmesi ile sınırlı olarak ve kişisel verilerinizi işbu Aydınlatma Metnine&nbsp; uygun olarak işlemeyi kabul eden tedarikçilerimiz ile paylaşabiliriz. Kişisel verilerinizin e-posta yoluyla, www.siskon.com.tr resmi internet sayfası üzerinden veyahut başka bir elektronik ortam aracılığıyla iletilmesi halinde yurt dışında bulunan (Avrupa ülkelerinde) e-posta veya sunucu hizmet sağlayıcıları ile paylaşılabilmektedir.</p>
<p>
	<strong>e)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</strong></p>
<p>
	Kişisel verileriniz Şirketimiz tarafından; Şirketimiz ile sair şekillerde irtibata geçmeniz, Şirketimiz ile aranızda bir sözleşme ilişkisinin kurulması ve ifası, Şirketimizi ziyaret etmeniz, ticari faaliyet amacıyla irtibata geçmemiz için üçüncü kişilerce bilgilerinizin tarafımıza iletilmesi, fuar, eğitim, konferans gibi organizasyonlarda bilgi paylaşımı ve benzeri yöntemlerle, Şirketimizin ticari amacı çerçevesinde farklı kanallarla ve farklı hukuki sebeplere dayanarak; sunduğumuz ürün ile hizmetleri geliştirmek ve ticari faaliyetlerimizi yürütmek amacıyla toplanmaktadır. Bu hukuki sebeplerle toplanan kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları kapsamında işbu Aydınlatma Metni'nin (b) ve (c) maddelerinde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.</p>
<p>
	<strong>f)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kişisel Verilerinizin Muhafaza Edileceği Süre</strong></p>
<p>
	KVKK'ya uygun olarak işlediğimiz kişisel verileriniz, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde resen veya talebiniz üzerine Şirketimiz tarafından <strong><em>KVKK</em></strong>,&nbsp;<strong><em>Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik</em>&nbsp;</strong> ve sair mevzuat hükümlerine uygun olarak silinecek, yok edilecek veya anonim hâle getirilecektir. Kişisel verilerinizi saklamamızı gerektiren; 6102 sayılı Türk Ticaret Kanunu, 6098 sayılı Türk Borçlar Kanunu, 4857 sayılı İş Kanunu, 6331 sayılı İş Sağlığı ve Güvenliği Kanunu, 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun başta olmak üzere her türlü mevzuat kapsamındaki sorumluluklarımız saklıdır.</p>
<p>
	<strong>g)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; KVKK'nın 11. Maddesi Kapsamındaki Haklarınız ve Başvurunuz</strong></p>
<p>
	KVKK'nın 11. maddesi kapsamında, veri sahibi olarak;</p>
<ul>
	<li>
		Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
	<li>
		Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
	<li>
		Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
	<li>
		Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</li>
	<li>
		Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
	<li>
		KVKK ile ilgili diğer kanun ve sair mevzuat hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde, kişisel verilerinizin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
	<li>
		İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle şahsınız aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
	<li>
		Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
</ul>
<p style="margin-left:.5in;">
	haklarına sahipsiniz.</p>
<p>
	KVKK'nın 11. maddesi ile 13. maddesinin 1. fıkrası ve&nbsp;<strong><em>Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ</em></strong>&nbsp;gereğince yukarıda belirtilen haklarınızı kullanma doğrultusundaki talebinizi (tercihen web sitemizde yer alan başvuru formundaki bütün bilgileri doldurmak suretiyle) aşağıdaki yöntemlerden birini tercih ederek bize ulaştırabilirsiniz.&nbsp;</p>
<p>
	&nbsp;</p>
<div style="overflow-x:auto;border:1px solid #ddd;padding:10px;border-radius:5px;margin-top:15px;">
<table style="border-collapse:collapse;width:100%;margin-top:10px;">
	<thead>
		<tr>
			<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Başvuru Yöntemi</th>
			<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Başvurunun Yapılacağı Adres</th>
			<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Başvuru Gönderiminde Belirtilecek Bilgi</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="padding:10px;border:1px solid #ddd;">Şahsen Başvuru (Başvuru sahibinin bizzat gelerek kimliğini tevsik edici belge ile başvurması)</td>
			<td style="padding:10px;border:1px solid #ddd;">Dokuz Eylül Üniversitesi, Tınaztepe Yerleşkesi DEPARK-BETA binası Adatepe Mahallesi Doğuş Caddesi No:207/AG Kat:2 No:202 35390 Buca / İzmir</td>
			<td style="padding:10px;border:1px solid #ddd;">Zarfın üzerine "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi" yazılacaktır. Kişisel Veri Başvuru Formu'nun elden teslimi sırasında kimliğinizi belirten ehliyet, nüfus cüzdanı, pasaport vb. evraklardan birini yanınızda bulundurunuz.</td>
		</tr>
		<tr>
			<td style="padding:10px;border:1px solid #ddd;">Noter aracılığı ile tebligat (İadeli Taahhütlü Posta)</td>
			<td style="padding:10px;border:1px solid #ddd;">Dokuz Eylül Üniversitesi, Tınaztepe Yerleşkesi DEPARK-BETA binası Adatepe Mahallesi Doğuş Caddesi No:207/AG Kat:2 No:202 35390 Buca / İzmir</td>
			<td style="padding:10px;border:1px solid #ddd;">Zarfın üzerine "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi" yazılacaktır. Kişisel Veri Başvuru Formu ekinde Noter tasdikli evrakların gönderilmesi durumunda kargonun iadeli taahhütlü olarak gönderilmesi gerekmektedir.</td>
		</tr>
		<tr>
			<td style="padding:10px;border:1px solid #ddd;">E-Posta</td>
			<td style="padding:10px;border:1px solid #ddd;">kvkk@siskon.com.tr</td>
			<td style="padding:10px;border:1px solid #ddd;">Konu kısmına "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi" yazılacaktır. Kişisel Veri Başvuru Formu'nun e-posta ile tarafımıza gönderilmesinden sonra kimlik doğrulaması yapılabilmektedir.</td>
		</tr>
	</tbody>
</table>
</div>
<p>
	Başvurunuzda;</p>
<p>
	<strong>a) </strong>Ad, soyad ve başvuru yazılı ise imza,</p>
<p>
	<strong>b) </strong>Türkiye Cumhuriyeti vatandaşları için T.C. kimlik numarası, yabancılar için uyruğu, pasaport numarası veya varsa kimlik numarası,</p>
<p>
	<strong>c) </strong>Tebligata esas yerleşim yeri veya iş yeri adresi,</p>
<p>
	<strong>ç) </strong>Varsa bildirime esas elektronik posta adresi, telefon ve faks numarası,</p>
<p>
	<strong>d) </strong>Talep konusu,</p>
<p>
	bilgilerinin bulunması zorunludur. Konuya ilişkin bilgi ve belgeleri de yine başvurunuza eklemeniz gerekmektedir.</p>
<p>
	<strong><em>KVKK</em></strong>'nın 11. maddesinde tanınan haklar kapsamında, veri sahibi olarak, bahse konu haklarınıza ilişkin taleplerinizi tarafımıza iletmeniz durumunda, Şirketimiz, talebinizin niteliğine göre cevabı en kısa sürede ve en geç otuz gün içinde iletecektir. İşlemin ayrıca bir maliyeti gerektirmesi hâlinde, Şirketimiz tarafından Kişisel Verileri Koruma Kurulu'nca belirlenen tarifedeki ücretin alınabileceğini bildiririz.</p>
<p>
	Başvurunuza, Şirketimiz tarafından <strong><em>KVKK</em></strong> ve&nbsp;<strong><em>Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ</em>&nbsp;</strong>kapsamında tüm sorumluluklarımıza uyarak, tüm şekli ve usuli şartlar sağlanarak cevap verilecektir.</p>
<p>
	&nbsp;</p>
<p>
	<strong>Şirket Adı&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.</strong></p>
<p>
	<strong>Temsilci&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Şirket</strong></p>
<p>
	<strong>Adres&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Adatepe Mahallesi Doğuş Caddesi D.E.Ü. Tınaztepe Yerleşkesi No:207/AG K:2 No:202 DEPARK Beta Binası Tınaztepe Buca / İzmir</strong></p>
<p>
	<strong>E-Posta Adresi:&nbsp;</strong><strong><a href="mailto:kvkk@siskon.com.tr?subject=KVKK">kvkk@siskon.com.tr</a></strong></p>
<p>
	<strong>Veri Sorumlusu Sicili (VERBİS):</strong> Sicil numarasına aşağıdaki resmi kayıt sayfasından erişebilirsiniz.</p>
<p>
	<a href="https://verbis.kvkk.gov.tr"><strong>https://verbis.kvkk.gov.tr</strong></a></p>
                  </div>`;

const KVKK_HTML_EN = `<div style="width:100%;">
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ<br>SANAYİ VE TİCARET ANONİM ŞİRKETİ</b></p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;text-align:center;"><b>NOTICE ON THE PROTECTION OF PERSONAL DATA<br>PURSUANT TO LAW NO. 6698</b></p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>a) Data Controller</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.</b> (hereinafter referred to as the "Company") processes your personal data as the data controller within the scope described below and within the limits mandated by Law No. 6698 on the Protection of Personal Data (hereinafter "KVKK") and other applicable legislation.</p>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;padding-left:10px;">
<b>Tax Office / No.:</b> Konak Tax Office, 7710337656<br>
<b>MERSIS No.:</b> 0771033765600027<br>
<b>Registered Office:</b> Çankaya Mahallesi, 153 Sokak No:23/A, Hatay 35250 Konak/İzmir<br>
<b>Place of Business:</b> Adatepe Mahallesi, Doğuş Caddesi No:207/AG, Dokuz Eylül University Tınaztepe Campus, DEPARK Beta Building, Floor 2, No:202, 35390 Buca/İzmir
</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Your personal data may be obtained, recorded, stored, preserved, altered, reorganised, disclosed, transferred, taken over, made available, classified, and transferred to third parties to the extent permitted by applicable law, by fully or partially automated means or by non-automated means that form part of a data recording system.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>b) Purposes for Which Personal Data Are Processed</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Your personal data are processed within the conditions set out in Articles 5 and 6 of the KVKK for the following purposes:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Carrying out the necessary activities to enable you to benefit from our products and services,</li>
<li>Planning and executing sales, marketing, and after-sales support activities,</li>
<li>Following up contractual processes and legal claims,</li>
<li>Ensuring the legal, technical, and commercial business security of related parties,</li>
<li>Managing human resources processes; evaluating job applications; fulfilling statutory and contractual obligations for employees,</li>
<li>Ensuring quality and compliance monitoring for our products and services,</li>
<li>Managing supply chain and supplier relationships,</li>
<li>Ensuring physical premises and information security, identity verification, and guest wireless network access management during visits to our premises,</li>
<li>Contacting you when you request information from the Company,</li>
<li>Planning, auditing, and executing information security processes,</li>
<li>Establishing and managing information technology infrastructure,</li>
<li>Monitoring finance, accounting, and legal affairs,</li>
<li>Planning and executing Company activities, corporate communications, and logistics,</li>
<li>Determining and implementing the Company's commercial and business strategies.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>c) Parties to Whom and Purposes for Which Processed Personal Data May Be Transferred</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Your personal data may be transferred, limited to the fulfilment of the purposes stated in section (b) above and within the conditions for processing personal data set out in Article 8 of the KVKK, to:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>Our business partners, suppliers, shareholders, and affiliates,</li>
<li>Legally authorised public institutions and organisations (TÜBİTAK, SGK, Tax Offices, Ministry of Labour, etc.),</li>
<li>Legally authorised private law persons (auditors, legal advisors, financial advisors, insurance companies, banks, etc.),</li>
<li>Cloud service providers and hosting service providers within the scope of information technology services we use.</li>
</ul>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>d) International Transfers of Personal Data</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Your personal data may be transferred abroad under Article 9 of the KVKK (as amended by Law No. 7499 dated 12.03.2024) where one of the following conditions is met:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>An adequacy decision has been issued by the Personal Data Protection Board regarding the destination country, sectors within that country, or international organisations,</li>
<li>In the absence of an adequacy decision, one of the appropriate safeguards (binding corporate rules, standard contractual clauses, written undertakings) has been provided subject to the written commitment of the parties and the Board's approval,</li>
<li>One of the incidental grounds under Article 9/6 of the KVKK applies (explicit consent, performance of a contract, superior public interest, protection of vital interests, etc.).</li>
</ul>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Within this framework, personal data may be transferred to our subsidiary in Romania (Siskon Software & Automation S.R.L., Brașov) and our subsidiary in Estonia for HR, joint customer/project management, and intra-group reporting purposes, as well as to technology providers hosting server and cloud infrastructure in EU or other overseas regions (e-mail, file storage, enterprise software services), to the extent necessary and subject to the legal safeguards stated above.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>e) Method and Legal Basis of Collection of Personal Data</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Your personal data are collected through communications and contractual relationships established with the Company, during your visits to our premises, via contact forms or user accounts on our website (www.siskon.com.tr), through information provided by third parties for commercial relationship purposes, through information shared at fairs, training sessions, conferences, and similar events, and through similar channels by automated or non-automated means.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">These personal data are processed based on the legal grounds set out in Articles 5 and 6 of the KVKK, including "performance or conclusion of a contract", "fulfilment of a legal obligation", "legitimate interest", "explicit consent", and other applicable grounds, and may also be processed and transferred for the purposes stated in sections (b) and (c) of this Notice.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>f) Retention Period of Your Personal Data</b></p></div>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">Your personal data processed in accordance with the KVKK will be deleted, destroyed, or anonymised, either automatically or upon your request, within the periods determined in the Company's Retention and Disposal Policy once the purposes requiring their processing cease to exist.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">When determining retention periods, applicable statutory limitation periods and retention obligations are taken into account, including those under Turkish Commercial Code No. 6102, Turkish Code of Obligations No. 6098, Labour Law No. 4857, Occupational Health and Safety Law No. 6331, Tax Procedure Law No. 213, Social Insurance and General Health Insurance Law No. 5510, and Law No. 5651 on the Regulation of Publications on the Internet.</p>

<div style="margin-bottom:14pt;"><p style="line-height:115%;"><b>g) Your Rights under Article 11 of the KVKK and How to Submit a Request</b></p></div>
<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">As a data subject, you may exercise the following rights by applying to the Company under Article 11 of the KVKK:</p>
<ul style="line-height:115%;margin-bottom:14pt;margin-top:0pt;list-style-type:disc;padding-left:20px;">
<li>To learn whether your personal data are being processed,</li>
<li>To request information if your personal data have been processed,</li>
<li>To learn the purpose of processing your personal data and whether they are being used in accordance with that purpose,</li>
<li>To know the third parties to whom your personal data have been transferred, domestically or abroad,</li>
<li>To request rectification of incomplete or inaccurate personal data and to request notification of the correction to the third parties to whom such data have been transferred,</li>
<li>To request deletion or destruction of personal data in cases where the reasons requiring processing have ceased to exist, and to request notification thereof to third parties,</li>
<li>To object to a result that arises against you through the analysis of processed data exclusively by automated systems,</li>
<li>To claim compensation for damages arising from unlawful processing of your personal data.</li>
</ul>

<p style="line-height:115%;margin-bottom:8pt;margin-top:0pt;">Pursuant to Article 13(1) of the KVKK and the Communiqué on the Procedures and Principles for Application to the Data Controller, you may submit your request to exercise the above rights using one of the methods below:</p>

<div style="overflow-x:auto;border:1px solid #ddd;padding:10px;border-radius:5px;margin-top:15px;">
<table style="border-collapse:collapse;width:100%;margin-top:10px;">
	<thead>
		<tr>
			<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Application Method</th>
			<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Address</th>
			<th style="text-align:left;padding:10px;border:1px solid #ddd;background-color:#f2f2f2;font-weight:bold;">Information to Include</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="padding:10px;border:1px solid #ddd;">In-Person Application (with identity document)</td>
			<td style="padding:10px;border:1px solid #ddd;">Adatepe Mahallesi, Doğuş Caddesi No:207/AG, DEPARK Beta Binası, Kat:2 No:202, 35390 Buca/İzmir</td>
			<td style="padding:10px;border:1px solid #ddd;">Write "Request for Information within the Scope of the Personal Data Protection Law" on the envelope. Bring a valid ID document.</td>
		</tr>
		<tr>
			<td style="padding:10px;border:1px solid #ddd;">Notary (Registered Mail)</td>
			<td style="padding:10px;border:1px solid #ddd;">Adatepe Mahallesi, Doğuş Caddesi No:207/AG, DEPARK Beta Binası, Kat:2 No:202, 35390 Buca/İzmir</td>
			<td style="padding:10px;border:1px solid #ddd;">Write "Request for Information within the Scope of the Personal Data Protection Law" on the envelope.</td>
		</tr>
		<tr>
			<td style="padding:10px;border:1px solid #ddd;">E-Mail</td>
			<td style="padding:10px;border:1px solid #ddd;">kvkk@siskon.com.tr</td>
			<td style="padding:10px;border:1px solid #ddd;">Subject line: "Request for Information within the Scope of the Personal Data Protection Law". Identity verification may be performed after receipt.</td>
		</tr>
	</tbody>
</table>
</div>

<p style="line-height:115%;margin-bottom:8pt;margin-top:14pt;">Your application must include: name, surname and signature (if written), Turkish ID number (for foreign nationals: nationality, passport number or ID number if available), residential or business address for service, e-mail address, phone and fax number (if any), and the subject of the request. Supporting documents and information must also be attached.</p>
<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;">The Company will respond to your request free of charge within thirty days at the latest. If a processing fee is applicable, the tariff set by the Personal Data Protection Board may be charged.</p>

<p style="line-height:115%;margin-bottom:14pt;margin-top:0pt;"><b>Company Name:</b> SİSKON ENDÜSTRİYEL OTOMASYON SİSTEMLERİ SANAYİ VE TİCARET A.Ş.<br>
<b>Address:</b> Adatepe Mahallesi Doğuş Caddesi D.E.Ü. Tınaztepe Yerleşkesi No:207/AG K:2 No:202 DEPARK Beta Binası Buca / İzmir<br>
<b>E-Mail:</b> <a href="mailto:kvkk@siskon.com.tr?subject=PDPL">kvkk@siskon.com.tr</a><br>
<b>Data Controller Registry (VERBİS):</b> <a href="https://verbis.kvkk.gov.tr">https://verbis.kvkk.gov.tr</a></p>

<div style="clear:both;"><p style="line-height:normal;margin-bottom:0pt;margin-top:0pt;color:#777;font-size:0.85em;">Public Document &amp; Contains No Personal Data</p></div>
</div>`;

export default function KVKKPage() {
	const { lang, localizePath } = useLanguage();
  const isTR = lang === 'TR';

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={isTR ? 'KVKK Aydınlatma Metni' : 'PDPL Notice'}
        subtitle="Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş."
        breadcrumbs={[
          isTR ? 'Ana Sayfa' : 'Home',
          isTR ? 'Yasal' : 'Legal',
          'KVKK',
        ]}
      />

      <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="container-wide">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(2,6,23,0.08)]">
            <header className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4 md:px-8 md:py-5">
              <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.14em] text-sky-700">{isTR ? 'Resmi Metin' : 'Official Document'}</p>
            </header>
            <div className="px-5 py-6 md:px-10 md:py-10 text-slate-700 leading-relaxed text-[15px] md:text-[16px] legal-html" dangerouslySetInnerHTML={{ __html: isTR ? KVKK_HTML : KVKK_HTML_EN }} />
          </article>
        </div>
      </section>

			<section className="cta-section">
				<div className="container text-center max-w-3xl mx-auto">
					<h2>{isTR ? 'KVKK süreçleriyle ilgili desteğe mi ihtiyacınız var?' : 'Need support for PDPL compliance processes?'}</h2>
					<p>
						{isTR
							? 'Kişisel verilerin korunması, başvuru süreçleri ve dokümantasyon konusunda ekibimizden destek alabilirsiniz.'
							: 'Our team can support you with personal data protection, application workflows, and documentation needs.'}
					</p>
					<Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">
						{isTR ? 'KVKK İçin İletişime Geçin' : 'Contact for PDPL Support'}
					</Link>
				</div>
			</section>
    </div>
  );
}
