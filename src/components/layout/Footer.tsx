import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell border-t border-ink-3 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-[0.78rem] font-medium tracking-[0.26em] uppercase">{siteConfig.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">{siteConfig.description}</p>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/45">Halaman</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-paper/75 transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/45">Kontak</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-paper">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.instagramHandle}
                </a>
              </li>
              <li className="pt-2 leading-relaxed text-paper/55">{siteConfig.studio.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-3 pt-6 text-[0.65rem] uppercase tracking-[0.18em] text-paper/40 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span>{siteConfig.disciplines.join(" · ")}</span>
        </div>
      </div>
    </footer>
  );
}
