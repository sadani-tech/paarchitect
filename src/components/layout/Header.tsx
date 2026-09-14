"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { EASE } from "@/lib/motion";
import { quickWhatsappUrl } from "@/lib/whatsapp";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:text-paper focus:uppercase"
      >
        Lompat ke konten
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-paper/88 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between">
          <Link
            href="/"
            className="text-[0.78rem] font-medium tracking-[0.26em] uppercase"
            aria-label={`${siteConfig.name} — beranda`}
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative text-[0.7rem] uppercase tracking-[0.2em] transition-colors hover:text-ink"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1.5 left-0 block h-px bg-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <a
              href={quickWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line-strong px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
            >
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
            <motion.span
              aria-hidden
              className="block h-px w-5 bg-ink"
              animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
            <motion.span
              aria-hidden
              className="block h-px w-5 bg-ink"
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          </button>
        </div>

        <motion.div
          aria-hidden
          className="h-px origin-left bg-line"
          animate={{ scaleX: scrolled || open ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper pt-[var(--header-h)] md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Navigasi seluler" className="shell flex flex-col pt-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-5 text-2xl"
                  >
                    <span className="eyebrow tabular-nums">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell pb-10">
              <a
                href={quickWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-paper"
              >
                Konsultasi via WhatsApp
              </a>
              <p className="mt-5 text-xs text-ink-4">
                {siteConfig.studio.city}, {siteConfig.studio.region} — {siteConfig.instagramHandle}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
