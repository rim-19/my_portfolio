import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <motion.div
      className="min-h-screen overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
        <Languages />
        <Contact />
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <p className="font-display text-lg font-semibold text-plum">
            Rim<span className="text-primary">.</span>
          </p>
          <p>© {new Date().getFullYear()} Rim Elrhezzal. Designed and coded by me, in Casablanca.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;
