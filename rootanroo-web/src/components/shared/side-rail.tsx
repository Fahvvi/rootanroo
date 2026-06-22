"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const FRAMES = ["01", "02", "03", "04", "05"];

/**
 * Two different fixed side elements, CSS-toggled per mode:
 *
 * Light (Kurator) — LEFT RAIL
 *   A thin hairline column guide with tick marks at section boundaries.
 *   Purely structural, very quiet — the grid is the design.
 *   The filled bar grows with scroll as a subtle reading indicator.
 *
 * Dark (Bingkai) — RIGHT FILM COUNTER
 *   Frame numbers running down the right edge, styled like a film strip.
 *   A scan-line indicator (the lime-ish accent) moves as you scroll.
 *   Referencing the actual craft — photo and video work.
 */
export function SideRail({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  return (
    <>
      {/* ── LIGHT MODE: Left grid rail ─────────────────────────── */}
      <div
        className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen xl:left-10"
        style={{
          display: "none",
          width: "1px",
        }}
        id="light-rail"
        aria-hidden="true"
      >
        {/* Track */}
        <div className="relative h-full w-px" style={{ backgroundColor: "var(--ra-line)" }}>
          {/* Fill bar */}
          <motion.div
            className="absolute left-0 top-0 w-px origin-top"
            style={{ height: "100%", scaleY, backgroundColor: "var(--ra-accent)" }}
          />
          {/* Tick marks */}
          {FRAMES.map((_, i) => (
            <div
              key={i}
              className="absolute -left-[3px] flex items-center"
              style={{ top: `${(i / (FRAMES.length - 1)) * 100}%` }}
            >
              <span
                className="block h-[6px] w-[6px] rounded-full"
                style={{ backgroundColor: "var(--ra-bg)", border: "1px solid var(--ra-line-strong)" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── DARK MODE: Right film counter ──────────────────────── */}
      <div
        className="pointer-events-none fixed right-6 top-0 z-40 hidden h-screen xl:right-10"
        id="dark-rail"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="relative flex h-full flex-col items-center justify-between py-[10vh]">
          {/* Film strip edge lines */}
          <div
            className="absolute inset-y-0 left-[7px] w-px"
            style={{ backgroundColor: "var(--ra-line)" }}
          />

          {/* Frame numbers */}
          {FRAMES.map((frame, i) => {
            const pct = i / (FRAMES.length - 1);
            return (
              <div key={frame} className="relative flex items-center gap-2" style={{ position: "absolute", top: `calc(10vh + ${pct * 80}vh)`, transform: "translateY(-50%)" }}>
                <span
                  className="block h-[5px] w-[5px]"
                  style={{ backgroundColor: "var(--ra-line-strong)" }}
                />
                <span
                  className="ra-tag text-[10px]"
                  style={{ color: "var(--ra-ink-faint)", writingMode: "vertical-rl" }}
                >
                  #{frame}
                </span>
              </div>
            );
          })}

          {/* Scan-line indicator */}
          <motion.div
            className="absolute left-0 h-6 w-[1px]"
            style={{
              top: scaleY,
              backgroundColor: "var(--ra-accent)",
              boxShadow: "0 0 6px var(--ra-accent)",
            }}
          />
        </div>
      </div>

      {/* CSS toggle: show the right rail per mode */}
      <style>{`
        #light-rail { display: block; }
        .dark #light-rail { display: none; }
        #dark-rail { display: none; }
        .dark #dark-rail { display: block; }
        @media (max-width: 1023px) {
          #light-rail, #dark-rail { display: none !important; }
        }
      `}</style>
    </>
  );
}
