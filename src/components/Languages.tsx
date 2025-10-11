import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Languages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const languages = [
    { name: "Arabic", level: "Native", flag: "🇲🇦", color: "lavender" },
    { name: "English", level: "Advanced", flag: "🇬🇧", color: "mint" },
    { name: "French", level: "Fluent", flag: "🇫🇷", color: "peach" },
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
            <span className="text-gradient">Languages</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="glass p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {lang.flag}
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{lang.name}</h3>
                <p className={`text-lg font-medium ${
                  lang.color === 'lavender' ? 'text-lavender' :
                  lang.color === 'mint' ? 'text-mint' :
                  'text-peach'
                }`}>
                  {lang.level}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Languages;
