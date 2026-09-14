/**
 * Portfolio data.
 *
 * NOTE — judul, lokasi, tahun, status dan luas di bawah ini adalah PLACEHOLDER
 * deskriptif (bukan nama proyek/klien sebenarnya) agar mudah diganti.
 * Ganti isinya, bukan strukturnya.
 *
 * Daftar gambar dihasilkan dari scripts/image-manifest.mjs — jalankan
 * `npm run images` setelah menambah foto, lalu sesuaikan `imageCount` di sini.
 */

export type ProjectCategory = "residential" | "interior" | "commercial";

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  typology: string;
  location: string;
  year: string;
  status: string;
  area: string;
  scope: string[];
  intro: string;
  body: string[];
  /** Jumlah gambar di /public/projects/<slug>: cover + 01..n */
  imageCount: number;
  featured?: boolean;
};

export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "Semua Proyek",
  residential: "Arsitektur Hunian",
  interior: "Interior",
  commercial: "Komersial & Kantor",
};

export const projects: Project[] = [
  {
    slug: "rumah-tinggal-dua-lantai",
    index: "01",
    title: "Rumah Tinggal Dua Lantai",
    subtitle: "Hunian keluarga di lahan memanjang",
    category: "residential",
    typology: "Private Residence",
    location: "Surakarta, Indonesia",
    year: "2024",
    status: "Terbangun",
    area: "168 m²",
    scope: ["Desain Arsitektur", "Desain Interior", "Gambar Kerja", "Visualisasi 3D"],
    intro:
      "Massa putih yang dipotong bidang terakota, menegaskan pintu masuk sekaligus melindungi carport dari matahari sore.",
    body: [
      "Lahan memanjang menuntut rumah dibaca dari satu sisi saja. Fasad karena itu disusun sebagai dua bidang: dinding putih yang tenang sebagai latar, dan bidang terakota vertikal yang menandai sirkulasi utama. Kanopi tipis menjadi garis horizontal yang mengikat keduanya.",
      "Di dalam, ruang publik dibiarkan mengalir tanpa sekat — ruang tamu, ruang makan, dan dapur berbagi satu volume panjang dengan bukaan besar ke arah taman belakang. Plafon drop dan lajur pencahayaan tersembunyi dipakai untuk menandai perubahan fungsi, bukan dinding.",
      "Palet material dijaga tetap sedikit: plester halus, kayu gelap, marmer terang, dan aksen hitam pada kusen. Konsistensi ini membuat rumah terasa lebih luas daripada luas sebenarnya.",
    ],
    imageCount: 10,
    featured: true,
  },
  {
    slug: "rumah-atap-pelana",
    index: "02",
    title: "Rumah Atap Pelana",
    subtitle: "Bentuk lokal yang disederhanakan",
    category: "residential",
    typology: "Private Residence",
    location: "Klaten, Jawa Tengah",
    year: "2024",
    status: "Konstruksi",
    area: "210 m²",
    scope: ["Desain Arsitektur", "Desain Interior", "Lanskap Muka", "Visualisasi 3D"],
    intro:
      "Atap pelana yang biasa dijumpai di sekitar tapak dibaca ulang menjadi siluet tunggal yang bersih, tanpa ornamen.",
    body: [
      "Alih-alih menolak konteks, rumah ini mengambil bentuk atap yang paling umum di lingkungannya lalu melucuti detailnya. Yang tersisa adalah dua bidang miring, satu dinding masif, dan satu celah untuk cahaya.",
      "Pagar depan diperlakukan sebagai bagian dari bangunan: bidang beton rendah dengan kotak tanam dan kisi kayu, sehingga batas lahan tidak terasa seperti tembok, melainkan teras yang memanjang.",
      "Interiornya melanjutkan logika yang sama — ruang duduk, ruang makan, dan pantry berada dalam satu bentang dengan perbedaan ketinggian lantai sebagai pembatas halus.",
    ],
    imageCount: 8,
    featured: true,
  },
  {
    slug: "interior-hunian-premium",
    index: "03",
    title: "Interior Hunian Premium",
    subtitle: "Marmer, kayu gelap, dan cahaya tersembunyi",
    category: "interior",
    typology: "Interior Architecture",
    location: "Surakarta, Indonesia",
    year: "2025",
    status: "Terbangun",
    area: "240 m²",
    scope: ["Desain Interior", "Custom Furniture", "Skema Pencahayaan", "Visualisasi 3D"],
    intro:
      "Satu rumah, satu bahasa material: bidang marmer bervena sebagai fokus, kayu gelap sebagai bingkai, cahaya sebagai perekat.",
    body: [
      "Setiap ruang diberi satu bidang dominan — dinding televisi, kepala tempat tidur, atau backsplash dapur — dan sisanya sengaja dibuat diam. Pola ini membuat rumah besar tetap terbaca tenang.",
      "Pencahayaan dirancang berlapis: cove untuk suasana, spot untuk objek, dan linear tersembunyi di dalam rak untuk kedalaman. Tidak ada lampu yang menyorot langsung ke mata penghuni.",
      "Perabot built-in dirancang bersama arsitekturnya, sehingga sambungan material jatuh tepat pada garis nat dan tidak ada detail yang terlihat menempel belakangan.",
    ],
    imageCount: 9,
    featured: true,
  },
  {
    slug: "kantor-cabang-yogyakarta",
    index: "04",
    title: "Kantor Cabang Yogyakarta",
    subtitle: "Ruang kerja, rapat, dan penerimaan tamu",
    category: "commercial",
    typology: "Corporate Interior",
    location: "Yogyakarta, Indonesia",
    year: "2024",
    status: "Terbangun",
    area: "320 m²",
    scope: ["Desain Interior", "Signage & Wayfinding", "Tata Ruang Kerja", "Visualisasi 3D"],
    intro:
      "Lobi dengan dinding hijau dan identitas korporat, dilanjutkan ruang rapat berskala besar dengan pencahayaan terkendali.",
    body: [
      "Urutan ruang disusun jelas: lobi penerimaan, ruang rapat utama, lalu area kerja. Setiap transisi ditandai perubahan material lantai dan pola plafon, bukan pintu.",
      "Ruang rapat memakai panel vertikal untuk memecah pantulan suara, dengan lajur cahaya memanjang mengikuti sumbu meja agar dokumen tetap terbaca tanpa silau.",
      "Area kerja dibuat lebih ringan — meja terang, partisi rendah, dan akses visual ke jendela dari hampir seluruh titik duduk.",
    ],
    imageCount: 9,
    featured: true,
  },
  {
    slug: "suite-kamar-utama-monokrom",
    index: "05",
    title: "Suite Kamar Utama Monokrom",
    subtitle: "Kamar tidur, ruang rias, dan kamar mandi",
    category: "interior",
    typology: "Interior Architecture",
    location: "Surakarta, Indonesia",
    year: "2024",
    status: "Terbangun",
    area: "48 m²",
    scope: ["Desain Interior", "Custom Furniture", "Skema Pencahayaan"],
    intro:
      "Rangkaian ruang privat yang disusun sebagai gradasi abu — lembut di area tidur, menuju terang di area basah.",
    body: [
      "Kamar dibagi menjadi tiga zona tanpa pintu: tidur, rias, dan penyimpanan. Pembatasnya berupa bidang marmer dan lemari built-in yang berfungsi ganda sebagai dinding.",
      "Cermin bundar berlampu ditempatkan sebagai satu-satunya bentuk melengkung dalam ruang yang seluruhnya ortogonal, berfungsi sebagai penanda area rias.",
      "Kamar mandi memakai material terang dan bukaan tinggi agar tetap kering dan terasa lapang meski berukuran kompak.",
    ],
    imageCount: 7,
  },
  {
    slug: "hunian-klasik-modern",
    index: "06",
    title: "Hunian Klasik Modern",
    subtitle: "Proporsi klasik dengan detail masa kini",
    category: "interior",
    typology: "Interior Architecture",
    location: "Yogyakarta, Indonesia",
    year: "2023",
    status: "Terbangun",
    area: "285 m²",
    scope: ["Desain Interior", "Detail Arsitektural", "Custom Furniture", "Visualisasi 3D"],
    intro:
      "Ruang keluarga dua lantai dengan jendela lengkung, dikerjakan memakai panel dan moulding yang sengaja ditipiskan.",
    body: [
      "Rumah ini meminta suasana klasik tanpa menjadi replika. Moulding dipertahankan, tetapi profilnya disederhanakan dan warnanya disamakan dengan dinding sehingga hanya terbaca sebagai bayangan.",
      "Void dua lantai menjadi pusat rumah. Jendela lengkung di sisi atas memasukkan cahaya tinggi yang bergerak sepanjang hari di atas lantai marmer.",
      "Perabot dipilih modern dengan garis bersih agar kontras dengan cangkang ruangnya — cara paling sederhana menjaga rumah tetap terasa kontemporer.",
    ],
    imageCount: 6,
  },
  {
    slug: "kamar-utama-kayu-hijau",
    index: "07",
    title: "Kamar Utama Kayu & Hijau",
    subtitle: "Kehangatan kayu dengan aksen hijau tua",
    category: "interior",
    typology: "Interior Architecture",
    location: "Surakarta, Indonesia",
    year: "2024",
    status: "Terbangun",
    area: "36 m²",
    scope: ["Desain Interior", "Custom Furniture", "Skema Pencahayaan"],
    intro:
      "Rangkaian kamar tidur utama yang memakai kayu sebagai material dominan dan hijau tua sebagai satu-satunya warna.",
    body: [
      "Dinding kepala ranjang dibuat sebagai komposisi bidang kayu dan panel bertekstur, dengan pencahayaan bulat yang berfungsi sekaligus sebagai lampu baca.",
      "Walk-in closet dipisahkan hanya oleh rangka tipis berwarna gelap, menjaga ruang tetap terasa menyatu namun tertata.",
      "Karpet bermotif dipakai untuk memberi kedalaman pada lantai kayu, sekaligus meredam suara di ruang yang banyak permukaan kerasnya.",
    ],
    imageCount: 8,
  },
  {
    slug: "dapur-seri-monokrom",
    index: "08",
    title: "Dapur Seri Monokrom",
    subtitle: "Studi kitchen set untuk beberapa hunian",
    category: "interior",
    typology: "Kitchen & Service",
    location: "Jawa Tengah & DIY",
    year: "2024",
    status: "Terbangun",
    area: "12 – 22 m²",
    scope: ["Desain Interior", "Custom Cabinetry", "Detail Pelaksanaan"],
    intro:
      "Beberapa dapur yang dirancang dengan logika sama: alur kerja lurus, penyimpanan sampai plafon, dan cahaya di bawah kabinet.",
    body: [
      "Semua dapur dalam seri ini memakai segitiga kerja yang sederhana — cuci, siap, masak — dengan jarak yang dapat ditempuh tanpa berputar.",
      "Kabinet atas dibawa sampai plafon untuk menghilangkan celah yang sulit dibersihkan, dengan pintu kaca bergelombang pada bagian tertentu agar dinding tidak terasa masif.",
      "Pencahayaan linear di bawah kabinet dijadikan standar: permukaan kerja terang tanpa bayangan tubuh pengguna.",
    ],
    imageCount: 8,
  },
  {
    slug: "kluster-hunian-deret",
    index: "09",
    title: "Kluster Hunian Deret",
    subtitle: "Unit berulang dengan muka kayu",
    category: "residential",
    typology: "Housing / Cluster",
    location: "Yogyakarta, Indonesia",
    year: "2023",
    status: "Terbangun",
    area: "6 unit",
    scope: ["Desain Arsitektur", "Gambar Kerja", "Pengawasan Berkala", "Visualisasi 3D"],
    intro:
      "Enam unit dengan denah identik, dibedakan hanya oleh ritme kisi kayu pada muka dan posisi tanaman di antaranya.",
    body: [
      "Pengulangan adalah kekuatan sekaligus risiko pada perumahan deret. Di sini pengulangan diterima apa adanya, lalu diberi variasi kecil pada jarak kisi kayu sehingga deretan tetap terbaca sebagai satu kesatuan yang bernapas.",
      "Setiap unit mendapat satu kantong hijau di sisi masuk — cukup untuk satu pohon dan bangku, dan cukup untuk membuat koridor bersama tidak terasa seperti gang.",
      "Dokumentasi konstruksi disertakan untuk menunjukkan hubungan antara rancangan dan hasil di lapangan.",
    ],
    imageCount: 5,
  },
  {
    slug: "paitlegi-coffee-space",
    index: "10",
    title: "Paitlegi Coffee Space",
    subtitle: "Kedai kopi dengan palet gelap",
    category: "commercial",
    typology: "F&B Interior",
    location: "Surakarta, Indonesia",
    year: "2024",
    status: "Terbangun",
    area: "96 m²",
    scope: ["Desain Interior", "Signage", "Tata Cahaya", "Visualisasi 3D"],
    intro:
      "Ruang gelap yang hangat, dengan bar sebagai objek utama dan bukaan lebar menghadap taman sebagai sumber cahaya alami.",
    body: [
      "Warna gelap dipilih agar mata pengunjung jatuh pada dua hal saja: bar dan jendela. Sisanya dibiarkan surut ke belakang.",
      "Bar dirancang sebagai satu massa kayu dan metal dengan pencahayaan dari dalam rak, sehingga tetap menjadi titik paling terang di ruangan tanpa lampu sorot tambahan.",
      "Area duduk dibagi menjadi tiga karakter — bar, meja komunal, dan sudut tenang dekat jendela — untuk melayani durasi kunjungan yang berbeda.",
    ],
    imageCount: 4,
  },
  {
    slug: "rumah-tinggal-lahan-sudut",
    index: "11",
    title: "Rumah Tinggal Lahan Sudut",
    subtitle: "Dua muka, satu komposisi",
    category: "residential",
    typology: "Private Residence",
    location: "Sukoharjo, Jawa Tengah",
    year: "2024",
    status: "Terancang",
    area: "190 m²",
    scope: ["Desain Arsitektur", "Studi Fasad", "Visualisasi 3D"],
    intro:
      "Karena berada di sudut, rumah ini harus terbaca baik dari dua arah — massanya disusun agar tidak ada sisi belakang.",
    body: [
      "Bidang terakota dibawa mengitari sudut sehingga dua fasad terbaca sebagai satu permukaan yang terlipat, bukan dua tampak terpisah.",
      "Pagar berlubang setinggi pinggang menjaga privasi tanpa menutup pandangan, dan memperpanjang garis horizontal bangunan ke arah jalan.",
      "Beberapa alternatif massa dan komposisi bukaan diajukan untuk membaca posisi matahari serta arah datang kendaraan.",
    ],
    imageCount: 5,
  },
  {
    slug: "kantin-ruang-kolaborasi",
    index: "12",
    title: "Kantin & Ruang Kolaborasi",
    subtitle: "Ruang makan bersama untuk institusi",
    category: "commercial",
    typology: "Hospitality Interior",
    location: "Jawa Tengah, Indonesia",
    year: "2023",
    status: "Terbangun",
    area: "145 m²",
    scope: ["Desain Interior", "Tata Perabot", "Visualisasi 3D"],
    intro:
      "Rangka baja hitam yang diekspos menjadi plafon sekaligus struktur penggantung lampu, menyisakan lantai yang sepenuhnya fleksibel.",
    body: [
      "Kebutuhan utamanya adalah fleksibilitas: meja harus bisa digeser untuk acara. Maka semua elemen tetap dipindahkan ke atas — lampu, rak, dan papan menu digantung pada rangka.",
      "Satu dinding hijau dipakai sebagai penanda area layan, cukup untuk memberi orientasi tanpa perlu papan petunjuk tambahan.",
      "Perabot dipilih ringan dan dapat ditumpuk, dengan permukaan yang mudah dibersihkan.",
    ],
    imageCount: 3,
  },
  {
    slug: "kamar-tidur-bata-ekspos",
    index: "13",
    title: "Kamar Tidur Bata Ekspos",
    subtitle: "Material lokal sebagai latar",
    category: "interior",
    typology: "Interior Architecture",
    location: "Yogyakarta, Indonesia",
    year: "2023",
    status: "Terbangun",
    area: "28 m²",
    scope: ["Desain Interior", "Custom Furniture"],
    intro:
      "Dinding bata ekspos dan ukiran kayu dipakai apa adanya, ditemani perabot bergaris lurus agar teksturnya tetap menjadi tokoh utama.",
    body: [
      "Bata dibiarkan tanpa finishing selain lapisan pelindung bening. Nat yang tidak sempurna justru menjadi karakter ruang.",
      "Plafon miring mengikuti bentuk atap dipertahankan untuk menambah tinggi ruang, dengan pencahayaan tersembunyi pada sisi terendahnya.",
      "Elemen ukir ditempatkan hanya pada satu titik agar terbaca sebagai aksen, bukan dekorasi menyeluruh.",
    ],
    imageCount: 4,
  },
  {
    slug: "kamar-utama-netral",
    index: "14",
    title: "Kamar Utama Netral",
    subtitle: "Abu hangat dan kayu terang",
    category: "interior",
    typology: "Interior Architecture",
    location: "Sukoharjo, Jawa Tengah",
    year: "2024",
    status: "Terbangun",
    area: "24 m²",
    scope: ["Desain Interior", "Custom Furniture"],
    intro:
      "Kamar kompak yang diselesaikan dengan tiga nada saja: abu hangat, kayu terang, dan hitam tipis pada garis pembatas.",
    body: [
      "Karena luasnya terbatas, seluruh penyimpanan dibuat menempel dinding setinggi plafon sehingga lantai tetap lega.",
      "Panel di belakang kepala ranjang dibuat bertekstur halus untuk memberi kedalaman tanpa menambah warna.",
      "Meja televisi gantung dipakai agar lantai terlihat menerus dan ruang terasa lebih panjang.",
    ],
    imageCount: 3,
  },
  {
    slug: "hunian-deret-taman",
    index: "15",
    title: "Hunian Deret Taman",
    subtitle: "Rumah deret dua lantai dengan muka taman",
    category: "residential",
    typology: "Housing / Cluster",
    location: "Boyolali, Jawa Tengah",
    year: "2023",
    status: "Terancang",
    area: "4 unit",
    scope: ["Desain Arsitektur", "Visualisasi 3D"],
    intro:
      "Unit deret dua lantai dengan atap miring rendah dan pohon berbunga sebagai elemen yang mengikat seluruh deretan.",
    body: [
      "Massa dibuat sederhana supaya pohon dan tanaman yang menjadi pemeran utama. Warna bangunan dijaga netral agar tidak bersaing dengan warna bunga.",
      "Carport dibuat terbuka tanpa kanopi masif, digantikan overstek lantai dua sehingga muka bangunan tetap ringan.",
    ],
    imageCount: 2,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/** cover + 01..n-1, sesuai keluaran scripts/build-images.mjs */
export function projectImagePaths(project: Project) {
  return Array.from({ length: project.imageCount }, (_, i) =>
    i === 0 ? `/projects/${project.slug}/cover` : `/projects/${project.slug}/${String(i).padStart(2, "0")}`,
  );
}
