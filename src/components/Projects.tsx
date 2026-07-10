import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, ShoppingBag, FileText, ArrowUpRight, Globe, Database, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";

const ease = [0.23, 1, 0.32, 1] as const;

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: any;
  tags: string[];
  details: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 7,
    title: "ResumeIQ: AI Resume Analyzer",
    description:
      "A modern, stateless AI application that analyzes, scores, and optimizes professional resumes against modern ATS systems.",
    date: "May 2026",
    icon: FileText,
    tags: ["Next.js 15", "TypeScript", "Gemini 2.5-Flash", "Recharts", "Stateless"],
    details:
      "ResumeIQ is a modern, stateless AI application built to analyze, score, and optimize professional resumes. It bridges the gap between raw candidate data and modern Applicant Tracking Systems (ATS). The project utilizes a zero-storage architecture, meaning it functions without a persistent database connection. It calculates a deterministic ATS Score based on Skills (40%), Keywords (25%), Experience (20%), and Formatting (15%), while dynamically estimating years of experience and intelligently parsing document sections. Using an 'Executive Recruiter' persona, the AI engine provides actionable marketability evaluation, evidence-based strengths and weaknesses, and rewrites experience bullets using the Google XYZ formula. The system handles file parsing for PDFs and DOCXs and generates refined cover letters, all while retaining data only in the client-side memory.",
    link: "https://resume-analyzer-six-gold.vercel.app/",
  },
  {
    id: 1,
    title: "HR-Genius AI Platform",
    description:
      "A full-stack AI-powered HR automation platform with a conversational interface and role-based access control.",
    date: "January 2026",
    icon: Users,
    tags: ["React", "Node.js", "TypeScript", "LangChain", "PostgreSQL", "JWT"],
    details:
      "HR-Genius is a full-stack AI-powered HR automation platform that enables HR teams to manage employees and generate documents through a conversational chat interface. The frontend, built with React, provides a role-aware experience where available actions adapt dynamically based on user roles (HR, Manager, Employee). The backend, developed with Node.js, Express, and TypeScript, follows a strict Planner-Executor architecture, using LangChain with Google Gemini exclusively for intent extraction and natural language generation, while all business rules and permissions are enforced deterministically server-side. The system implements JWT authentication with role-based access control, ensuring that only authorized actions are executed. Data is persisted in PostgreSQL via Prisma, including employee records, generated documents, action logs, and backend conversational memory for contextual references such as 'him' or 'that document.' HR documents are dynamically generated as PDFs and automatically delivered via n8n workflows using SMTP, with explainable AI responses generated strictly from verified backend results to ensure accuracy and auditability. AI decides what to do, the backend decides how to do it safely.",
  },
  {
    id: 2,
    title: "MultiMind AI Platform",
    description:
      "A full-stack intelligent web assistant integrating multiple AI domains into a single modular platform.",
    date: "February 2025",
    icon: MessageSquare,
    tags: ["Node.js", "Express", "MySQL", "Gemini API", "JavaScript"],
    details:
      "MultiMind AI is a full-stack intelligent web assistant that integrates multiple AI domains (business, IT, education, health, languages, personal assistance) into a single modular platform. It was built using HTML/CSS/JavaScript for the frontend, Node.js (Express) for the backend, MySQL for persistent chat storage, and the Gemini API for contextual AI responses. The system supports domain-based agents with custom prompts and separate conversation memory, secure user authentication, and REST endpoints for message processing and history retrieval. The interface includes dynamic chat rendering, domain navigation, and real-time response indicators. The project demonstrates AI API integration, multi-agent architecture, and stateful conversation management in a scalable web system.",
  },
  {
    id: 3,
    title: "Ghazala AI Exam Generator",
    description:
      "An educational AI assistant based on a fine-tuned LLaMA 3-8B model for exam generation and academic Q&A.",
    date: "July 2025 - August 2025",
    icon: FileText,
    tags: ["LLaMA 3", "LoRA", "FAISS", "Hugging Face", "Gradio"],
    details:
      "Ghazala AI is an educational AI assistant based on a fine-tuned LLaMA 3-8B model adapted using LoRA on Google Colab Pro (A100 GPU). It implements a full NLP pipeline: document cleaning, chunking, embeddings generation, and semantic indexing with FAISS for retrieval-augmented generation. Relevant document chunks are injected into prompts to improve answer accuracy and reduce hallucinations. The system uses Hugging Face Transformers, PEFT, and a Gradio interface for interaction, enabling exam generation and academic Q&A. This project highlights applied LLM fine-tuning, vector search, and domain-specific AI system design.",
  },
  {
    id: 4,
    title: "Aurelle Luxury Jewelry",
    description:
      "A refined luxury jewelry brand website concept with elegant editorial layouts and a premium digital experience.",
    date: "January 2026",
    icon: ShoppingBag,
    tags: ["React", "Framer Motion", "Editorial Layout", "Responsive"],
    details:
      "Aurelle is a refined luxury jewelry brand website concept designed as a high-end digital experience. The project blends elegant editorial layouts, emotional storytelling, and smooth interactions to present jewelry as art rather than simple products. It focuses on modern visual direction, premium aesthetics, and responsive design to reflect the standards of global luxury fashion brands. The design features sophisticated typography, carefully curated imagery, subtle animations, and an intuitive user journey that enhances the luxury shopping experience. This project demonstrates expertise in luxury e-commerce design, editorial web development, and creating premium digital experiences that match brand prestige.",
    link: "https://aurelle-five.vercel.app",
  },
  {
    id: 5,
    title: "ClayWhimsy E-commerce",
    description:
      "A premium artistic e-commerce platform showcasing handmade clay art, lamps, and decorative pieces.",
    date: "March 2025",
    icon: ShoppingBag,
    tags: ["React", "TailwindCSS", "Commerce", "UI/UX"],
    details:
      "ClayWhimsy is a sophisticated e-commerce platform designed to showcase and sell handmade clay art including lamps, decorations, and candles. Built with a focus on aesthetic appeal and user experience, the platform features a product gallery with high-quality imagery, advanced filtering capabilities, secure shopping cart functionality, and seamless checkout process. The design emphasizes the artistic nature of the products with custom layouts, smooth animations, and a color palette that complements the handmade clay items. The site includes inventory management, order tracking, and responsive design ensuring perfect viewing across all devices. This project demonstrates full-stack e-commerce development with attention to both visual design and commercial functionality.",
    link: "https://claywhimsy.vercel.app",
  },
  {
    id: 6,
    title: "Stock Management System",
    description:
      "A Windows desktop application for Provincial Directorate stock operations with multi-user network capabilities.",
    date: "January 2026",
    icon: Database,
    tags: ["Python", "PyQt5", "SQLite", "Excel Integration"],
    details:
      "This Windows desktop stock management application is developed for a Provincial Directorate to modernize and centralize stock operations. Built with Python (PyQt5) and using a shared SQLite (.db) database on a local network, it allows multiple workstations to work with the same synchronized data in an offline environment. The system manages stock entries through Excel imports, stock outputs via automatically generated official discharge documents, and provides real-time stock tracking with alerts. It also includes modules for articles, beneficiaries, history, and reports, along with user authentication and full traceability, ensuring reliability and compliance with public administration practices.",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Things I've built"
          subtitle="A mix of applied AI, full-stack platforms, and interfaces I care about."
          align="left"
        />

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mt-12"
        >
          <Tilt max={4} perspective={1400} radius="1.5rem" glare className="w-full">
            <button
              onClick={() => setSelected(featured)}
              className="group grid w-full gap-8 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-card via-card to-blush/50 p-8 text-left shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-[1fr_1.4fr] md:p-10"
            >
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Featured
            </span>
            <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-rose text-white shadow-rose">
              <featured.icon className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold text-plum md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{featured.date}</p>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-muted-foreground">{featured.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              View case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
            </button>
          </Tilt>
        </motion.div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
            >
              <Tilt max={8} perspective={900} radius="1.5rem" glare className="h-full">
                <button
                  onClick={() => setSelected(project)}
                  className="group flex h-full w-full flex-col rounded-3xl border border-border bg-card/70 p-7 text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-lg"
                >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <project.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-plum">{project.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{project.date}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[0.7rem] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
                </button>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="glass-strong mx-auto max-h-[90vh] w-[95vw] max-w-3xl overflow-y-auto rounded-3xl border-border">
          <DialogHeader className="pb-2 text-left">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl gradient-rose text-white">
              {selected?.icon && <selected.icon className="h-6 w-6" strokeWidth={1.75} />}
            </div>
            <DialogTitle className="font-display text-2xl font-semibold text-plum md:text-3xl">
              {selected?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {selected?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-[0.95rem] leading-relaxed text-foreground">{selected?.details}</p>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {selected?.link && (
              <Button asChild variant="gradient" className="w-full">
                <a href={selected.link} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Visit live site
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
