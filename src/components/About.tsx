import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Users, Compass } from "lucide-react";
import profileImage from "@/assets/rim-profile.jpg";

const ease = [0.23, 1, 0.32, 1] as const;

const traits = [
  { icon: Lightbulb, title: "Problem Solving", note: "I like sorting out the unclear parts before any code gets written." },
  { icon: Users, title: "Leadership", note: "Comfortable owning a project from the first sketch to launch." },
  { icon: Compass, title: "Adaptability", note: "Happy anywhere in the stack, front to back." },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="relative mx-auto w-full max-w-xs"
          >
            <div className="absolute -inset-3 rounded-[2.25rem] gradient-rose opacity-20 blur-2xl" />
            <img
              src={profileImage}
              alt="Rim Elrhezzal"
              className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-white/60 object-cover shadow-lg"
            />
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              About
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-plum md:text-5xl">
              Software that works in
              <span className="italic text-gradient"> the real world.</span>
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a software developer based in Casablanca, and most of my
                work sits between web development and AI. I like taking an idea and
                turning it into something people can actually use, not just a demo.
              </p>
              <p>
                I&apos;ve fine-tuned language models, wired up payment flows, and
                built admin dashboards from scratch. Across all of it, I pay
                attention to the parts users never really notice: error states,
                edge cases, and the small things that make an app feel solid.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {traits.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                  className="rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <t.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  <p className="mt-3 font-semibold text-plum">{t.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
