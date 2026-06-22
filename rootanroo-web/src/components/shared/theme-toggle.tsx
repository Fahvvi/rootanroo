"use client";

import { useTheme } from "./theme-provider";

/**
 * The toggle shows what you'll switch INTO, not what you're currently on.
 * Light mode: shows "Bingkai ☾" (dark) — clicking enters cinematic mode.
 * Dark mode:  shows "Kurator ☀" (light) — clicking enters swiss editorial mode.
 *
 * This makes the label useful (tells you what's next) instead of just
 * being a state indicator.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { toggle, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to Kurator light mode" : "Switch to Bingkai dark mode"}
      className="group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200 hover:border-[var(--ra-accent)]"
      style={{
        borderColor: "var(--ra-line)",
        color: "var(--ra-ink-muted)",
        backgroundColor: "transparent",
      }}
    >
      <span
        className="font-mono text-xs tracking-wider transition-colors duration-200 group-hover:text-[var(--ra-accent)]"
        aria-hidden="true"
      >
        {isDark ? "☀" : "☾"}
      </span>
      {!compact && (
        <span
          className="font-mono text-xs tracking-wider transition-colors duration-200 group-hover:text-[var(--ra-accent)]"
        >
          {isDark ? "kurator" : "bingkai"}
        </span>
      )}
    </button>
  );
}
