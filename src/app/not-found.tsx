import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="eyebrow">Kesalahan 404</p>
      <h1 className="display mt-5 text-[clamp(2.4rem,7vw,5rem)]">Halaman tidak ditemukan</h1>
      <p className="body-lg mt-6 max-w-md">
        Tautan yang Anda buka mungkin sudah berubah. Silakan kembali ke beranda atau
        telusuri arsip proyek.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <MagneticButton href="/">Kembali ke Beranda</MagneticButton>
        <Link
          href="/portfolio"
          className="inline-flex items-center px-2 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-ink-3 transition-colors hover:text-ink"
        >
          Lihat Proyek
        </Link>
      </div>
    </section>
  );
}
