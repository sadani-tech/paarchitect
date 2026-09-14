export type Service = {
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  /** Gambar pendamping dari /public/projects (tanpa ekstensi & ukuran). */
  image: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Desain Arsitektur",
    summary:
      "Dari pembacaan tapak hingga gambar kerja siap bangun. Kami mulai dari orientasi matahari, arah angin, dan cara Anda menggunakan ruang — bukan dari gaya.",
    deliverables: ["Studi tapak & program ruang", "Denah, tampak, potongan", "Gambar kerja arsitektur", "Rencana anggaran biaya"],
    image: "/projects/rumah-atap-pelana/cover",
  },
  {
    index: "02",
    title: "Desain Interior",
    summary:
      "Perencanaan ruang dalam yang menyatu dengan arsitekturnya: tata perabot, material, pencahayaan, sampai detail custom furniture.",
    deliverables: ["Layout & zonasi", "Skema material & warna", "Detail furniture", "Rencana titik lampu"],
    image: "/projects/interior-hunian-premium/cover",
  },
  {
    index: "03",
    title: "Visualisasi 3D",
    summary:
      "Render yang jujur terhadap proporsi dan material, supaya keputusan dapat diambil sebelum satu batu bata pun dipasang.",
    deliverables: ["Render eksterior & interior", "Studi material", "Walkthrough sederhana", "Revisi terjadwal"],
    image: "/projects/rumah-tinggal-dua-lantai/cover",
  },
  {
    index: "04",
    title: "Renovasi & Adaptasi",
    summary:
      "Membaca bangunan yang sudah ada, menentukan apa yang layak dipertahankan, lalu menambahkan hanya yang perlu.",
    deliverables: ["Survey & as-built", "Skema intervensi", "Gambar kerja renovasi", "Estimasi tahapan pekerjaan"],
    image: "/projects/kamar-tidur-bata-ekspos/cover",
  },
  {
    index: "05",
    title: "Konsultasi & Pengawasan",
    summary:
      "Pendampingan selama pelaksanaan agar hasil di lapangan sesuai gambar — termasuk penyelesaian detail yang muncul saat membangun.",
    deliverables: ["Konsultasi awal", "Pengawasan berkala", "Klarifikasi gambar", "Laporan kemajuan"],
    image: "/projects/kluster-hunian-deret/02",
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  duration: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Konsultasi & Pembacaan Tapak",
    duration: "1 – 2 minggu",
    description:
      "Kami mendengar kebutuhan, mengukur lahan, dan mencatat batasan: anggaran, regulasi, arah matahari, serta kebiasaan penghuni.",
  },
  {
    index: "02",
    title: "Konsep & Studi Massa",
    duration: "2 – 3 minggu",
    description:
      "Program ruang diterjemahkan menjadi susunan massa dan denah awal. Di tahap ini bentuk masih boleh berubah besar.",
  },
  {
    index: "03",
    title: "Pengembangan Desain",
    duration: "3 – 5 minggu",
    description:
      "Material, struktur, dan sistem ditetapkan. Visualisasi 3D dipakai untuk menguji proporsi dan suasana sebelum dikunci.",
  },
  {
    index: "04",
    title: "Gambar Kerja",
    duration: "4 – 6 minggu",
    description:
      "Seluruh dokumen teknis disusun lengkap dengan detail, spesifikasi, dan rencana anggaran biaya untuk proses tender.",
  },
  {
    index: "05",
    title: "Pendampingan Konstruksi",
    duration: "Menyesuaikan",
    description:
      "Kunjungan berkala, klarifikasi gambar, dan penyelesaian detail lapangan sampai bangunan selesai.",
  },
];
