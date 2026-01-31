import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Download, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "../assets/hero-bg.jpg";
import resumePdf from "../assets/Resume-RimElrhezzal.pdf";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Digital rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-purple-600/70"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            {['NLP', 'FINETUNE', 'GPT', 'LLM', 'REACT', 'NODE', 'API', 'AI', 'ML', 'TS'][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
      </div>
      
      {/* Glitch effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.25) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 40%, rgba(167, 139, 250, 0.25) 60%, transparent 80%)',
            'linear-gradient(45deg, transparent 20%, rgba(196, 181, 253, 0.25) 40%, transparent 60%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Pulse rings from center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 border border-purple-300/30 rounded-full"
            animate={{
              scale: [0, 2, 3],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
      
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">Rim Elrhezzal</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ✨ Creative Junior Software Developer & AI Enthusiast 🚀
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            📍 Casablanca, Morocco
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              variant="glass"
              onClick={() => scrollToSection('projects')}
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="neumorphic"
              onClick={() => window.open(resumePdf, '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
