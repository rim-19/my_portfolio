import { motion } from "framer-motion";
import { Download, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tilt from "@/components/Tilt";
import { SparklesText } from "@/components/SparklesText";
import { Magnetic } from "@/components/Magnetic";
import profileImage from "@/assets/rim-profile.webp";
import resumePdf from "../assets/Resume_RimElrhezzal.pdf";

const ease = [0.23, 1, 0.32, 1] as const;

const Hero = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      {/* Soft feminine auras: decorative, motivated by warmth/depth */}
      <div className="pointer-events-none absolute inset-0 gradient-blush" />
      <div className="aurora-fx pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-24 h-[30rem] w-[30rem] rounded-full bg-rose-soft aura animate-drift" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-mauve-soft aura animate-float-slow" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left: the message */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Software Developer &amp; AI Engineer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-plum md:text-6xl lg:text-7xl"
          >
            <SparklesText count={14}>
              Rim
              <br />
              <span className="italic text-gradient">Elrhezzal</span>
            </SparklesText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            I build full-stack web apps, usually with a sprinkle of AI, and I fuss
            over the tiny details until the whole thing just feels right.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.5}>
              <Button variant="gradient" size="lg" onClick={() => scrollTo("projects")}>
                View my work
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic strength={0.5}>
              <Button variant="outline" size="lg" onClick={() => window.open(resumePdf, "_blank")}>
                <Download className="h-4 w-4" />
                Resume
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-8 flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4 text-primary" />
            Casablanca, Morocco
          </motion.div>
        </div>

        {/* Right: the portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-rose-soft/60 aura" />

          <Tilt max={9} perspective={900} radius="2rem" glare className="relative">
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-rose"
              style={{ transform: "translateZ(0)" }}
            >
              <img
                src={profileImage}
                alt="Rim Elrhezzal"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/25 via-transparent to-transparent" />
            </div>

            {/* Stat card: popped forward in real 3D depth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              style={{ z: 55 }}
              className="glass-strong absolute -bottom-5 -left-5 z-20 rounded-2xl px-5 py-3.5"
            >
              <p className="font-display text-2xl font-semibold text-plum">8</p>
              <p className="text-xs text-muted-foreground">Shipped projects</p>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
