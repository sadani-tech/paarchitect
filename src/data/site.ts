/**
 * Single source of truth for studio identity and contact channels.
 * Everything user-facing that is not a project lives in src/data.
 */
export const siteConfig = {
  name: "PRANAJA ASHARI",
  shortName: "Pranaja Ashari",
  initials: "PA",
  tagline: "Ruang yang dibentuk dengan maksud.",
  taglineEn: "Spaces shaped with purpose.",
  description:
    "Studio arsitektur dan interior yang merancang hunian, ruang kerja, dan ruang komersial di Jawa Tengah & DIY — dari konsep, gambar kerja, hingga visualisasi.",
  disciplines: ["Architecture", "Interior", "Visualization"],

  // ——— Ganti dengan data asli studio ———
  whatsapp: "6281234567890", // format internasional tanpa tanda "+"
  email: "studio@pranajaashari.com",
  phoneDisplay: "+62 812 3456 7890",
  instagram: "https://instagram.com/pranajaashari",
  instagramHandle: "@pranajaashari",
  studio: {
    city: "Surakarta",
    region: "Jawa Tengah",
    country: "Indonesia",
    address: "Jl. Contoh Raya No. 00, Surakarta, Jawa Tengah 57100",
    hours: "Senin – Jumat, 09.00 – 17.00 WIB",
  },
  founded: 2018,
  url: "https://paarchitect.vercel.app",
} as const;

export const navLinks = [
  { label: "Studio", href: "/studio" },
  { label: "Proyek", href: "/portfolio" },
  { label: "Layanan", href: "/layanan" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const stats = [
  { value: "60+", label: "Proyek terbangun & terancang" },
  { value: "7", label: "Tahun praktik" },
  { value: "4", label: "Kota layanan utama" },
  { value: "100%", label: "Gambar kerja terdokumentasi" },
] as const;
