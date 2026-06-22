import { useTranslations } from "next-intl";

export function MarqueeStrip() {
  const t = useTranslations("Home.marquee");
  const items = [t("web"), t("design"), t("photo"), t("video")];
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden border-y py-3.5"
      style={{ borderColor: "var(--ra-line)" }}
      aria-hidden="true"
    >
      <div className="ra-marquee flex w-max gap-10 font-mono text-xs uppercase tracking-widest">
        {loop.map((label, i) => (
          <span key={i} className="flex items-center gap-10" style={{ color: "var(--ra-ink-muted)" }}>
            {label}
            <span style={{ color: "var(--ra-accent)", opacity: 0.6 }}>·</span>
          </span>
        ))}
      </div>
      <style>{`
        .ra-marquee { animation: ra-scroll 30s linear infinite; }
        @keyframes ra-scroll { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @media (prefers-reduced-motion: reduce) { .ra-marquee { animation: none; } }
      `}</style>
    </div>
  );
}
