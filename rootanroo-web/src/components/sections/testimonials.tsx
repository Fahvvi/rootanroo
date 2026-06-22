"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Testimonials() {
  const t = useTranslations("Home.testimonial");

  return (
    <section id="testimonial" className="px-6 py-24 lg:px-10 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        {/* Light mode: editorial left-border treatment */}
        <div
          className="border-l-2 pl-8"
          style={{ borderColor: "var(--ra-accent)" }}
          id="testimonial-light"
        >
          <p className="text-2xl font-medium leading-snug sm:text-3xl" style={{ fontFamily: "var(--ra-display-font)", fontStyle: "var(--ra-display-style)", letterSpacing: "var(--ra-display-tracking)" }}>
            {t("quote")}
          </p>
          <div className="mt-6">
            <p className="text-sm font-medium">{t("author")}</p>
            <p className="ra-tag mt-1" style={{ color: "var(--ra-ink-muted)" }}>{t("role")}</p>
          </div>
        </div>

        {/* Dark mode: cinematic center treatment */}
        <div className="hidden text-center" id="testimonial-dark">
          <span
            className="mb-6 block font-mono text-6xl leading-none"
            style={{ color: "var(--ra-accent)" }}
            aria-hidden="true"
          >
            ▷
          </span>
          <p className="text-2xl leading-snug sm:text-3xl" style={{ fontFamily: "var(--ra-display-font)", fontStyle: "var(--ra-display-style)" }}>
            {t("quote")}
          </p>
          <div className="mt-8">
            <p className="text-sm font-medium">{t("author")}</p>
            <p className="ra-tag mt-1" style={{ color: "var(--ra-ink-muted)" }}>{t("role")}</p>
          </div>
        </div>
      </motion.div>

      <style>{`
        #testimonial-light { display: block; }
        .dark #testimonial-light { display: none; }
        #testimonial-dark { display: none; }
        .dark #testimonial-dark { display: block; }
      `}</style>
    </section>
  );
}
