import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, ShoppingBag, FileText, Heart, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: any;
  tags: string[];
  details: string;
  color: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Multi-Chatbot Platform",
      description: "An intelligent, multi-domain chatbot platform for document analysis, general conversation, and custom services.",
      date: "February 2025",
      icon: MessageSquare,
      tags: ["Node.js", "JavaScript", "APIs", "AI"],
      details: "Built a comprehensive chatbot system with clean, intuitive UI and responsive design. Features include document processing, natural language understanding, and custom service integration.",
      color: "lavender",
    },
    {
      id: 2,
      title: "Artistic E-commerce Website",
      description: "E-commerce site for selling handmade clay art including lamps, decorations, and candles.",
      date: "March 2025",
      icon: ShoppingBag,
      tags: ["HTML", "CSS", "JavaScript", "E-commerce"],
      details: "Created a beautiful e-commerce platform with product gallery, shopping cart functionality, and artistic design elements that complement the handmade nature of the products.",
      color: "mint",
    },
    {
      id: 3,
      title: "Exam Generator Using LLMs",
      description: "A language model tool to generate custom exam papers from archived school materials.",
      date: "July 2025 – August 2025",
      icon: FileText,
      tags: ["Python", "AI", "NLP", "Education"],
      details: "Developed an AI-powered exam generation system with focus on fine-tuning language models and designing an intuitive teacher-oriented interface for easy exam customization.",
      color: "peach",
    },
    {
      id: 4,
      title: "Therapeutic AI Assistant",
      description: "An empathetic chatbot for mental well-being using ElevenLabs.io.",
      date: "April 2025",
      icon: Heart,
      tags: ["AI", "NLP", "Healthcare", "ElevenLabs"],
      details: "Designed a compassionate AI assistant that offers supportive, ethical, and adaptive conversations for mental wellness. Implements advanced NLP techniques for empathetic responses.",
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
        <DialogContent className="glass max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold flex items-center gap-3">
              {selectedProject?.icon && <selectedProject.icon className="w-8 h-8 text-primary" />}
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedProject?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{selectedProject?.details}</p>
            <div>
              <h4 className="font-semibold mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
