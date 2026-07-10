import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Globe, Brain, Users } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ease = [0.23, 1, 0.32, 1] as const;

const categories = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C#", "C", "React"],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: ["Node.js", "Interactive UIs", "Responsive Design", "UI / UX", "REST APIs"],
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["NLP APIs", "Fine-tuning (LoRA)", "RAG / FAISS", "Generative AI", "Chatbot Design", "Automation"],
  },
  {
    title: "Working Style",
    icon: Users,
    skills: ["Leadership", "Teamwork", "Creativity", "Adaptability", "Communication"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative overflow-hidden bg-blush/40 py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Skills & toolkit"
          subtitle="The languages, frameworks, and ways of working I reach for."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="rounded-3xl border border-border bg-card/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <category.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-semibold text-plum">{category.title}</h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/15 bg-white/60 px-3.5 py-1.5 text-sm font-medium text-plum/80 transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
