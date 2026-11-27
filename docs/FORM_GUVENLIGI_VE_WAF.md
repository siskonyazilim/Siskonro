# İletişim Formu Güvenliği — Kurulum Rehberi

Kapsam: siskon.com.tr, siskon.ro, onsuite.com.tr, onsuite.ro, izlenebilirlik.com.tr, traceability.ro
(traceability.com.tr ve opcuatmc.com bu repolarda yok; aynı adımlar orada da uygulanmalı.)

## Katmanlar

| Katman | Nerede | Ne yapar |
|---|---|---|
| 1. Cloudflare WAF hız kuralı | Cloudflare paneli | Seri POST'ları sunucuya ulaşmadan keser (IP bazlı) |
| 2. Turnstile | Widget + `/api/contact` | Basit botları eler |
| 3. Honeypot | Form + `/api/contact` | Gizli alanı dolduran botu sessizce yok sayar |
| 4. İmzalı form bileti | `GET /api/form-ticket` (onsuite: `GET /api/contact`) + `/api/contact` | Form < 3 sn'de gönderildiyse e-posta gitmez; > 2 saat eskiyse "sayfayı yenileyin" |
| 5. Tekrar işaretleme | `lib/security/formGuard.js` (uygulama belleği) | Aynı e-posta (3/saat, 5/gün) veya aynı metin (2/gün) → reddetmez, konu `[ŞÜPHELİ – tekrar]` |

**Hız sınırı yalnız Cloudflare WAF'ta yapılır** (Adım 3). Uygulamada ek bir veritabanı/Redis yoktur;
sitelerin önceden var olan bellek içi IP sınırları olduğu gibi duruyor.

Kod tarafı (3–5) repolarda hazır. Aşağıdakiler panel ve sunucu ayarlarıdır.

---

## Adım 1 — Ortam değişkenleri (6 sitenin hepsi)

| Değişken | Zorunlu mu | Not |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | Evet (zaten var) | Production'da yoksa form kapalı kalır |
| `FORM_TICKET_SECRET` | İsteğe bağlı | Boşsa `TURNSTILE_SECRET_KEY` kullanılır. `openssl rand -base64 32` ile üretin; her site için ayrı olabilir |
| `TURNSTILE_ALLOWED_HOSTNAMES` | İsteğe bağlı | Boşsa koddaki site listesi kullanılır (ör. `siskon.com.tr` + `www.`). Staging gibi ek alan adı gerekiyorsa virgülle **tam listeyi** yazın |

Turnstile sunucu kontrolü: siteverify yanıtında `success` yanında `hostname` (sitenin alan adı mı) ve
`action === 'contact'` (token bu form için mi) da kontrol edilir. Reddedilenler log'da `reason: hostname_mismatch / action_mismatch` ile görünür.

KVKK notu: Tekrar sayaçlarında e-posta ya da mesajın kendisi tutulmaz, yalnız SHA-256 özeti; en fazla 24 saat, yalnız bellekte.

---

## Adım 2 — Origin'i yalnız Cloudflare'e açın (ÖNEMLİ)

Kod istemci IP'sini önce `CF-Connecting-IP` başlığından okur. Bu başlık **yalnız istek gerçekten Cloudflare'den geliyorsa** güvenilirdir.
Sunucu doğrudan erişilebiliyorsa saldırgan başlığı kendisi yazar ve IP sınırını atlatır.

1. DNS kayıtlarında site alanları **Proxied (turuncu bulut)** olmalı.
2. Sunucu güvenlik duvarında 80/443'ü yalnız Cloudflare IP aralıklarına açın: https://www.cloudflare.com/ips/
   (Alternatif: Cloudflare Tunnel ya da Authenticated Origin Pulls.)
3. Önünde nginx varsa gerçek IP'yi Cloudflare'den alın:
   ```nginx
   # /etc/nginx/conf.d/cloudflare-realip.conf  (aralıkları cloudflare.com/ips'ten güncel tutun)
   set_real_ip_from 173.245.48.0/20;
   # ... diğer Cloudflare IPv4/IPv6 aralıkları ...
   real_ip_header CF-Connecting-IP;
   ```
   ve upstream'e iletin: `proxy_set_header X-Real-IP $remote_addr;`
