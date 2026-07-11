import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageSquare, ShoppingBag, FileText, ArrowUpRight, Globe, Database, Users, Coffee } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
    id: 1,
    title: "HR-Genius AI Platform",
    description:
      "An HR platform where you manage staff and generate documents by chatting. The AI plans; the server decides what's actually allowed.",
    date: "January 2026",
    icon: Users,
    tags: ["React", "Node.js", "TypeScript", "LangChain", "PostgreSQL", "JWT"],
    details:
      "HR-Genius lets an HR team manage employees and generate documents just by chatting. The React frontend adapts to whoever is signed in, so HR, managers, and employees each see only the actions they are allowed to take. On the backend (Node, Express, TypeScript) I used a strict planner-executor split: LangChain with Google Gemini only handles reading intent and writing the reply, while every rule and permission is enforced in code on the server. Auth is JWT with role-based access, and everything lives in PostgreSQL through Prisma, including employee records, generated documents, action logs, and a bit of conversational memory so the assistant understands references like 'him' or 'that document.' Documents are built as PDFs and emailed automatically through n8n over SMTP, and the AI only explains results the backend has already confirmed. AI decides what to do; the backend decides how to do it safely.",
  },
  {
    id: 8,
    title: "Cupid: Coffee House & Bookshop E-commerce",
    description:
      "A full-stack store for a coffee house and bookshop, with a server-rendered storefront, Stripe checkout, and a full admin dashboard.",
    date: "July 2026",
    icon: Coffee,
    tags: ["React", "Vite", "Node/Express", "Prisma", "PostgreSQL (Supabase)", "Stripe"],
    details:
      "Cupid is a full-stack e-commerce platform for a coffee house and bookshop, built with a server-rendered React storefront and a Node/Express REST API backed by PostgreSQL through Prisma. Shoppers browse a searchable catalog with server-side filtering, sorting, and pagination, build a cart and wishlist that carry over from guest to account, and check out through Stripe's hosted flow, where orders are confirmed by a signed webhook and finalized idempotently, with atomic stock guards that stop overselling. Accounts run on cookie-based sessions with email verification, password reset, account lockout, and breached-password checks, and they support reviews with verified-purchase badges, events with RSVPs, and a double opt-in newsletter. Every eligible order comes with a downloadable e-book, delivered through short-lived signed URLs from private storage. The whole shop is run from a full-page, role-based admin dashboard that handles the catalog, orders, and editable site settings, right down to the brand, banner, and live theme accent, while server-side rendering and per-product structured data keep it fast and easy to find in search.",
  },
  {
    id: 7,
    title: "ResumeIQ: AI Resume Analyzer",
    description:
      "An AI tool that reads a resume, scores it the way an ATS would, and suggests concrete rewrites, all without storing anything.",
    date: "May 2026",
    icon: FileText,
    tags: ["Next.js 15", "TypeScript", "Gemini 2.5-Flash", "Recharts", "Stateless"],
    details:
      "ResumeIQ reads a resume and scores it the way an applicant tracking system would, then points out exactly what to fix. It runs without a database: files are parsed in the browser and nothing is kept on a server. The score is deterministic, weighted across skills (40%), keywords (25%), experience (20%), and formatting (15%), and the app estimates years of experience and splits the document into sections on its own. Behind it, the AI takes an 'executive recruiter' point of view, giving a marketability read, evidence-based strengths and weaknesses, and rewrites of experience bullets using the Google XYZ formula. It also handles PDF and DOCX parsing and drafts a tailored cover letter, all while keeping your data in memory only.",
    link: "https://resume-analyzer-six-gold.vercel.app/",
  },
  {
    id: 2,
    title: "MultiMind AI Platform",
    description:
      "A web assistant that splits into several focused AI agents, each with its own purpose and its own memory.",
    date: "February 2025",
    icon: MessageSquare,
    tags: ["Node.js", "Express", "MySQL", "Gemini API", "JavaScript"],
    details:
      "MultiMind is a web assistant that splits into several focused agents, each covering a different area (business, IT, education, health, languages, and general help) with its own prompt and its own conversation memory. The frontend is plain HTML, CSS, and JavaScript; the backend runs on Node and Express, with MySQL storing chats and the Gemini API generating replies. It has user accounts, REST endpoints for sending messages and pulling history, and a chat interface with domain switching and live typing indicators. The project was how I got comfortable with AI APIs, multi-agent structure, and keeping conversation state straight across a real web app.",
  },
  {
    id: 3,
    title: "Ghazala AI Exam Generator",
    description:
      "A study assistant built on a fine-tuned LLaMA 3-8B model that writes exams and answers questions from course material.",
    date: "July 2025 - August 2025",
    icon: FileText,
    tags: ["LLaMA 3", "LoRA", "FAISS", "Hugging Face", "Gradio"],
    details:
      "Ghazala is a study assistant built on a LLaMA 3-8B model I fine-tuned with LoRA on Google Colab Pro (an A100 GPU). It runs a full NLP pipeline: cleaning documents, chunking them, generating embeddings, and indexing everything in FAISS so the model can pull the right passages before it answers. Those passages get fed into the prompt, which keeps answers grounded and cuts down on made-up facts. It is built with Hugging Face Transformers and PEFT behind a simple Gradio interface, and it can both generate exams and answer questions from the course material. This was my deep dive into fine-tuning, vector search, and building an AI system around one specific subject.",
  },
  {
    id: 4,
    title: "Aurelle Luxury Jewelry",
    description:
      "A concept site for a luxury jewelry brand, built around editorial layout and the feel of a high-end storefront.",
    date: "January 2026",
    icon: ShoppingBag,
    tags: ["React", "Framer Motion", "Editorial Layout", "Responsive"],
    details:
      "Aurelle is a concept site for a luxury jewelry brand, built to feel like a real high-end storefront rather than a product list. I leaned on editorial layouts, careful typography, and slow, subtle motion so the pieces read as objects worth looking at. It is fully responsive and takes its cues from the way global fashion houses present their work online. The focus here was visual direction and pacing: making something that feels expensive and calm, and holds together on any screen.",
    link: "https://aurelle-five.vercel.app",
  },
  {
    id: 5,
    title: "ClayWhimsy E-commerce",
    description:
      "An online shop for handmade clay lamps and decor, with a catalog, cart, and checkout.",
    date: "March 2025",
    icon: ShoppingBag,
    tags: ["React", "TailwindCSS", "Commerce", "UI/UX"],
    details:
      "ClayWhimsy is an online shop for handmade clay lamps, candles, and decor. It has a product gallery with real imagery, filtering, a shopping cart, and a checkout flow, plus inventory and order tracking behind the scenes. I built the layout and color palette around the handmade feel of the products, and made sure it works cleanly on phones, tablets, and desktops. It was a full run at building a working storefront, front to back.",
    link: "https://claywhimsy.vercel.app",
  },
  {
    id: 6,
    title: "Stock Management System",
    description:
      "A Windows desktop app that runs stock operations for a provincial directorate, with several workstations sharing one database.",
    date: "January 2026",
    icon: Database,
    tags: ["Python", "PyQt5", "SQLite", "Excel Integration"],
    details:
      "This is a Windows desktop app I built for a provincial directorate to bring their stock management into one place. It is written in Python with PyQt5 and runs on a shared SQLite database over the local network, so several workstations can work off the same data without needing the internet. Stock comes in through Excel imports and goes out via official discharge documents the app generates automatically, with live tracking and low-stock alerts. It also covers articles, beneficiaries, history, and reports, with logins and a full audit trail so everything stays accountable, the way public administration work needs to be.",
  },
];

