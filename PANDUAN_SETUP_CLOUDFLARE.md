# Panduan Lengkap Setup Custom Domain Cloudflare: bekambogor.my.id

Dokumen ini berisi panduan langkah demi langkah untuk menghubungkan dan mengoptimalkan domain **`bekambogor.my.id`** menggunakan Cloudflare, lengkap dengan setting DNS, SSL/TLS, Caching, SEO, AEO (AI Engine Optimization), dan keamanan web.

---

## 1. Menambahkan Domain ke Akun Cloudflare

1. Buka [dash.cloudflare.com](https://dash.cloudflare.com) dan login ke akun Cloudflare Anda.
2. Klik tombol **"Add a site"** (Tambah situs).
3. Masukkan nama domain:
   ```text
   bekambogor.my.id
   ```
4. Pilih paket: **Free Plan ($0 / Gratis)** lalu klik **Continue**.
5. Cloudflare akan melakukan scan otomatis terhadap DNS record yang sudah ada.

---

## 2. Mengubah Name Server (NS) di Registrar Domain

Setelah proses scan selesai, Cloudflare akan memberikan 2 alamat Nameserver resmi (contoh):
- `ns1.cloudflare.com` (atau nama unik seperti `adam.ns.cloudflare.com`)
- `ns2.cloudflare.com` (atau nama unik seperti `eva.ns.cloudflare.com`)

### Cara Mengganti di Registrar (Tempat Beli Domain):
1. Login ke panel registrar tempat Anda membeli domain `.my.id` (misalnya: Niagahoster, DomaiNesia, Rumahweb, Dewaweb, IDwebhost, dsb).
2. Masuk ke menu **Domain Management** / **Kelola Domain** -> cari **`bekambogor.my.id`**.
3. Pilih menu **Nameservers** / **Kelola Name Server**.
4. Ubah dari *Default Nameserver* menjadi *Custom Nameserver*.
5. Masukkan 2 nameserver yang diberikan Cloudflare di atas.
6. Simpan perubahan.
7. Kembali ke Cloudflare lalu klik tombol **"Done, check nameservers"**.
> *Catatan:* Propagasi DNS umumnya memakan waktu 5 menit hingga maksimal 24 jam.

---

## 3. Cara Menghubungkan Website: Lewat GitHub atau Publish AI Studio?

**Rekomendasi Terbaik (100% Gratis & Otomatis): Lewat GITHUB -> CLOUDFLARE PAGES**

Karena website ini dibangun dengan React + Vite (Static Web Application), menghubungkannya melalui GitHub ke Cloudflare Pages adalah cara paling stabil, cepat, dan profesional. Setiap Anda mengupdate kode di GitHub, Cloudflare akan otomatis meng-update website Anda dalam hitungan detik.

### Langkah Menghubungkan lewat GitHub:
1. Masuk ke dashboard Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com)
2. Di menu sebelah kiri, klik **Workers & Pages** -> pilih **Create application** -> tab **Pages** -> klik **Connect to Git**.
3. Hubungkan akun GitHub Anda dan pilih repository: `prassandrasandria/Bekambogor`.
4. Pada bagian **Build settings**:
   - **Framework preset**: Pilih `Vite` (atau `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Klik **Save and Deploy**. Cloudflare akan mem-build web Anda dan memberikan URL gratis (contoh: `bekambogor.pages.dev`).
6. Setelah selesai, buka tab **Custom domains** di project Pages tersebut -> klik **Set up a custom domain**.
7. Masukkan domain Anda: **`bekambogor.my.id`** (dan `www.bekambogor.my.id`). Cloudflare akan otomatis menghubungkannya tanpa perlu setting DNS rumit!

### Alternatif (Jika Lewat Publish AI Studio / Cloudflare DNS Langsung):
Jika Anda mem-publish langsung dari AI Studio (Deploy):
1. Buka menu **DNS** -> **Records** di dashboard Cloudflare untuk `bekambogor.my.id`.
2. Masukkan CNAME Record yang mengarah ke URL hasil publish AI Studio:
   - Type: `CNAME` | Name: `@` | Target: `[URL-target-deploy]` | Proxy: Proxied (Awan Oranye)
   - Type: `CNAME` | Name: `www` | Target: `bekambogor.my.id` | Proxy: Proxied (Awan Oranye)

---

## 4. Konfigurasi SSL / TLS (Enkripsi Penuh & Otomatis HTTPS)

Agar website lolos indikator keamanan browser (tanda gembok hijau/aman) dan disukai Google:

1. Buka menu **SSL/TLS** -> **Overview**.
2. Pilih mode enkripsi: **Full** atau **Full (strict)**.
3. Masuk ke submenu **Edge Certificates**:
   - Aktifkan **Always Use HTTPS** (Otomatis redirect `http://` ke `https://`).
   - Aktifkan **Automatic HTTPS Rewrites**.
   - Set **Minimum TLS Version** ke **TLS 1.2** atau **TLS 1.3**.
   - Aktifkan **Opportunistic Encryption**.

---

## 5. Optimasi Kecepatan & Core Web Vitals (FCP, LCP, CLS, Speed Index)

Di menu **Speed** -> **Optimization**:

1. **Auto Minify**:
   - Centang **HTML**, **CSS**, dan **JavaScript**.
2. **Brotli Compression**:
   - Aktifkan **On** (Kompresi data hingga 20% lebih hemat daripada Gzip).
3. **Early Hints**:
   - Aktifkan **On** (Mempercepat loading font dan stylesheet).
4. **Rocket Loader™**:
   - Jika ingin rendering JavaScript asynchronous super cepat, aktifkan Rocket Loader.

---

## 6. Setting Caching & Page Rules

1. Buka menu **Caching** -> **Configuration**:
   - **Caching Level**: *Standard*
   - **Browser Cache TTL**: *4 hours* atau *Respect Existing Headers*
   - **Always Online**: *On* (Website tetap dapat diakses pembaca meskipun server utama sedang maintenance).

---

## 7. Crawl & Indexing untuk Semua Search Engine & AI Bot (SEO & AEO)

Website ini sudah dilengkapi file:
- `/robots.txt` (Mengizinkan Googlebot, Bingbot, DuckDuckBot, YandexBot, Applebot, serta bot AI seperti GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, dan Google-Extended).
- `/sitemap.xml` (Peta situs lengkap dengan link utama, prioritas, dan update frekuensi mingguan).
- Tag Geo Coordinates (`geo.position`, `ICBM`, `geo.placename: Bogor, Leuwisadeng, Leuwiliang`).
- Schema.org Structured Data (`HealthAndBeautyBusiness`, `MedicalProcedure`, `FAQPage`, `OfferCatalog`).

### Di Cloudflare Security Settings:
1. Masuk ke **Security** -> **Bots**.
2. **Bot Fight Mode**: Jika diaktifkan, pastikan *AI Bots Protection* tidak memblokir bot pencari yang bermanfaat.
3. Di Cloudflare versi terbaru, pada fitur **AI Scrapers and Crawlers**, pastikan Anda **mengizinkan (Allow)** bot seperti `GPTBot`, `PerplexityBot`, dan `Google-Extended` jika Anda ingin website **Bekam Bogor** direkomendasikan langsung saat orang bertanya pada ChatGPT, Gemini, atau Perplexity: *"Siapa terapis bekam panggilan terbaik di Bogor?"*.

---

## 8. Verifikasi ke Google Search Console & Bing Webmaster

1. Buka [search.google.com/search-console](https://search.google.com/search-console)
2. Masukkan domain `bekambogor.my.id`.
3. Verifikasi menggunakan metode **DNS TXT Record** di menu DNS Cloudflare.
4. Masukkan URL sitemap:
   ```text
   https://bekambogor.my.id/sitemap.xml
   ```
5. Ulangi hal yang sama di [Bing Webmaster Tools](https://www.bing.com/webmasters) (Bing juga mengindeks pencarian Yahoo dan DuckDuckGo).

---
*Dokumen ini dibuat otomatis untuk pemilik situs Bekam Bogor (bekambogor.my.id).*
