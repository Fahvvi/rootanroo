"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

// TODO: replace with fetch to GET /api/v1/projects?featured=true&locale=
// per system-design.md §7 once the Laravel API is live.
const FEATURED_PROJECTS = [
  { slug: "xinyao-platform",      category: "web_development" as const, status: "in_progress" as const },
  { slug: "client-brand-identity",category: "graphic_design"  as const, status: "completed"   as const },
  { slug: "wedding-story-vol-3",  category: "photography"     as const, status: "completed"   as const },
  { slug: "product-launch-reel",  category: "videography"     as const, status: "completed"   as const },
];

export function FeaturedWork() {
  const t       = useTranslations("Home.work");
  const tCat    = useTranslations("Categories");
  const tStatus = useTranslations("Status");

  return (
    <section id="work" className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="ra-eyebrow mb-3">{t("eyebrow")}</p>
            <h2 className="ra-heading max-w-lg text-3xl sm:text-4xl">{t("heading")}</h2>
          </div>
          <Link
            href="/work"
            className="ra-tag flex items-center gap-1.5 transition-colors hover:text-[var(--ra-ink)]"
            style={{ color: "var(--ra-ink-muted)" }}
          >
            {t("viewAll")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                {/* Thumbnail */}
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
                  style={{ borderColor: "var(--ra-line)" }}
                >
                  <PlaceholderMedia
                    category={project.category}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Status badge */}
                  <span
                    className="ra-tag absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[11px]"
                    style={{
                      borderColor: "var(--ra-line)",
                      backgroundColor: "var(--ra-bg)",
                      color: project.status === "in_progress" ? "var(--ra-accent)" : "var(--ra-ink-muted)",
                    }}
                  >
                    {tStatus(project.status)}
                  </span>

                  {/* Dark mode: frame number badge */}
                  <span
                    className="ra-tag absolute right-3 top-3 text-[10px]"
                    id={`frame-num-${project.slug}`}
                    style={{ color: "var(--ra-ink-faint)", opacity: 0 }}
                  >
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="ra-tag" style={{ color: "var(--ra-ink-muted)" }}>
                      {tCat(project.category)}
                    </p>
                    <h3
                      className="mt-1 text-lg font-medium transition-colors duration-200 group-hover:text-[var(--ra-accent)]"
                      style={{ fontFamily: "var(--ra-display-font)", fontStyle: "var(--ra-display-style)" }}
                    >
                      {t(`items.${project.slug}.title`)}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className="mt-1.5 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: "var(--ra-ink-muted)" }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dark mode shows frame number badges */}
      <style>{`
        [id^="frame-num-"] { opacity: 0; }
        .dark [id^="frame-num-"] { opacity: 1; }
      `}</style>
    </section>
  );
}
