import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Brain } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ease = [0.23, 1, 0.32, 1] as const;

const timeline = [
  {
    year: "2023",
    icon: GraduationCap,
    title: "Baccalauréat in Physical Sciences",
    institution: "Lycée Ibno Chouhaid, Casablanca",
  },
  {
    year: "2024 - 2026",
    icon: Code2,
    title: "BTS in Application Development",
    institution: "Lycée Abderrahmane Ben Ghazala",
  },
  {
    year: "2025",
    icon: Brain,
    title: "AI & Tech Projects & Certifications",
    institution: "Self-driven learning & professional development",
  },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-blush/40 py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-3xl px-6">
        <SectionHeading title="Education journey" />

        <div className="relative mt-16 pl-8">
          {/* The line */}
          <div className="absolute left-[0.4375rem] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-mauve/50 to-transparent" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-blush" />
              </span>

              <div className="rounded-2xl border border-border bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {item.year}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-plum">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">{item.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
