import { useMemo, type ReactNode } from "react";

interface Sparkle {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const COLORS = ["hsl(340 74% 66%)", "hsl(318 45% 70%)", "hsl(36 70% 72%)"];

function useSparkles(count: number): Sparkle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 3,
        duration: 2.5 + Math.random() * 2,
        color: COLORS[id % COLORS.length],
      })),
    [count],
  );
}

const Star = ({ s }: { s: Sparkle }) => (
  <svg
    aria-hidden
    className="pointer-events-none absolute motion-reduce:hidden"
    style={{
      top: s.top,
      left: s.left,
      width: s.size,
      height: s.size,
      color: s.color,
      animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
    }}
    viewBox="0 0 68 68"
    fill="none"
  >
    <path
      d="M34 0c1.5 18.3 15.7 32.5 34 34-18.3 1.5-32.5 15.7-34 34-1.5-18.3-15.7-32.5-34-34C18.3 32.5 32.5 18.3 34 0Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Renders text with animated sparkle stars scattered around it.
 * A hand-built take on the magicui "Sparkles Text" effect, themed to rose.
 */
export function SparklesText({
  children,
  count = 12,
  className = "",
}: {
  children: ReactNode;
  count?: number;
  className?: string;
}) {
  const sparkles = useSparkles(count);
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className="pointer-events-none absolute inset-0 -m-6 block"
        aria-hidden
      >
        {sparkles.map((s) => (
          <Star key={s.id} s={s} />
        ))}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}

export default SparklesText;
