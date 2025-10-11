import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Brain } from "lucide-react";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    {
      year: "2023",
      icon: GraduationCap,
      title: "Baccalauréat in Physical Sciences",
      institution: "Lycée Ibno Chouhaid, Casablanca",
      color: "lavender",
    },
    {
      year: "2024–2026",
      icon: Code2,
      title: "BTS in Application Development",
      institution: "Lycée Abderrahmane Ben Ghazala",
      color: "mint",
    },
    {
      year: "2025",
      icon: Brain,
      title: "AI & Tech Projects & Certifications",
      institution: "Self-driven learning & professional development",
      color: "peach",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Education Journey</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className={`glass p-4 rounded-2xl flex-shrink-0 ${
                      item.color === 'lavender' ? 'bg-lavender/20' :
                      item.color === 'mint' ? 'bg-mint/20' :
                      'bg-peach/20'
                    }`}
                  >
                    <item.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="glass p-6 rounded-2xl flex-1 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl font-bold ${
                        item.color === 'lavender' ? 'text-lavender' :
                        item.color === 'mint' ? 'text-mint' :
                        'text-peach'
                      }`}>
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.institution}</p>
                  </div>
                </div>

                {/* Connecting line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
