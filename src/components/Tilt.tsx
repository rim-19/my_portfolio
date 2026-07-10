import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees along each axis. */
  max?: number;
  /** Perspective distance in px (larger = subtler). */
  perspective?: number;
  /** Border radius used for the sheen overlay, e.g. "2rem". */
  radius?: string;
  /** Show a cursor-tracking sheen. */
  glare?: boolean;
}

const spring = { stiffness: 150, damping: 18, mass: 0.5 };

/**
 * Cursor-tracked 3D tilt. Motion values are driven imperatively (outside the
 * React render cycle) and smoothed with springs, so it stays at 60fps and never
 * re-renders on pointer move. Mouse-only; collapses to static under reduced motion.
 */
export function Tilt({
  children,
  className = "",
  max = 8,
  perspective = 1000,
  radius = "1.5rem",
  glare = false,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const srx = useSpring(rx, spring);
  const sry = useSpring(ry, spring);
  const sgx = useSpring(gx, spring);
  const sgy = useSpring(gy, spring);

  const glareBg = useTransform(
    [sgx, sgy],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, hsl(0 0% 100% / 0.28), transparent 55%)`,
  );

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ perspective }}
      className={className}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg, borderRadius: radius }}
            className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light"
          />
        )}
      </motion.div>
    </div>
  );
}

export default Tilt;
