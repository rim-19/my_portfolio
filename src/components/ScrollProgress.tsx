import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A slim vertical progress rail pinned to the right edge, filling as the page
 * scrolls. Driven by useScroll + a spring so it eases rather than snapping.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      aria-hidden
      className="fixed right-5 top-1/2 z-40 hidden h-44 -translate-y-1/2 lg:block"
    >
      <div className="relative h-full w-[3px] overflow-hidden rounded-full bg-primary/12">
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0 rounded-full bg-gradient-to-b from-rose to-mauve"
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
