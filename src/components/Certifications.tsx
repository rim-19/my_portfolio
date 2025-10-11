import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = [
    {
      title: "AI for Beginners",
      issuer: "HP Life Online Course",
      date: "February 2025",
      description: "Key concepts of AI, data importance, and ethics in artificial intelligence.",
      icon: Cpu,
      color: "lavender",
    },
    {
      title: "Virtual Assistant Program",
      issuer: "ALX",
      date: "February 2025 – April 2025",
      description: "Training in digital tools, client communication, and social media management.",
      icon: Briefcase,
      color: "mint",
    },
    {
      title: "Generative AI Badge",
      issuer: "IBM",
      date: "March 2025 – April 2025",
      description: "Learned about large language models and real-world AI applications.",
      icon: Award,
      color: "peach",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Certifications</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass h-full hover:shadow-2xl transition-all duration-300 border-0">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      cert.color === 'lavender' ? 'bg-lavender/20' :
                      cert.color === 'mint' ? 'bg-mint/20' :
                      'bg-peach/20'
                    }`}>
                      <cert.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{cert.title}</CardTitle>
                    <CardDescription className="text-sm">{cert.issuer}</CardDescription>
                    <CardDescription className="text-xs text-muted-foreground">{cert.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
