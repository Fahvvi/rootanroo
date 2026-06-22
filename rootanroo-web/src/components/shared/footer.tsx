import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_KEYS = ["work", "services", "photography", "videography", "about", "contact"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  work: "/work", services: "/services", photography: "/photography",
  videography: "/videography", about: "/about", contact: "/contact",
};

export function Footer() {
  const t  = useTranslations("Nav");
  const tf = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t px-6 py-12 lg:px-10" style={{ borderColor: "var(--ra-line)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="font-mono text-base">
            root
            <span style={{ color: "var(--ra-ink-muted)" }}>an</span>
            <span className="font-bold" style={{ color: "var(--ra-accent)" }}>roo</span>
          </span>
          <p
            className="mt-3 max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--ra-ink-muted)" }}
          >
            {tf("tagline")}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <div className="flex flex-col gap-2">
            {NAV_KEYS.map((key) => (
              <Link
                key={key}
                href={NAV_HREFS[key]}
                className="ra-tag transition-colors hover:text-[var(--ra-accent)]"
                style={{ color: "var(--ra-ink-muted)" }}
              >
                {t(key)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:partnership@rootanroo.com"
              className="ra-tag transition-colors hover:text-[var(--ra-accent)]"
              style={{ color: "var(--ra-ink-muted)" }}
            >
              partnership@rootanroo.com
            </a>
            <a
              href="mailto:noreply@rootanroo.com"
              className="ra-tag transition-colors hover:text-[var(--ra-accent)]"
              style={{ color: "var(--ra-ink-faint)" }}
            >
              noreply@rootanroo.com
            </a>
          </div>
        </div>
      </div>

      <div
        className="ra-tag mx-auto mt-12 flex max-w-6xl items-center justify-between border-t pt-6"
        style={{ borderColor: "var(--ra-line)", color: "var(--ra-ink-faint)" }}
      >
        <span>© {year} RootAnRoo</span>
        <span>rootanroo.com</span>
      </div>
    </footer>
  );
}
