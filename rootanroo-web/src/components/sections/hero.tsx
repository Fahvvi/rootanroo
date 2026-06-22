"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Circle } from "lucide-react";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28 lg:px-10 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-12 lg:gap-6">
        {/* ── Text column ── */}
        <div className="flex flex-col justify-center lg:col-span-7">

          {/* Mode-specific eyebrows */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-6">
            {/* Light mode eyebrow (Kurator): grid reference */}
            <p className="ra-eyebrow block" id="eyebrow-light">
              [ rootanroo /
              <span style={{ color: "var(--ra-accent)" }}> 2025</span>
              &nbsp;/ code · design · photo · video ]
            </p>
            {/* Dark mode eyebrow (Bingkai): film slate */}
            <p className="ra-eyebrow hidden" id="eyebrow-dark">
              <span style={{ color: "var(--ra-accent)" }}>▷</span>
              &nbsp;reel.01 — FA-0001
              <span className="inline-block h-[13px] w-[1px] translate-y-[2px] animate-pulse ml-1.5" style={{ backgroundColor: "var(--ra-accent)" }} aria-hidden="true" />
            </p>
          </motion.div>

          {/* Main headline — ra-display class handles the full font switch */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="ra-display"
          >
            {t.rich("headline", {
              accent: (chunks) => (
                <span style={{ color: "var(--ra-accent)" }}>{chunks}</span>
              ),
              br: () => <br />,
            })}
          </motion.h1>

          {/* Subcopy — ra-pull adds left border in light mode only */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="ra-pull mt-7 max-w-md text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--ra-ink-muted)" }}
          >
            {t("subcopy")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{ backgroundColor: "var(--ra-accent)", color: "var(--ra-bg)" }}
            >
              {t("ctaWork")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-200 hover:border-[var(--ra-accent)] hover:text-[var(--ra-accent)]"
              style={{ borderColor: "var(--ra-line-strong)", color: "var(--ra-ink)" }}
            >
              {t("ctaContact")}
            </Link>
          </motion.div>

          {/* Availability */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="ra-tag mt-10 flex items-center gap-2"
            style={{ color: "var(--ra-ink-muted)" }}
          >
            <Circle className="h-2 w-2 fill-current" style={{ color: "var(--ra-accent)" }} />
            {t("availability")}
          </motion.div>
        </div>

        {/* ── Media column ── */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto aspect-[4/5] w-full max-w-sm"
          >
            {/* Main frame */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--ra-line)" }}
            >
              <PlaceholderMedia
                category="photography"
                label={t("mediaLabelPhoto")}
                className="h-full w-full"
              />

              {/* Dark mode film frame annotation overlay */}
              <div
                className="absolute inset-0 hidden pointer-events-none"
                id="frame-overlay"
              >
                <span
                  className="ra-tag absolute bottom-3 right-3 text-[10px]"
                  style={{ color: "var(--ra-ink-muted)", opacity: 0.6 }}
                >
                  00:00:01 / FA-0001
                </span>
                <span
                  className="absolute left-0 top-0 h-px w-8"
                  style={{ backgroundColor: "var(--ra-accent)", opacity: 0.7 }}
                />
                <span
                  className="absolute bottom-0 right-0 h-px w-8"
                  style={{ backgroundColor: "var(--ra-accent)", opacity: 0.7 }}
                />
              </div>
            </div>

            {/* Offset secondary frame */}
            <div
              className="absolute -bottom-8 -left-8 aspect-video w-44 overflow-hidden rounded-xl border shadow-lg sm:w-52"
              style={{ borderColor: "var(--ra-line)" }}
            >
              <PlaceholderMedia
                category="videography"
                label={t("mediaLabelVideo")}
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="ra-tag absolute bottom-8 left-6 hidden items-center gap-2 lg:left-10 lg:flex"
        style={{ color: "var(--ra-ink-faint)" }}
      >
        <span className="h-8 w-px" style={{ backgroundColor: "var(--ra-line)" }} />
        {t("scrollCue")}
      </motion.div>

      {/* CSS: show/hide mode-specific elements */}
      <style>{`
        #eyebrow-light { display: block; }
        .dark #eyebrow-light { display: none; }
        #eyebrow-dark { display: none; }
        .dark #eyebrow-dark { display: block; }
        #frame-overlay { display: none; }
        .dark #frame-overlay { display: block; }
      `}</style>
    </section>
  );
}
