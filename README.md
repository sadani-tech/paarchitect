# PRANAJA ASHARI — Website Studio Arsitektur

Situs statis (100% tanpa backend) untuk studio arsitektur & interior.
Next.js App Router + TypeScript + Tailwind CSS v4 + Motion + React Three Fiber.

```bash
npm install
npm run images   # ubah foto di /portofolio menjadi WebP responsif (sekali saja / saat foto berubah)
npm run dev      # http://localhost:3000
npm run build    # menghasilkan folder out/ siap unggah
npm run lint
```

---

## Isi yang perlu Anda ganti lebih dulu

| Berkas | Isi |
| --- | --- |
| `src/data/site.ts` | Nomor WhatsApp, email, Instagram, alamat, jam kerja, tahun berdiri |
| `src/data/projects.ts` | Judul, lokasi, tahun, luas, dan narasi proyek |
| `src/data/pricing.ts` | Harga dan isi paket |
| `src/data/testimonials.ts` | Testimoni klien |
| `src/data/faqs.ts` | Pertanyaan umum |
| `src/data/services.ts` | Layanan dan tahapan kerja |

> **Penting:** judul proyek, lokasi, tahun, dan testimoni saat ini adalah
> **placeholder deskriptif**, bukan data asli. Ganti sebelum dipublikasikan.
> Nomor WhatsApp di `site.ts` (`6281234567890`) juga masih contoh — tombol
> konsultasi tidak akan sampai ke Anda sebelum diganti.

---

## Cara kerja gambar

Foto mentah ada di `portofolio/type-a|b|c/`. Pipeline-nya:

1. `scripts/image-manifest.mjs` memetakan foto mana masuk ke proyek mana
   (berdasarkan urutan berkas di dalam foldernya, dimulai dari 0).
2. `npm run images` menghasilkan `public/projects/<slug>/{cover,01,02,…}-{480,768,1200,1600}.webp`
   plus `src/data/generated/images.ts` (dimensi + placeholder blur).
3. `src/lib/image-loader.ts` — loader `next/image` kustom — memilih ukuran
   terdekat saat render. Karena semua ukuran dibuat lebih dulu, tidak ada
   layanan optimasi gambar yang dibutuhkan di server.

### Menambah proyek baru

```
1. Taruh foto di portofolio/<folder>/
2. Tambah entri di scripts/image-manifest.mjs      → { slug, picks: [["type-a", [0, 3, 7]]] }
3. npm run images
4. Tambah entri di src/data/projects.ts dengan slug yang sama + imageCount
```

Urutan `picks` menentukan urutan tampil; indeks pertama menjadi `cover`.

---

## Struktur

```
src/
  app/                  halaman (semuanya statis)
    page.tsx            beranda
    portfolio/          indeks + [slug] (generateStaticParams)
    studio/ layanan/ kontak/
    sitemap.ts robots.ts icon.svg
  components/
    motion/             FadeIn, RevealText, ImageReveal, ParallaxImage,
                        Stagger, PageTransition, MagneticButton, ArchRule
    three/              ArchitecturalScene, ArchitecturalModel,
                        ConceptVolumes, ArchitecturalGrid (SVG)
    sections/           blok halaman
    layout/ ui/
  data/                 seluruh konten situs
  lib/                  loader gambar, token motion, pesan WhatsApp, hooks
```

Semua logika animasi tinggal di `components/motion` dan `components/three`;
komponen seksi hanya memakainya.

---

## Three.js: apa yang dipakai dan kapan

Hanya ada **dua** scene WebGL, keduanya dimuat terpisah (`next/dynamic`, `ssr: false`)
sehingga HTML dan tipografi tampil lebih dulu:

| Scene | Lokasi | Isi |
| --- | --- | --- |
| `ArchitecturalScene` | hero beranda | maket massing monokrom; pointer memutar ±3°, scroll menggeser maket keluar sementara foto proyek pertama masuk |
| `ConceptVolumes` | bagian filosofi | tiga volume yang menyatu mengikuti scroll (CONTEXT · FUNCTION · CHARACTER) |

Penjagaan performa yang sudah terpasang:

- `useWebglTier()` — desktop `full`, tablet `reduced`, ponsel/`prefers-reduced-motion`/tanpa WebGL → `none`
- `frameloop` berhenti total saat kanvas keluar viewport **atau** tab disembunyikan
- `dpr={[1, 1.5]}`, satu `BoxGeometry` dan tiga material dipakai ulang seluruh mesh
- geometry & material dibuang manual saat unmount
- tanpa WebGL, hero tetap utuh: fotografi arsitektur + tipografi (bukan kanvas kosong)

Wireframe arsitektural di belakang tipografi sengaja **SVG**, bukan WebGL —
selalu tersedia dan nyaris tanpa biaya.

### Catatan penting soal `clip-path` + `whileInView`

Elemen dengan `clip-path: inset(100%)` punya intersection rect nol, sehingga
`IntersectionObserver` — dan karenanya `whileInView` — tidak akan pernah aktif.
`ImageReveal` karena itu memisahkan pemicu (pembungkus luar, tanpa clip) dari
elemen yang di-clip. Ikuti pola yang sama bila membuat reveal baru.

---

## Formulir konsultasi (tanpa backend)

`src/components/sections/ConsultationForm.tsx` merangkai isian menjadi pesan
WhatsApp **di peramban pengunjung**, lalu membuka `https://wa.me/<nomor>?text=…`.
Tidak ada permintaan ke server, tidak ada basis data. Tersedia juga jalur
`mailto:` sebagai cadangan. Nomor tujuan diambil dari `siteConfig.whatsapp`.

---

## Aksesibilitas & gerak

- `prefers-reduced-motion: reduce` → WebGL mati, parallax mati, sisanya hanya fade
  (`MotionConfig reducedMotion="user"` di `components/layout/MotionProvider.tsx`)
- kursor "VIEW PROJECT" hanya aktif pada penunjuk presisi, mati di layar sentuh
- efek magnetik terbatas 6px, hanya pada CTA utama
- tidak ada scroll hijacking; perilaku scroll peramban tidak diubah
- skip link, fokus terlihat, urutan tab wajar, `aria-expanded` pada menu & FAQ

---

## Deploy

`npm run build` menulis folder `out/` berisi HTML, CSS, JS, dan gambar statis.

| Host | Pengaturan |
| --- | --- |
| Vercel | otomatis terdeteksi |
| Netlify | build `npm run build`, publish `out` |
| Cloudflare Pages | build `npm run build`, output `out` |
| Hosting biasa / cPanel | unggah isi `out/` apa adanya |

Sebelum go-live, ganti `siteConfig.url` di `src/data/site.ts` — nilai itu dipakai
untuk metadata Open Graph, `sitemap.xml`, dan `robots.txt`.
