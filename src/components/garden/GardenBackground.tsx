import { Suspense, lazy, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GardenScene = lazy(() => import("./GardenScene"));

/**
 * Renders the 3D garden only where it makes sense: desktop widths with
 * motion allowed. On phones or with reduced-motion we fall back to a
 * couple of soft CSS blooms so the section still feels magical without
 * spinning up WebGL.
 */
const SoftBlooms = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-rose-soft/50 aura animate-float-slow" />
    <div className="absolute -right-10 bottom-16 h-64 w-64 rounded-full bg-mauve-soft/50 aura animate-drift" />
  </div>
);

const GardenBackground = ({ active, near }: { active: boolean; near: boolean }) => {
  const reduce = useReducedMotion();
  const [wideEnough, setWideEnough] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWideEnough(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Phones + reduced-motion get soft CSS blooms instead of WebGL.
  if (reduce || !wideEnough) return <SoftBlooms />;

  // Only spin up three.js once the section is near the viewport.
  if (!near) return <SoftBlooms />;

  return (
    <Suspense fallback={<SoftBlooms />}>
      <GardenScene active={active} />
    </Suspense>
  );
};

export default GardenBackground;
