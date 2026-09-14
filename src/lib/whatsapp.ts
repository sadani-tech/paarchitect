import { siteConfig } from "@/data/site";

export type ConsultationForm = {
  nama: string;
  kontak: string;
  lokasi: string;
  jenisProyek: string;
  luas: string;
  budget: string;
  paket: string;
  pesan: string;
};

export const emptyForm: ConsultationForm = {
  nama: "",
  kontak: "",
  lokasi: "",
  jenisProyek: "",
  luas: "",
  budget: "",
  paket: "",
  pesan: "",
};

const LABELS: Array<[keyof ConsultationForm, string]> = [
  ["nama", "Nama"],
  ["kontak", "Kontak"],
  ["lokasi", "Lokasi proyek"],
  ["jenisProyek", "Jenis proyek"],
  ["luas", "Perkiraan luas"],
  ["budget", "Perkiraan budget"],
  ["paket", "Paket yang diminati"],
  ["pesan", "Pesan"],
];

/** Pesan WhatsApp yang dirakit sepenuhnya di sisi klien — tidak ada backend. */
export function buildConsultationMessage(form: ConsultationForm) {
  const lines = [
    `Halo ${siteConfig.name},`,
    "",
    "Saya ingin berkonsultasi mengenai proyek arsitektur.",
    "",
    ...LABELS.filter(([key]) => form[key].trim()).map(([key, label]) => `${label}: ${form[key].trim()}`),
  ];
  return lines.join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(message: string, subject = "Konsultasi Proyek") {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

/** Tautan WhatsApp singkat untuk tombol umum (tanpa form). */
export function quickWhatsappUrl(context?: string) {
  const message = context
    ? `Halo ${siteConfig.name}, saya ingin bertanya mengenai ${context}.`
    : `Halo ${siteConfig.name}, saya ingin berkonsultasi mengenai proyek arsitektur.`;
  return whatsappUrl(message);
}
