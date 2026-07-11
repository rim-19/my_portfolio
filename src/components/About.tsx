import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Users, Compass } from "lucide-react";
import profileImage from "@/assets/rim-profile.webp";

const ease = [0.23, 1, 0.32, 1] as const;

const traits = [
  { icon: Lightbulb, title: "Problem Solving", note: "I like sorting out the unclear parts before any code gets written." },
  { icon: Users, title: "Leadership", note: "Comfortable owning a project from the first sketch to launch." },
  { icon: Compass, title: "Adaptability", note: "Happy anywhere in the stack, front to back." },
];

const bio = [
  "I'm a software developer based in Casablanca, building at the intersection of web development and AI. I love taking ideas from the first sketch to products that people can genuinely enjoy using: clean, thoughtful, and built with purpose.",
  "Over the past few years, I've developed AI-powered platforms, fine-tuned language models, built intelligent chatbots, integrated secure payments with Stripe, and created full-stack applications with custom admin dashboards. Whether it's an AI exam generator, an HR automation platform, or an e-commerce experience, I enjoy transforming complex ideas into simple, intuitive solutions.",
  "I'm naturally detail-oriented, which means I care just as much about the little things as the big ones. From graceful error handling and edge cases to smooth interactions and polished interfaces, I believe those invisible details are what make software feel reliable and effortless.",
  "For me, great development is a blend of creativity, problem-solving, and empathy. I enjoy learning new technologies, experimenting with AI, and building products that are not only functional but genuinely delightful to use.",
];

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
};

const Words = ({ text, className = "" }: { text: string; className?: string }) => (
  <>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        variants={wordVariant}
        className={`inline-block ${className}`}
        style={{ marginRight: "0.25em" }}
      >
        {word}
      </motion.span>
    ))}
  </>
);

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-14 md:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Portrait — sticks while the story scrolls past */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="relative mx-auto w-full max-w-sm md:sticky md:top-28 lg:max-w-md"
          >
            {/* Ambient rotating aura — keeps moving while you read */}
            <div className="pointer-events-none absolute -inset-5 rounded-[2.75rem] opacity-30 blur-2xl [background:conic-gradient(from_0deg,hsl(var(--rose)),hsl(var(--mauve)),hsl(var(--champagne)),hsl(var(--rose)))] motion-safe:animate-[spin_16s_linear_infinite]" />
            <img
              src={profileImage}
              alt="Rim Elrhezzal"
              className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-white/60 object-cover shadow-lg"
            />
            {/* Floating twinkles */}
            {[
              { top: "-5%", left: "-4%", size: 22, delay: "0s", color: "hsl(var(--rose))" },
              { top: "72%", left: "-7%", size: 15, delay: "1.1s", color: "hsl(var(--champagne))" },
              { top: "10%", left: "95%", size: 18, delay: "0.6s", color: "hsl(var(--mauve))" },
              { top: "88%", left: "88%", size: 13, delay: "1.7s", color: "hsl(var(--rose))" },
            ].map((s, i) => (
              <svg
                key={i}
                aria-hidden
                className="kitty-sparkle pointer-events-none absolute z-10"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size, color: s.color, animationDelay: s.delay }}
                viewBox="0 0 68 68"
                fill="none"
              >
                <path
                  d="M34 0c1.5 18.3 15.7 32.5 34 34-18.3 1.5-32.5 15.7-34 34-1.5-18.3-15.7-32.5-34-34C18.3 32.5 32.5 18.3 34 0Z"
                  fill="currentColor"
                />
              </svg>
            ))}
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
            <motion.h2
              variants={headingContainer}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              aria-label="Software that works in the real world."
              className="mt-3 font-display text-4xl font-semibold tracking-tight text-plum md:text-5xl"
            >
              <Words text="Software that works in" />
              <Words text="the real world." className="italic text-gradient" />
            </motion.h2>

            <div className="mt-6 space-y-4 text-[0.9rem] leading-relaxed text-muted-foreground md:text-[0.95rem]">
              {bio.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease }}
                >
                  {para}
                </motion.p>
              ))}
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
