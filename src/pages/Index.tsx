import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import Interests from "@/components/Interests";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Certifications />
      <Languages />
      <Interests />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground border-t border-border/50">
        <p>© 2025 Rim Elrhezzal. Crafted with passion & innovation.</p>
      </footer>
    </motion.div>
  );
};

export default Index;
