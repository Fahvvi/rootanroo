"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Mail } from "lucide-react";

export function ContactCta() {
  const t = useTranslations("Home.contactCta");

  return (
    <section id="contact" className="px-6 pb-28 pt-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border px-8 py-16 sm:px-14 sm:py-20"
        style={{ borderColor: "var(--ra-line)", backgroundColor: "var(--ra-bg-elevated)" }}
      >
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="ra-eyebrow mb-4">{t("eyebrow")}</p>
            <h2
              className="ra-heading text-3xl sm:text-5xl"
            >
              {t("heading")}
            </h2>
            <p
              className="mt-5 text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--ra-ink-muted)" }}
            >
              {t("subcopy")}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{ backgroundColor: "var(--ra-accent)", color: "var(--ra-bg)" }}
            >
              {t("ctaForm")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:partnership@rootanroo.com"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors duration-200 hover:border-[var(--ra-accent)] hover:text-[var(--ra-accent)]"
              style={{ borderColor: "var(--ra-line-strong)", color: "var(--ra-ink-muted)" }}
            >
              <Mail className="h-4 w-4" />
              partnership@rootanroo.com
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