4. Bir site Cloudflare arkasında **değilse**, nginx'te istemcinin gönderdiği başlığı silin:
   `proxy_set_header CF-Connecting-IP "";` ve `proxy_set_header X-Real-IP $remote_addr;`

---

## Adım 3 — Cloudflare WAF hız kuralı

Panel: ilgili alan adı → **Security → WAF → Rate limiting rules → Create rule**

- **Rule name:** `contact-form-post-limit`
- **If incoming requests match** → *Edit expression*:
  ```
  (http.request.method eq "POST" and http.request.uri.path in {"/api/contact" "/contact/submit" "/api/contact/nojs"})
  ```
- **With the same characteristics:** IP
- **When rate exceeds:** planınızın izin verdiği seçeneklere göre:
  - Free (yalnız 10 sn periyot): **3 istek / 10 saniye**, Action: **Block**, Duration: 10 saniye
  - Pro ve üstü: **5 istek / 1 dakika**, Action: **Block**, Duration: **10 dakika** (veya 1 saat)
- **Action:** Block (Managed Challenge kullanmayın: form `fetch` ile gönderildiği için challenge çözülemez, kullanıcı sessizce hata alır)
- Kaydet → **Deploy**.

> Planlar arası farklar (periyot, süre, kural sayısı) Cloudflare tarafından değişebilir; panelde açılan seçenekler geçerlidir.

Altı alan adı ayrı zone ise kuralı her zone'da tekrarlayın.

## Adım 4 — WAF özel kuralları (isteğe bağlı)

Panel: **Security → WAF → Custom rules → Create rule**

1. **Doğrulanmış botların form POST'unu engelle** (arama motoru botları form göndermez):
   ```
   (cf.client.bot and http.request.method eq "POST" and http.request.uri.path eq "/api/contact")
   ```
   Action: Block

2. **Ülke filtresi — önce yalnız LOG ile deneyin:**
   ```
   (http.request.method eq "POST" and http.request.uri.path eq "/api/contact" and not ip.src.country in {"TR" "RO" "DE" "NL" "GB" "US"})
   ```
   Action: **Log** (Free planda yoksa *Managed Challenge* yerine bu kuralı hiç açmayın).
   1–2 hafta Security Events'te neyin yakalandığına bakın; gerçek müşteri kaybı yoksa Block'a çevirin.
   Ülke listesi satış ekibiyle belirlenmeli.

## Adım 5 — Turnstile paneli

Cloudflare → **Turnstile** → her widget:
- **Hostname management:** yalnız gerçek alan adları (`siskon.com.tr`, `www.siskon.com.tr` …). `localhost` ve eski alan adlarını production widget'ından çıkarın (geliştirme için ayrı widget/test anahtarı kullanın).
- **Widget mode:** Managed.

---

## Test listesi (her site, deploy sonrası)

| Test | Beklenen |
|---|---|
| Normal gönderim (formu açıp > 3 sn sonra gönder) | E-posta gelir |
| Aynı e-posta ile kısa sürede 4. gönderim | E-posta gelir, konu `[ŞÜPHELİ – tekrar]` ile başlar |
| Aynı uzun mesaj metni farklı adreslerden 3. kez | Konu `[ŞÜPHELİ – tekrar]` |
| Aynı IP'den kısa sürede seri POST (WAF eşiğinin üstü) | Cloudflare engeller; Security → Events'te görünür |
| `curl -X POST …/api/contact` (bilet yok) | 400 / reddedilir, e-posta gitmez |
| DevTools'ta gizli `_hp` / `website` alanını doldurup gönder | "Başarılı" görünür, e-posta **gitmez** |
| Sayfayı 2 saatten uzun açık bırakıp gönder | siskon: bilet 30 dk'da bir yenilenir → gider. Diğerleri: mevcut süre sınırı nedeniyle "yenileyin" hatası |

Log olayları: `contact_ticket_rejected`, `contact_duplicate_flagged`, `contact_honeypot_triggered`.
