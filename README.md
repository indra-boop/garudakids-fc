# GARUDAKIDS FC — Official Website

Static multi-page website untuk akademi sepak bola usia muda GarudaKids FC.
Semua konten operasional **tidak di-hardcode** — disimpan di `data/*.json` dan di-generate menjadi HTML statis.

---

## 1. STATUS DATA

| Label | Isi |
|---|---|
| **DATA FINAL** | Struktur halaman, design system, komponen, i18n ID/EN, SEO/meta, form → WhatsApp |
| **ASUMSI** | Seluruh isi `data/*.json` (nama pelatih, pemain, jadwal, skor, prestasi, berita, statistik) |
| **DATA FINAL (client)** | Logo, WhatsApp +62 882-3429-2585, venue Lapangan Jogo Reso Kedungpeluk (koordinat -7.483326, 112.7510873) |
| **KONFIRMASI CLIENT** | Email resmi, kode pos, akun IG/TikTok/YouTube, domain |
| **VERIFIKASI LAPANGAN** | Jadwal latihan asli, nama & lisensi pelatih, kuota per kelompok usia |
| **BELUM DIISI** | Foto asli (hero, pelatih, pemain, galeri, berita) — saat ini pakai placeholder. Logo SUDAH final. |

> **Tidak ada harga/biaya yang ditampilkan** di website. Halaman program mengarahkan ke WhatsApp untuk konfirmasi biaya, supaya tidak menimbulkan ambiguitas komersial.

---

## 2. CARA MENJALANKAN

```bash
node build.js      # generate ke folder dist/
node tools/serve.js  # preview di http://localhost:4321
node tools/check.js  # cek semua link internal
```

Butuh Node.js ≥ 18. **Tanpa dependency** — tidak perlu `npm install`.

Folder yang di-upload ke hosting adalah **`dist/`** saja.

---

## 3. STRUKTUR FOLDER

```
garudakids-fc/
├── data/                 <- SUMBER KONTEN (ini yang diedit admin)
│   ├── site.json         brand, kontak, sosmed, statistik, nilai akademi
│   ├── programs.json     Grassroots / Development / Competitive
│   ├── coaches.json      profil pelatih
│   ├── teams.json        skuad per kelompok usia + daftar pemain
│   ├── schedule.json     jadwal latihan mingguan
│   ├── fixtures.json     jadwal pertandingan + hasil
│   ├── achievements.json prestasi & turnamen
│   ├── gallery.json      kategori + item galeri
│   └── news.json         artikel berita
├── static/assets/        CSS, JS, gambar
├── src/                  template engine (lib.js, pages.js)
├── tools/                serve.js, check.js, shots.js, og.html
├── build.js              generator
└── dist/                 HASIL BUILD — ini yang di-hosting
```

Halaman yang dihasilkan:

```
/                     /programs/grassroots/     /teams/u9/     /fixtures/
/about/               /programs/development/    /teams/u11/    /results/
/programs/            /programs/competitive/    /teams/u13/    /coaches/
/gallery/             /news/  + 6 artikel       /teams/u15/    /registration/
/contact/             /404.html  /sitemap.xml  /robots.txt
```

---

## 4. ASET LOGO (SUDAH TERPASANG — LOGO RESMI)

| File | Isi | Dipakai di |
|---|---|---|
| `logo.png` (512×430) | Logo penuh + wordmark "GARUDA KIDS" | OG image / share preview |
| `logo-mark.png` (440×440) | **Perisai saja**, tanpa wordmark | Navbar, hero badge, footer, crest fixture |
| `favicon.png` (512×512) | Perisai di kanvas persegi | Favicon & apple-touch-icon |
| `brand-source/logo-original.png` | File asli dari client (1326×1187) | Arsip / regenerate aset |

Wordmark dipisah supaya logo tetap terbaca saat tampil kecil (46 px di navbar) — kalau wordmark ikut, tulisannya jadi tidak terbaca.

Kalau logo direvisi, timpa `logo@2x.png` lalu regenerate turunannya, atau kirim file barunya ke saya.

Untuk membuat ulang OG image (gambar preview saat link dibagikan di WhatsApp/FB):
`node tools/shots.js` (butuh Playwright) — atau ganti manual `static/assets/img/og-image.png` ukuran 1200×630.

---

## 5. EDIT KONTEN (ALUR "CMS")

Semua nilai bilingual ditulis sebagai objek:

```json
"title": { "id": "Teks Indonesia", "en": "English text" }
```

Kalau hanya ditulis sebagai string biasa, teks itu akan tampil sama di kedua bahasa (cocok untuk nama orang, kode kelompok usia, nama venue).

**Contoh: menambah hasil pertandingan** → `data/fixtures.json`, array `results`:

```json
{
  "date": "2026-08-23", "opponent": "Deltras Junior", "opponentShort": "DLJ",
  "competition": { "id": "Liga Akademi Sidoarjo U-15", "en": "Sidoarjo Academy League U-15" },
  "ageGroup": "U-15", "venue": "Lapangan Jogo Reso Kedungpeluk", "home": true,
  "scoreUs": 3, "scoreThem": 1, "scorers": "Surya M. (2), Rayhan G."
}
```

