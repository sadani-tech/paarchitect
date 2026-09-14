export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

/** PLACEHOLDER — ganti dengan testimoni asli sebelum dipublikasikan. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Yang paling terasa bukan gambarnya, tapi caranya bertanya. Banyak hal yang tidak kami sadari kami butuhkan justru muncul di pertemuan pertama.",
    name: "Keluarga H.",
    role: "Pemilik rumah",
    project: "Rumah Tinggal Dua Lantai",
  },
  {
    quote:
      "Gambar kerjanya rapi dan tukang di lapangan tidak perlu menebak. Itu menghemat waktu dan biaya lebih banyak daripada yang saya kira.",
    name: "Bapak R.",
    role: "Pemilik proyek",
    project: "Rumah Atap Pelana",
  },
  {
    quote:
      "Kami minta ruang kantor yang tenang tapi tetap punya karakter. Hasilnya tepat, dan pengerjaannya selesai sesuai jadwal.",
    name: "Divisi Umum",
    role: "Klien korporat",
    project: "Kantor Cabang Yogyakarta",
  },
];
