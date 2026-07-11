import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

interface Props {
  title: ReactNode;
  eyebrow?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  title,
  eyebrow,
  subtitle,
  align = "center",
  className = "",
}: Props) => {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease }}
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-plum md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed text-muted-foreground ${centered ? "mx-auto max-w-xl" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
