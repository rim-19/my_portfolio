import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Globe, Brain, Users } from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Programming",
      icon: Code2,
      skills: [
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "Java", level: 80 },
        { name: "React", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "C#", level: 75 },
        { name: "C", level: 70 },
      ],
      color: "lavender",
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: [
        { name: "Interactive Websites", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Responsive Design", level: 95 },
        { name: "UI/UX", level: 80 },
      ],
      color: "mint",
    },
    {
      title: "AI & Chatbots",
      icon: Brain,
      skills: [
        { name: "NLP APIs", level: 85 },
        { name: "Fine-tuning Models", level: 80 },
        { name: "Automation", level: 88 },
        { name: "Generative AI", level: 85 },
        { name: "Chatbot Design", level: 90 },
      ],
      color: "peach",
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: [
        { name: "Leadership", level: 90 },
        { name: "Teamwork", level: 95 },
        { name: "Creativity", level: 90 },
        { name: "Adaptability", level: 95 },
      ],
      color: "sky",
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
            <span className="text-gradient">Skills & Expertise</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass p-6 rounded-3xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    category.color === 'lavender' ? 'bg-lavender/20' :
                    category.color === 'mint' ? 'bg-mint/20' :
                    category.color === 'peach' ? 'bg-peach/20' :
                    'bg-sky/20'
                  }`}>
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            category.color === 'lavender' ? 'bg-lavender' :
                            category.color === 'mint' ? 'bg-mint' :
                            category.color === 'peach' ? 'bg-peach' :
                            'bg-sky'
                          }`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.05 + 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
