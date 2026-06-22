"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";

const LABELS: Record<string, string> = { en: "EN", zh: "中文", id: "ID" };

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ra-tag flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200 hover:border-[var(--ra-accent)]"
        style={{ borderColor: "var(--ra-line)", color: "var(--ra-ink-muted)" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LABELS[locale]}
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-24 overflow-hidden rounded-xl border"
          style={{ backgroundColor: "var(--ra-bg-elevated)", borderColor: "var(--ra-line)" }}
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className="ra-tag block w-full px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[var(--ra-accent-soft)]"
                style={{ color: l === locale ? "var(--ra-accent)" : "var(--ra-ink-muted)" }}
              >
                {LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
