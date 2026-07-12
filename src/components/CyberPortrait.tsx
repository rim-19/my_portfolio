import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import baseImg from "@/assets/rim-profile.webp";
import cyberImg from "@/assets/rim-cyber.webp";

/**
 * The hero portrait "awakens" into a cyber-kawaii version on hover:
 * the photo cross-dissolves into the illustration while it lifts, scales,
 * de-blurs, blooms a pink glow, and releases sparkles + hearts. A soft
 * pink light trails the cursor. All GSAP, honors reduced motion, and
 * falls back to tap-to-toggle on touch.
 */
const CyberPortrait = () => {
  const root = useRef<HTMLDivElement>(null);
  const base = useRef<HTMLImageElement>(null);
  const cyber = useRef<HTMLImageElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const particles = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  const [canHover, setCanHover] = useState(true);
  const [on, setOn] = useState(false);

  // stable random particles (sparkles + hearts)
  const bits = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        heart: i % 3 === 0,
        top: 8 + Math.random() * 84,
        left: 6 + Math.random() * 88,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 0.25,
        drift: 10 + Math.random() * 20,
      })),
    [],
  );

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const t = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      if (reduce) {
        // gentle crossfade only
        t.to(base.current, { autoAlpha: 0, duration: 0.4 }, 0).to(cyber.current, { autoAlpha: 1, duration: 0.4 }, 0);
      } else {
        t.to(base.current, { autoAlpha: 0, filter: "blur(7px)", scale: 1.04, duration: 0.7 }, 0)
          .fromTo(
            cyber.current,
            { autoAlpha: 0, filter: "blur(12px)", scale: 1.06 },
            { autoAlpha: 1, filter: "blur(0px)", scale: 1.03, duration: 0.78 },
            0,
          )
          .to(root.current, { y: -6, duration: 0.7 }, 0)
          .to(glow.current, { autoAlpha: 1, duration: 0.6 }, 0)
          .to(
            particles.current ? particles.current.children : [],
            { autoAlpha: 1, y: (i) => -(bits[i]?.drift ?? 14), scale: 1, duration: 0.8, stagger: 0.035 },
            0.08,
          );
      }
      tl.current = t;

      xTo.current = gsap.quickTo(light.current, "x", { duration: 0.45, ease: "power2.out" });
      yTo.current = gsap.quickTo(light.current, "y", { duration: 0.45, ease: "power2.out" });
    }, root);

    return () => ctx.revert();
  }, [bits]);

  const play = () => {
    setOn(true);
    tl.current?.play();
    gsap.to(light.current, { autoAlpha: 0.85, duration: 0.4 });
  };
  const reverse = () => {
    setOn(false);
    tl.current?.reverse();
    gsap.to(light.current, { autoAlpha: 0, duration: 0.4 });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!root.current || e.pointerType !== "mouse") return;
    const r = root.current.getBoundingClientRect();
    xTo.current?.(e.clientX - r.left - 150);
    yTo.current?.(e.clientY - r.top - 150);
  };

  return (
    <div
      ref={root}
      onPointerEnter={canHover ? play : undefined}
      onPointerLeave={canHover ? reverse : undefined}
      onPointerMove={onMove}
      onClick={!canHover ? () => (on ? reverse() : play()) : undefined}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/60 shadow-rose"
    >
      <img
        ref={base}
        src={baseImg}
        alt="Rim Elrhezzal"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <img
        ref={cyber}
        src={cyberImg}
        alt="Rim Elrhezzal, cyber-kawaii illustration"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-0 will-change-transform"
      />

      {/* base gradient for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/25 via-transparent to-transparent" />

      {/* pink bloom (fades in) */}
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, hsl(340 90% 72% / 0.55), transparent 70%)",
          boxShadow: "inset 0 0 60px hsl(340 90% 72% / 0.4)",
        }}
      />

      {/* cursor-follow light */}
      <div
        ref={light}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] opacity-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, hsl(335 95% 72% / 0.55), transparent 62%)",
        }}
      />

      {/* sparkles + hearts */}
      <div ref={particles} aria-hidden className="pointer-events-none absolute inset-0">
        {bits.map((b) => (
          <svg
            key={b.id}
            className="absolute opacity-0"
            style={{ top: `${b.top}%`, left: `${b.left}%`, width: b.size, height: b.size }}
            viewBox="0 0 68 68"
            fill="none"
          >
            {b.heart ? (
              <path
                d="M34 62C18 50 6 40 6 26 6 16 14 10 22 10c6 0 10 3 12 7 2-4 6-7 12-7 8 0 16 6 16 16 0 14-12 24-28 36Z"
                fill="hsl(340 90% 74%)"
              />
            ) : (
              <path
                d="M34 0c1.5 18.3 15.7 32.5 34 34-18.3 1.5-32.5 15.7-34 34-1.5-18.3-15.7-32.5-34-34C18.3 32.5 32.5 18.3 34 0Z"
                fill="hsl(345 100% 82%)"
              />
            )}
          </svg>
        ))}
      </div>
    </div>
  );
};

export default CyberPortrait;
