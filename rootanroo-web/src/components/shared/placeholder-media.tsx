import { cn } from "@/lib/utils";
import { Code2, PenTool, Camera, Video, type LucideIcon } from "lucide-react";

type Category = "web_development" | "graphic_design" | "photography" | "videography";

const ICONS: Record<Category, LucideIcon> = {
  web_development: Code2,
  graphic_design: PenTool,
  photography: Camera,
  videography: Video,
};

/**
 * Abstract placeholder — deliberately non-photographic so it doesn't
 * pretend to represent finished work. Swap for next/image once real
 * assets exist. Uses ra-* tokens so it adapts to both modes.
 */
export function PlaceholderMedia({
  category,
  className,
  label,
}: {
  category: Category;
  className?: string;
  label?: string;
}) {
  const Icon = ICONS[category];

  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      style={{
        backgroundColor: "var(--ra-bg-elevated)",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--ra-line) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <Icon strokeWidth={1} className="h-8 w-8 opacity-25" style={{ color: "var(--ra-ink-muted)" }} />
      {label && (
        <span
          className="ra-tag absolute bottom-3 left-3 opacity-40"
          style={{ color: "var(--ra-ink-muted)" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
