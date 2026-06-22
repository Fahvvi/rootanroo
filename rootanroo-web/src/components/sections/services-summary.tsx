"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Code2, PenTool, Camera, Video, ArrowUpRight } from "lucide-react";

const SERVICES = [
  { key: "web",    icon: Code2,    tag: "web",    span: "lg:col-span-7 lg:row-span-2" },
  { key: "design", icon: PenTool,  tag: "design", span: "lg:col-span-5" },
  { key: "photo",  icon: Camera,   tag: "photo",  span: "lg:col-span-5" },
  { key: "video",  icon: Video,    tag: "video",  span: "lg:col-span-12" },
] as const;

export function ServicesSummary() {
  const t = useTranslations("Home.services");

  return (
    <section id="services" className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="ra-eyebrow mb-3">{t("eyebrow")}</p>
            <h2 className="ra-heading max-w-lg text-3xl sm:text-4xl">{t("heading")}</h2>
          </div>
          <Link
            href="/services"
            className="ra-tag flex items-center gap-1.5 transition-colors hover:text-[var(--ra-ink)]"
            style={{ color: "var(--ra-ink-muted)" }}
          >
            {t("viewAll")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid gap-3 lg:grid-cols-12">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 ${service.span}`}
                style={{
                  borderColor: "var(--ra-line)",
                  backgroundColor: "var(--ra-bg-elevated)",
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <Icon
                    strokeWidth={1.25}
                    className="h-6 w-6 transition-colors duration-200 group-hover:text-[var(--ra-accent)]"
                    style={{ color: "var(--ra-ink-muted)" }}
                  />
                  <span
                    className="ra-tag rounded-full border px-2.5 py-1"
                    style={{ borderColor: "var(--ra-line)", color: "var(--ra-ink-faint)" }}
                  >
                    [{service.tag}]
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="ra-heading text-xl">{t(`${service.key}.title`)}</h3>
                  <p
                    className="mt-2 max-w-sm text-sm leading-relaxed"
                    style={{ color: "var(--ra-ink-muted)" }}
                  >
                    {t(`${service.key}.description`)}
                  </p>
                </div>

                {/* Light mode: blue accent border on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ border: "1px solid var(--ra-accent)" }}
                  id={`service-hover-${service.key}`}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* In dark mode, replace the border-accent hover with a glow effect */}
      <style>{`
        .dark [id^="service-hover-"] {
          border: none;
          background: radial-gradient(400px circle at 50% 50%, var(--ra-accent-soft), transparent 70%);
        }
      `}</style>
    </section>
  );
}
