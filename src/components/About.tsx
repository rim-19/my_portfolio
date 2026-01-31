import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Users, Target } from "lucide-react";
import profileImage from "@/assets/rim-profile.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { icon: Lightbulb, title: "Problem Solving", color: "lavender" },
    { icon: Users, title: "Leadership", color: "mint" },
    { icon: Target, title: "Adaptability", color: "peach" },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="text-gradient">About Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl" />
                <img
                  src={profileImage}
                  alt="Rim Elrhezzal"
                  className="relative rounded-3xl glass shadow-2xl w-80 h-80 object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg text-foreground leading-relaxed mb-6">
                ⚡ Code is my canvas, and AI is my paintbrush. I'm a software developer who sees every challenge as an opportunity to innovate and every project as a chance to push the boundaries of what's possible.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-8">
                🚀 Currently diving deep into the fascinating intersection of web development and artificial intelligence. I don't just build applications—I create experiences that think, learn, and evolve. Ready to transform bold ideas into elegant, intelligent solutions that make a real impact!
              </p>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className={`glass p-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform duration-300`}
                  >
                    <skill.icon className={`w-6 h-6 text-${skill.color}`} />
                    <span className="font-medium">{skill.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
