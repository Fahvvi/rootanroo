"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const NAV_KEYS = ["work", "services", "photography", "videography", "about", "contact"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  work: "/work",
  services: "/services",
  photography: "/photography",
  videography: "/videography",
  about: "/about",
  contact: "/contact",
};

export function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "var(--ra-bg)" : "transparent",
        borderBottom: scrolled ? `1px solid var(--ra-line)` : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="font-mono text-base tracking-tight">
          root
          <span style={{ color: "var(--ra-ink-muted)" }}>an</span>
          <span className="font-bold" style={{ color: "var(--ra-accent)" }}>roo</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_KEYS.map((key) => (
            <Link
              key={key}
              href={NAV_HREFS[key]}
              className="ra-tag transition-colors hover:text-[var(--ra-ink)]"
              style={{ color: "var(--ra-ink-muted)" }}
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label={t("openMenu")}
        >
          <Menu className="h-5 w-5" style={{ color: "var(--ra-ink)" }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col px-6 py-5"
          style={{ backgroundColor: "var(--ra-bg)" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-base">
              root
              <span style={{ color: "var(--ra-ink-muted)" }}>an</span>
              <span className="font-bold" style={{ color: "var(--ra-accent)" }}>roo</span>
            </span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label={t("closeMenu")}>
              <X className="h-6 w-6" style={{ color: "var(--ra-ink)" }} />
            </button>
          </div>

          <div className="mt-12 flex flex-col gap-6">
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                href={NAV_HREFS[key]}
                onClick={() => setMobileOpen(false)}
                className="ra-heading text-4xl"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 pt-10">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