Badge M/S/K (W/D/L) dihitung otomatis dari skor. Setelah edit → `node build.js` → upload ulang `dist/`.

**Menambah berita** → `data/news.json`, item baru di posisi paling atas. `slug` menjadi URL `/news/<slug>/`.

**Menambah foto galeri** → taruh file di `static/assets/img/gallery/`, lalu isi `"src": "assets/img/gallery/namafile.webp"` di `data/gallery.json`. Selama `src` kosong, tampil placeholder.

---

## 6. FORM PENDAFTARAN

Form di `/registration/` **tidak mengirim data ke server manapun**. Saat submit, data dirangkai menjadi pesan WhatsApp terformat dan membuka `wa.me/<nomor>`.

Keuntungan: nol biaya backend, nol risiko kebocoran data anak, admin langsung dapat lead di WhatsApp.
Konsekuensi: tidak ada database submission otomatis.

Kalau nanti butuh penyimpanan submission, opsi paling ringan tanpa mengubah desain:
Formspree / Google Apps Script Web App / Netlify Forms — cukup tambahkan `action` + `method` pada `<form id="registration-form">` di `src/pages.js`.

Ganti nomor tujuan di `data/site.json` → `contact.whatsapp` (format internasional tanpa `+`, contoh `6281234567890`).

---

## 7. PERLINDUNGAN DATA ANAK

Sudah diterapkan di struktur data — **jangan dilanggar saat mengisi data asli**:

- Nama pemain ditulis singkat (`"Farrel M."`), bukan nama lengkap.
- Tidak ada field untuk: alamat rumah, alamat sekolah, tanggal lahir, kontak pribadi orang tua, data medis.
- Foto pemain bersifat opsional. Gunakan foto tim/aksi, bukan foto closeup individual, dan pastikan ada izin tertulis orang tua sebelum dipublikasikan.
- Catatan privasi otomatis muncul di halaman Teams dan Registration.

---

## 8. DEPLOY

**Netlify / Vercel / Cloudflare Pages (gratis, paling mudah)**
Drag & drop folder `dist/`. Clean URL (`/about/`) langsung jalan. Aktifkan HTTPS otomatis.

**cPanel / shared hosting**
Upload isi `dist/` ke `public_html/`. Clean URL tetap jalan karena tiap folder punya `index.html`.
Tambahkan `.htaccess` untuk halaman 404 kustom:

```apache
ErrorDocument 404 /404.html
```

**Setelah deploy — WAJIB:**

1. Ubah `data/site.json` → `"url"` menjadi domain asli (dipakai canonical, OG, sitemap, JSON-LD).
2. `node build.js` ulang, upload ulang.
3. Submit `https://domain-anda.com/sitemap.xml` ke Google Search Console.

---

## 9. PERFORMA & SEO

Sudah diterapkan:

- HTML statis, tanpa framework, tanpa dependency runtime — payload sangat kecil
- CSS satu file, JS satu file `defer`, tanpa library eksternal
- Google Fonts di-load non-blocking (`media="print"` + `onload`) dengan fallback `<noscript>`
- `loading="lazy"` pada gambar konten, `fetchpriority="high"` pada hero
- Semantic HTML, skip-link, `aria-current`, `aria-pressed`, `aria-expanded`, caption tabel, kontras warna AA
- `prefers-reduced-motion` dihormati (animasi dimatikan)
- Meta title/description per halaman, canonical, OpenGraph, Twitter Card
- JSON-LD: `SportsOrganization`, `BreadcrumbList`, `Course` (halaman program), `NewsArticle` (artikel)
- `sitemap.xml`, `robots.txt`, halaman `404.html`

**Yang masih memengaruhi skor Lighthouse — tergantung Anda:**
Ukuran foto asli. Target: hero ≤ 250 KB, foto konten ≤ 120 KB, format **WebP/AVIF**, dan selalu isi atribut `width`/`height`.

```bash
# contoh konversi cepat
cwebp -q 80 foto.jpg -o foto.webp
```

---

## 10. NEXT ACTION

| # | Aksi | PIC | Status |
|---|---|---|---|
| 1 | ~~Kirim file logo resmi PNG transparan~~ | Client | ✅ |
| 2 | ~~Konfirmasi nomor WhatsApp & lokasi lapangan~~ | Client | ✅ |
| 2b | ~~Kirim share-location Google Maps titik lapangan~~ | Client | ✅ |
| 2c | Kirim email resmi + kode pos | Client | ⬜ |
| 3 | Konfirmasi akun Instagram / TikTok / YouTube | Client | ⬜ |
| 4 | Kirim data asli: pelatih (nama + lisensi), jadwal latihan, kelompok usia aktif | Client | ⬜ |
| 5 | Kirim foto asli: hero, latihan, pertandingan, tim, pelatih | Client | ⬜ |
| 6 | Konfirmasi angka statistik (pemain aktif, pelatih, sesi, pertandingan) | Client | ⬜ |
| 7 | Tentukan domain + hosting | Client | ⬜ |
| 8 | Update `data/*.json`, rebuild, deploy | Dev | ⬜ |
| 9 | Submit sitemap ke Google Search Console | Dev | ⬜ |

---

© GarudaKids FC. All Rights Reserved.
