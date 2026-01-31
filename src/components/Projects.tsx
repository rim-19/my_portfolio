import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, ShoppingBag, FileText, ExternalLink, Globe, Database, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: any;
  tags: string[];
  details: string;
  color: string;
  link?: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "HR-Genius AI Platform",
      description: "A full-stack AI-powered HR automation platform with conversational interface and role-based access control.",
      date: "December 2025 - Present",
      icon: Users,
      tags: ["React", "Node.js", "TypeScript", "LangChain", "PostgreSQL", "JWT", "AI"],
      details: "HR-Genius is a full-stack AI-powered HR automation platform that enables HR teams to manage employees and generate documents through a conversational chat interface. The frontend, built with React, provides a role-aware experience where available actions adapt dynamically based on user roles (HR, Manager, Employee). The backend, developed with Node.js, Express, and TypeScript, follows a strict Planner–Executor architecture, using LangChain with Google Gemini exclusively for intent extraction and natural language generation, while all business rules and permissions are enforced deterministically server-side. The system implements JWT authentication with role-based access control, ensuring that only authorized actions are executed. Data is persisted in PostgreSQL via Prisma, including employee records, generated documents, action logs, and backend conversational memory for contextual references such as 'him' or 'that document.' HR documents are dynamically generated as PDFs and automatically delivered via n8n workflows using SMTP, with explainable AI responses generated strictly from verified backend results to ensure accuracy and auditability. AI decides what to do, the backend decides how to do it safely.",
      color: "lavender",
    },
    {
      id: 2,
      title: "MultiMind AI Platform",
      description: "A full-stack intelligent web assistant integrating multiple AI domains into a single modular platform.",
      date: "February 2025",
      icon: MessageSquare,
      tags: ["Node.js", "Express", "MySQL", "Gemini API", "JavaScript"],
      details: "MultiMind AI is a full-stack intelligent web assistant that integrates multiple AI domains (business, IT, education, health, languages, personal assistance) into a single modular platform. It was built using HTML/CSS/JavaScript for the frontend, Node.js (Express) for the backend, MySQL for persistent chat storage, and the Gemini API for contextual AI responses. The system supports domain-based agents with custom prompts and separate conversation memory, secure user authentication, and REST endpoints for message processing and history retrieval. The interface includes dynamic chat rendering, domain navigation, and real-time response indicators. The project demonstrates AI API integration, multi-agent architecture, and stateful conversation management in a scalable web system.",
      color: "lavender",
    },
    {
      id: 3,
      title: "Ghazala AI Exam Generator",
      description: "An educational AI assistant based on a fine-tuned LLaMA 3–8B model for exam generation and academic Q&A.",
      date: "July 2025 – August 2025",
      icon: FileText,
      tags: ["LLaMA 3", "LoRA", "FAISS", "Hugging Face", "Gradio"],
      details: "Ghazala AI is an educational AI assistant based on a fine-tuned LLaMA 3–8B model adapted using LoRA on Google Colab Pro (A100 GPU). It implements a full NLP pipeline: document cleaning, chunking, embeddings generation, and semantic indexing with FAISS for retrieval-augmented generation. Relevant document chunks are injected into prompts to improve answer accuracy and reduce hallucinations. The system uses Hugging Face Transformers, PEFT, and a Gradio interface for interaction, enabling exam generation and academic Q&A. This project highlights applied LLM fine-tuning, vector search, and domain-specific AI system design.",
      color: "lavender",
    },
    {
      id: 4,
      title: "Aurelle Luxury Jewelry",
      description: "A refined luxury jewelry brand website concept with elegant editorial layouts and premium digital experience.",
      date: "January 2026",
      icon: ShoppingBag,
      tags: ["React", "Framer Motion", "Luxury Design", "Editorial Layout", "Responsive"],
      details: "Aurelle is a refined luxury jewelry brand website concept designed as a high-end digital experience. The project blends elegant editorial layouts, emotional storytelling, and smooth interactions to present jewelry as art rather than simple products. It focuses on modern visual direction, premium aesthetics, and responsive design to reflect the standards of global luxury fashion brands. The design features sophisticated typography, carefully curated imagery, subtle animations, and an intuitive user journey that enhances the luxury shopping experience. This project demonstrates expertise in luxury e-commerce design, editorial web development, and creating premium digital experiences that match brand prestige.",
      color: "peach",
      link: "https://aurelle-five.vercel.app"
    },
    {
      id: 5,
      title: "ClayWhimsy E-commerce",
      description: "A premium artistic e-commerce platform showcasing handmade clay art, lamps, and decorative pieces with modern shopping experience.",
      date: "March 2025",
      icon: ShoppingBag,
      tags: ["React", "TailwindCSS", "Commerce", "Responsive Design", "UI/UX"],
      details: "ClayWhimsy is a sophisticated e-commerce platform designed to showcase and sell handmade clay art including lamps, decorations, and candles. Built with a focus on aesthetic appeal and user experience, the platform features a product gallery with high-quality imagery, advanced filtering capabilities, secure shopping cart functionality, and seamless checkout process. The design emphasizes the artistic nature of the products with custom layouts, smooth animations, and a color palette that complements the handmade clay items. The site includes inventory management, order tracking, and responsive design ensuring perfect viewing across all devices. This project demonstrates full-stack e-commerce development with attention to both visual design and commercial functionality.",
      color: "mint",
      link: "https://claywhimsy.vercel.app"
    },
    {
      id: 6,
      title: "Stock Management System",
      description: "A Windows desktop application for Provincial Directorate stock operations with multi-user network capabilities.",
      date: "January 2026",
      icon: Database,
      tags: ["Python", "PyQt5", "SQLite", "Excel Integration", "Desktop App"],
      details: "This Windows desktop stock management application is developed for a Provincial Directorate to modernize and centralize stock operations. Built with Python (PyQt5) and using a shared SQLite (.db) database on a local network, it allows multiple workstations to work with the same synchronized data in an offline environment. The system manages stock entries through Excel imports, stock outputs via automatically generated official discharge documents, and provides real-time stock tracking with alerts. It also includes modules for articles, beneficiaries, history, and reports, along with user authentication and full traceability, ensuring reliability and compliance with public administration practices.",
      color: "sky",
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Featured Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass p-6 rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  project.color === 'lavender' ? 'bg-lavender/20' :
                  project.color === 'mint' ? 'bg-mint/20' :
                  project.color === 'peach' ? 'bg-peach/20' :
                  'bg-sky/20'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <project.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.date}</p>
                <p className="text-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Learn More</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto mx-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3 break-words">
              {selectedProject?.icon && <selectedProject.icon className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" />}
              <span className="break-words">{selectedProject?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-muted-foreground">
              {selectedProject?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-sm md:text-base leading-relaxed">
              <p className="text-foreground break-words">{selectedProject?.details}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-lg">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs md:text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {selectedProject?.link && (
              <div className="pt-4">
                <Button asChild className="w-full text-sm md:text-base py-3">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Website
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
