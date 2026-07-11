import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cpu, Bot, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ease = [0.23, 1, 0.32, 1] as const;

const languages = [
  { name: "Arabic", level: "Native", flag: "🇲🇦" },
  { name: "French", level: "Advanced", flag: "🇫🇷" },
  { name: "English", level: "Advanced", flag: "🇬🇧" },
];

const interests = [
  { title: "Artificial Intelligence", icon: Brain, note: "Reading papers and trying things out" },
  { title: "Machine Learning", icon: Cpu, note: "Models that get better with data" },
  { title: "Robotics", icon: Bot, note: "Hardware that acts on its own" },
  { title: "Emerging Tech", icon: Sparkles, note: "Keeping an eye on what's coming" },
];

const Languages = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-blush/40 py-16 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <SectionHeading title="Beyond the code" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Languages
            </h3>
            <div className="mt-6 space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card/70 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>{lang.flag}</span>
                    <span className="font-display text-lg font-semibold text-plum">{lang.name}</span>
                  </div>
                  <span className="text-sm font-medium text-mauve">{lang.level}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Passions
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {interests.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease }}
                  className="group rounded-2xl border border-border bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="mt-4 font-semibold text-plum">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Languages;