const CATEGORY: Record<number, string> = {
  1: "AI",
  2: "AI",
  3: "AI",
  7: "AI",
  8: "E-commerce",
  4: "E-commerce",
  5: "E-commerce",
  6: "Desktop",
};
const CATEGORIES = ["All", "AI", "E-commerce", "Desktop"];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Reset the preview skeleton each time a linked project opens; clear it after
  // a few seconds even if the site blocks embedding so it never hangs.
  useEffect(() => {
    if (!selected?.link) return;
    setPreviewLoaded(false);
    const t = setTimeout(() => setPreviewLoaded(true), 4000);
    return () => clearTimeout(t);
  }, [selected]);

  const [f1, f2, ...rest] = projects;
  const featuredList = [f1, f2];
  const gridProjects = filter === "All" ? rest : projects.filter((p) => CATEGORY[p.id] === filter);

  return (
    <section id="projects" className="relative overflow-hidden py-16 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Work I'm proud of"
          subtitle="Real products I designed and built end to end, from AI tools to full online stores."
          align="left"
        />

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-ring cursor-pointer ${
                filter === cat ? "text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Featured projects (only in the unfiltered view) */}
        {filter === "All" && (
        <div className="mt-8 space-y-6">
          {featuredList.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.1, ease }}
            >
              <Tilt max={4} perspective={1400} radius="1.5rem" glare className="w-full">
                <button
                  onClick={() => setSelected(project)}
                  className={`group grid w-full gap-8 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-card via-card to-blush/50 p-8 text-left shadow-sm transition-shadow duration-300 hover:shadow-lg focus-ring cursor-pointer md:p-10 ${
                    idx % 2 === 0 ? "md:grid-cols-[1fr_1.4fr]" : "md:grid-cols-[1.4fr_1fr]"
                  }`}
                >
                  <div className={`flex flex-col justify-center ${idx % 2 === 0 ? "" : "md:order-2"}`}>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                      Featured
                    </span>
                    <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-rose text-white shadow-rose">
                      <project.icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-plum md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.date}</p>
                  </div>

                  <div className={`flex flex-col justify-center ${idx % 2 === 0 ? "" : "md:order-1"}`}>
                    <p className="text-lg leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
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
          ))}
        </div>
        )}

        {/* Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {gridProjects.map((project, i) => (
            <motion.div
              key={`${filter}-${project.id}`}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Tilt max={8} perspective={900} radius="1.5rem" glare className="h-full">
                <button
                  onClick={() => setSelected(project)}
                  className="group flex h-full w-full flex-col rounded-3xl border border-border bg-card/70 p-7 text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-lg focus-ring cursor-pointer"
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
            {selected?.link && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden rounded-2xl border border-border shadow-sm"
              >
                <div className="flex items-center gap-1.5 border-b border-border bg-card px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-champagne" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mauve/60" />
                  <span className="ml-2 truncate text-xs text-muted-foreground">
                    {selected.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </div>
                <div className="relative h-[300px] w-full sm:h-[360px]">
                  {!previewLoaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-muted">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
                      <span className="text-xs text-muted-foreground">Loading live preview…</span>
                    </div>
                  )}
                  <iframe
                    src={selected.link}
                    title={`${selected.title} live preview`}
                    loading="lazy"
                    onLoad={() => setPreviewLoaded(true)}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    className="h-full w-full bg-white"
                  />
                </div>
              </motion.div>
            )}
            {selected?.link && (
              <p className="-mt-2 text-center text-xs text-muted-foreground">
                Some sites block embedding. If the preview stays blank, open the live site below.
              </p>
            )}

            <p className="text-[0.95rem] leading-relaxed text-foreground">{selected?.details}</p>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selected?.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.6, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 420, damping: 22 }}
                    whileHover={{ scale: 1.09, y: -2 }}
                    className="cursor-default rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {selected?.link && (
              <Button asChild variant="gradient" className="w-full">
                <a href={selected.link} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Open the live site
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
