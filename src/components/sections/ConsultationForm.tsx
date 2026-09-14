"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { packages } from "@/data/pricing";
import { siteConfig } from "@/data/site";
import {
  buildConsultationMessage,
  emptyForm,
  mailtoUrl,
  whatsappUrl,
  type ConsultationForm as FormState,
} from "@/lib/whatsapp";
import { EASE } from "@/lib/motion";

const JENIS_PROYEK = [
  "Rumah tinggal baru",
  "Renovasi rumah",
  "Interior hunian",
  "Kantor / komersial",
  "Kluster / multi-unit",
  "Lainnya",
];

const BUDGET = [
  "< Rp 300 juta",
  "Rp 300 – 600 juta",
  "Rp 600 juta – 1 miliar",
  "> Rp 1 miliar",
  "Belum ditentukan",
];

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ink-4 focus:border-ink";
const labelClass = "block text-[0.65rem] uppercase tracking-[0.2em] text-ink-3";

/**
 * Tidak ada backend: isian dirakit menjadi pesan WhatsApp di sisi klien,
 * lalu dibuka lewat wa.me. Tersedia juga jalur mailto sebagai cadangan.
 */
export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(emptyForm);

  const message = useMemo(() => buildConsultationMessage(form), [form]);
  const ready = form.nama.trim().length > 1 && form.jenisProyek.trim().length > 0;

  function update<K extends keyof FormState>(key: K) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <form
        className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div>
          <label className={labelClass} htmlFor="nama">
            Nama
          </label>
          <input
            id="nama"
            name="nama"
            className={fieldClass}
            placeholder="Nama lengkap"
            autoComplete="name"
            value={form.nama}
            onChange={update("nama")}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="kontak">
            Nomor WhatsApp / Email
          </label>
          <input
            id="kontak"
            name="kontak"
            className={fieldClass}
            placeholder="08xx atau nama@email.com"
            autoComplete="tel"
            value={form.kontak}
            onChange={update("kontak")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="lokasi">
            Lokasi proyek
          </label>
          <input
            id="lokasi"
            name="lokasi"
            className={fieldClass}
            placeholder="Kota / kecamatan"
            value={form.lokasi}
            onChange={update("lokasi")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="jenisProyek">
            Jenis proyek
          </label>
          <select
            id="jenisProyek"
            name="jenisProyek"
            className={`${fieldClass} appearance-none`}
            value={form.jenisProyek}
            onChange={update("jenisProyek")}
            required
          >
            <option value="">Pilih salah satu</option>
            {JENIS_PROYEK.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="luas">
            Perkiraan luas bangunan
          </label>
          <input
            id="luas"
            name="luas"
            className={fieldClass}
            placeholder="mis. 180 m²"
            inputMode="numeric"
            value={form.luas}
            onChange={update("luas")}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="budget">
            Perkiraan budget
          </label>
          <select
            id="budget"
            name="budget"
            className={`${fieldClass} appearance-none`}
            value={form.budget}
            onChange={update("budget")}
          >
            <option value="">Pilih salah satu</option>
            {BUDGET.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <span className={labelClass}>Paket yang diminati</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {packages.map((pkg) => {
              const on = form.paket === pkg.name;
              return (
                <button
                  key={pkg.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setForm((prev) => ({ ...prev, paket: on ? "" : pkg.name }))}
                  className={`border px-4 py-2 text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    on ? "border-ink bg-ink text-paper" : "border-line text-ink-3 hover:border-ink hover:text-ink"
                  }`}
                >
                  {pkg.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="pesan">
            Pesan
          </label>
          <textarea
            id="pesan"
            name="pesan"
            rows={4}
            className={`${fieldClass} resize-none`}
            placeholder="Ceritakan singkat rencana Anda — jumlah kamar, gaya yang disukai, target waktu mulai."
            value={form.pesan}
            onChange={update("pesan")}
          />
        </div>

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
          <a
            href={ready ? whatsappUrl(message) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!ready}
            onClick={(event) => {
              if (!ready) event.preventDefault();
            }}
            className={`group inline-flex items-center justify-center gap-3 px-7 py-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
              ready
                ? "bg-ink text-paper hover:bg-clay"
                : "pointer-events-none cursor-not-allowed bg-line-strong text-paper"
            }`}
          >
            Konsultasi via WhatsApp
            <span aria-hidden className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
          </a>

          <a
            href={mailtoUrl(message)}
            className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-3 underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            atau kirim lewat email
          </a>
        </div>

        {!ready ? (
          <p className="text-xs text-ink-4 sm:col-span-2">
            Isi nama dan jenis proyek untuk mengaktifkan tombol WhatsApp.
          </p>
        ) : null}
      </form>

      {/* ——— Pratinjau pesan ——— */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
          <p className="eyebrow">Pratinjau pesan</p>
          <motion.pre
            key={message}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-4 max-h-[26rem] overflow-auto border border-line bg-paper-2 p-6 font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink-2"
          >
            {message}
          </motion.pre>
          <p className="mt-4 text-xs leading-relaxed text-ink-4">
            Pesan ini disusun langsung di peramban Anda dan tidak dikirim ke server mana pun.
            Menekan tombol di samping hanya membuka WhatsApp ke nomor {siteConfig.phoneDisplay}.
          </p>
        </div>
      </div>
    </div>
  );
}
