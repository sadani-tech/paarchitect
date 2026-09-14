export type Package = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  note: string;
  includes: string[];
  highlight?: boolean;
};

/**
 * PLACEHOLDER — sesuaikan angka dengan penawaran studio yang sebenarnya.
 * Angka ditulis sebagai string agar mudah diubah menjadi "Hubungi kami".
 */
export const packages: Package[] = [
  {
    name: "Essential",
    tagline: "Untuk hunian sederhana yang butuh dasar kuat",
    price: "Rp 85.000",
    unit: "/ m²",
    note: "Minimum 60 m²",
    includes: [
      "Konsultasi awal & pembacaan tapak",
      "Denah, tampak, potongan",
      "Gambar kerja arsitektur",
      "3 render eksterior",
      "2 kali revisi konsep",
    ],
  },
  {
    name: "Professional",
    tagline: "Paket paling banyak dipilih untuk rumah tinggal",
    price: "Rp 140.000",
    unit: "/ m²",
    note: "Minimum 100 m²",
    includes: [
      "Seluruh lingkup paket Essential",
      "Desain interior ruang utama",
      "Skema material & pencahayaan",
      "6 render eksterior & interior",
      "Rencana anggaran biaya",
      "4 kali revisi konsep",
    ],
    highlight: true,
  },
  {
    name: "Signature",
    tagline: "Untuk proyek dengan detail dan pengawasan penuh",
    price: "Hubungi kami",
    unit: "",
    note: "Hunian besar, komersial, atau multi-unit",
    includes: [
      "Seluruh lingkup paket Professional",
      "Detail custom furniture menyeluruh",
      "Desain lanskap muka",
      "Render tak terbatas selama tahap desain",
      "Pendampingan konstruksi berkala",
      "Revisi menyesuaikan kebutuhan",
    ],
  },
];

export const pricingNotes = [
  "Harga di atas adalah estimasi awal dan dapat menyesuaikan tingkat kerumitan, lokasi, serta luas bangunan.",
  "Biaya perizinan, survei tanah, dan konsultan struktur/MEP dihitung terpisah.",
  "Penawaran final diterbitkan setelah konsultasi dan pembacaan tapak.",
];
