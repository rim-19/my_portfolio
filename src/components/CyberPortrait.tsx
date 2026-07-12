import { useEffect, useRef } from "react";
import baseImg from "@/assets/rim-profile.webp";
import cyberImg from "@/assets/rim-cyber2.webp";

/**
 * Cursor-paint reveal. The base photo is always shown; the cyber-kawaii
 * illustration is painted in only along the path the cursor brushes,
 * with soft feathered edges. The trail slowly fades, so it wipes away
 * when the cursor leaves. Canvas alpha-mask driven by requestAnimationFrame.
 */
const CyberPortrait = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // base photo only

    const ctx = cv.getContext("2d");
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");
    if (!ctx || !mctx) return;

    const cyber = new Image();
    cyber.src = cyberImg;

    let WD = 0;
    let HD = 0;
    let DPR = 1;
    let raf = 0;
    let running = false;

    let px = -1;
    let py = -1;
    let lx = -1;
    let ly = -1;
    let active = false;
    let idle = 0;

    const resize = () => {
      const r = el.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      WD = Math.round(r.width * DPR);
      HD = Math.round(r.height * DPR);
      cv.width = WD;
      cv.height = HD;
      mask.width = WD;
      mask.height = HD;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const coverRect = () => {
      const ir = cyber.width / cyber.height;
      const cr = WD / HD;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dh = HD;
        dw = HD * ir;
      } else {
        dw = WD;
        dh = WD / ir;
      }
      return { dx: (WD - dw) / 2, dy: (HD - dh) / 2, dw, dh };
    };

    const stamp = (x: number, y: number) => {
      const rad = 47 * DPR;
      const g = mctx.createRadialGradient(x, y, 0, x, y, rad);
      // opaque core for a clear reveal, feathered only at the rim
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.82, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(x, y, rad, 0, Math.PI * 2);
      mctx.fill();
    };

    const stampSegment = (x0: number, y0: number, x1: number, y1: number) => {
      const d = Math.hypot(x1 - x0, y1 - y0);
      const steps = Math.max(1, Math.floor(d / (12 * DPR)));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        stamp(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
      }
    };

    const frame = () => {
      // gently fade the whole mask so the trail wipes away over time
      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = "rgba(0,0,0,0.022)";
      mctx.fillRect(0, 0, WD, HD);
      mctx.globalCompositeOperation = "source-over";

      if (active && px >= 0) {
        if (lx < 0) {
          lx = px;
          ly = py;
        }
        // ease the paint point toward the cursor for a smooth trail
        const nx = lx + (px - lx) * 0.28;
        const ny = ly + (py - ly) * 0.28;
        stampSegment(lx, ly, nx, ny);
        lx = nx;
        ly = ny;
        idle = 0;
      } else {
        idle += 1;
      }

      // composite: draw cyber, keep only where the mask is painted
      ctx.clearRect(0, 0, WD, HD);
      if (cyber.complete && cyber.naturalWidth) {
        const { dx, dy, dw, dh } = coverRect();
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(cyber, dx, dy, dw, dh);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      }

      if (!active && idle > 200) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) * DPR;
      py = (e.clientY - r.top) * DPR;
      active = true;
      kick();
    };
    const onLeave = () => {
      active = false;
      lx = -1;
      ly = -1;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]"
      style={{ touchAction: "pan-y" }}
    >
      <img
        src={baseImg}
        alt="Rim Elrhezzal"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default CyberPortrait;
