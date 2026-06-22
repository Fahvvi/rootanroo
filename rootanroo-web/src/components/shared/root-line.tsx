"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The page's signature element. A thin line on the left edge that "grows"
 * as the visitor scrolls — literally a root system mapping the page's own
 * structure. Desktop only (hidden on mobile to avoid competing with content
 * in a single-column layout where there's no room for a side rail).
 *
 * Wrap the whole page body in a ref'd container and pass it as `target`.
 */
export function RootLine({
  containerRef,
  nodeLabels,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  nodeLabels: string[];
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
    <div
      className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen w-px lg:block xl:left-10"
      aria-hidden="true"
    >
      <div className="relative h-full w-px" style={{ backgroundColor: "var(--ra-line)" }}>
        <motion.div
          className="absolute left-0 top-0 w-px origin-top"
          style={{
            height: "100%",
            scaleY,
            backgroundColor: "var(--ra-lime)",
          }}
        />
        {nodeLabels.map((label, i) => {
          const top = `${(i / (nodeLabels.length - 1)) * 100}%`;
          return (
            <div
              key={label}
              className="absolute -left-[3px] flex items-center"
              style={{ top }}
            >
              <span
                className="block h-[7px] w-[7px] rounded-full"
                style={{ backgroundColor: "var(--ra-bg)", border: "1px solid var(--ra-line)" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
