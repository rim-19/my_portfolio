import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageSquare, ShoppingBag, FileText, ArrowUpRight, Globe, Database, Users, Coffee, Network, Terminal, Sprout, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";
import GardenBackground from "./garden/GardenBackground";

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
      "HR-Genius is a full-stack, AI-powered HR automation platform that lets HR teams manage employees, run HR workflows, and answer policy questions through a conversational chat interface. The React frontend adapts dynamically to user roles (Admin, HR, Manager, Employee), and the Node.js/Express backend is written in TypeScript around a Planner-Executor architecture: LangChain with Google Gemini handles intent extraction and natural-language generation, while all business rules, permissions, and actions are enforced deterministically server-side.\n\nThe assistant is genuinely conversational: it asks for missing details instead of guessing, corrects invalid or ambiguous requests, remembers context across turns, confirms destructive actions before executing, and streams responses token-by-token over Server-Sent Events. A retrieval-augmented (RAG) knowledge base grounds policy answers in the company handbook using vector embeddings, and analytical queries (e.g. average salary by department) are answered from live database aggregations. Every AI response is explainable and strictly grounded in verified backend results.\n\nBeyond the chatbot, the platform delivers a full HR product surface: leave management with manager approval and balance tracking, employee self-service profiles, AI-generated PDF documents from HR-editable templates (delivered via external n8n workflows over SMTP), row-level role-based access control, an audit log with GDPR data export, and in-app notifications.\n\nBuilt with JWT authentication (short-lived access tokens plus refresh tokens and account lockout), PostgreSQL via Prisma (employees, documents, leave, templates, notifications, action logs, and persistent conversational memory), and production-minded foundations: automated tests (Vitest/Supertest), structured logging, rate limiting, and security hardening.",
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
    id: 9,
    title: "Nexus AI (RAG Knowledge Platform)",
    description:
      "A production RAG platform that turns GitHub repos and documents into a citable knowledge base you can chat with.",
    date: "June 2026",
    icon: Network,
    tags: ["FastAPI", "Supabase pgvector", "Next.js 14", "RAG", "React Three Fiber", "SSE"],
    details:
      "Nexus AI is a production RAG (Retrieval-Augmented Generation) platform that turns GitHub repositories and documents into a searchable, citable knowledge base you can chat with. On the backend it runs FastAPI with async SQLAlchemy 2.0 over Supabase Postgres + pgvector (managed through Alembic migrations and reached via the Supabase session-mode pooler), where ingestion is handled by a durable Postgres-backed job queue (an ingestion_jobs table drained by an in-lifespan asyncio worker using FOR UPDATE SKIP LOCKED) so uploads survive restarts.\n\nThe RAG pipeline does structure-aware chunking with tree-sitter (splitting code by real syntax boundaries rather than blind character windows), embeds chunks with Jina embeddings v3 (1024-dim) into pgvector, then answers questions via hybrid retrieval: pgvector cosine similarity fused with Postgres full-text search through Reciprocal Rank Fusion, re-ranked by Jina reranker v2, and fed into a grounded 'cite-or-refuse' prompt so every answer streams back over SSE with inline citations pointing to the exact file, line, or page (and refuses when the context doesn't support an answer). Generation sits behind a provider abstraction with an automatic fallback chain (Groq Qwen / GPT-OSS / Llama, then Gemini 2.5), and the system self-evaluates retrieval and answer quality against a seeded eval set.\n\nSecurity and reliability are real: httpOnly cookie auth with short-lived access tokens plus single-use rotating refresh tokens, argon2 password hashing, JWT sessions, email verify and reset flows, and dependency-based rate limiting. The frontend is Next.js 14 (App Router) + TypeScript + Tailwind with a shadcn CSS-variable theme, animated via Framer Motion, a React Three Fiber particle 'AI Core' hero, Lenis smooth scroll, and higher-order features layered on top: a live query-analytics dashboard (latency, questions-over-time, most-cited files), an interactive force-directed knowledge graph (collection to documents to files), and an AI Repository Overview that generates a cached intelligence report (language, framework, architecture, modules, key files, security notes) from the indexed content.\n\nIt is deployed across Render (Dockerized backend that runs migrations then binds $PORT), Vercel (frontend), and Supabase (database), with cross-site cookies configured for production.",
    link: "https://nexus-ai-red-five.vercel.app/",
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
    id: 10,
    title: "PromptCheck (LLM Prompt Drift CLI)",
    description:
      "A CLI that treats LLM prompts as versioned, testable code and catches prompt drift in CI, with a live dashboard.",
    date: "July 2026",
    icon: Terminal,
    tags: ["Python", "Typer", "asyncio", "SQLite", "GitHub Actions", "FastAPI"],
    details:
      "PromptCheck is a Python command-line tool (packaged on PyPI as promptcheck-drift, installed via pip, exposing a promptcheck command built with Typer for the CLI and Rich for the terminal tables) that treats LLM prompts as testable, versioned code. You define test suites in human-readable YAML files: a prompt template with a {{ input }} placeholder, a list of models to run against, and per-test assertions, which are loaded and validated by Pydantic schemas, then executed by an asyncio runner that fans out every model-and-test combination concurrently over httpx with a semaphore-based concurrency cap and exponential-backoff retry that honors HTTP 429 Retry-After headers.\n\nModel calls go through a small provider abstraction with interchangeable backends (Google Gemini and Groq, both on free tiers, each normalizing responses into a common result with text, token counts, cost, latency, and the resolved model version), and each test's output is graded either by fast deterministic checks (equals, contains, not_contains, regex) or by an LLM-as-judge (llm_rubric) that sends the output to a pinned judge model at temperature 0 and parses a strict JSON verdict, with the judge's exact version recorded so the grader's own drift is visible.\n\nEvery run is persisted to a local SQLite database (runs, per-test results, and baselines tables), which powers the tool's real differentiator, drift detection: baseline pins a reference run, then watch re-runs and diffs against it, reporting only genuine regressions (tests that passed in the baseline but fail now) while deliberately treating API and rate-limit errors as 'could not evaluate' rather than false-alarm regressions, flagging model-version changes as the likely cause of a drop, and exiting non-zero so it gates CI.\n\nThat exit code plus a --summary-file markdown export feed a shipped GitHub Actions workflow that runs the suite on every pull request and on a nightly cron, persisting the history DB in the Actions cache and opening a GitHub issue when anything regresses: a free, unattended monitor. Finally, a FastAPI backend serves a read-only JSON API over the same SQLite file to a React + Vite + Tailwind + Recharts dashboard (launched with promptcheck serve) showing pass-rate-over-time charts, run tables with baseline markers, and a test-level diff view for non-engineers. The whole thing is MIT-licensed, covered by a 31-test pytest suite that runs offline with no API calls, and runs end-to-end entirely on free tiers (Gemini and Groq for inference, SQLite for storage, GitHub Actions for automation).",
    link: "https://github.com/rim-19/PromptCheck",
  },
  {
    id: 11,
    title: "Noesis (Explain-to-Learn App)",
    description:
      "A voice-and-chat learning app where each concept blooms from seed to flower once you can explain it back.",
    date: "July 2026",
    icon: Sprout,
    tags: ["Next.js 16", "React 19", "React Flow", "Gemini", "ElevenLabs", "Turso"],
    details:
      "Noesis is a voice-and-chat learning app built on one principle: you haven't learned something until you can explain it back. It is rendered as a 'garden at dusk' where each concept grows from a gray seed to a green sprout to a rose bloom only once you've proven you understand it. It is a single Next.js 16 app (App Router, TypeScript, React 19, Tailwind v4) where the frontend and backend live together: the garden canvas is drawn with @xyflow/react (react-flow) using custom SVG growth-stage nodes and hand-curved 'vine' edges, animated with Framer Motion, and the whole experience is orchestrated client-side in a GardenApp component that swaps between a hero and onboarding landing, the graph dashboard, a full-screen teaching chat (typed or spoken, tutor replies rendered as markdown via react-markdown, with per-message read-aloud), and a separate checkpoint step that grades your explanation.\n\nOn the server, API route handlers call two AI providers over plain REST, Google Gemini first, automatically falling back to OpenRouter's free models on quota or rate errors (with retries, since some free models are reasoning-based and need generous token budgets), driven by three distinct prompt roles: a curriculum planner that decomposes any goal (or a 'surprise me' random pick, or an uploaded PDF parsed with unpdf) into an 8-to-14-node dependency graph, a tutor that teaches each concept in depth step-by-step, and a fair examiner that returns strict-JSON verdicts on whether you truly understood.\n\nData persists in a libsql/SQLite database (a local file in dev, hosted Turso in production, selected purely by the DATABASE_URL env var) whose every row is scoped to a user_id, supplied by a lightweight identity middleware that hands each visitor an anonymous per-device cookie, so gardens are private and the model upgrades to real accounts with zero schema change, while a server-side relayout() routine computes longest-path depth to lay each subject out as its own tidy left-to-right cluster.\n\nVoice runs entirely through ElevenLabs (Scribe speech-to-text in, natural TTS out, with browser-speech fallback) captured via MediaRecorder, the app ships as an installable PWA (service worker, offline shell, flower favicon and icons) with optional web-push 'refresher nudges' fired by a Vercel cron, and the codebase is deployed on Vercel, versioned on GitHub, and secured so the AI keys, database token, and tooling files never leave the local .env.",
    link: "https://noesis-red.vercel.app/",
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
  9: "AI",
  10: "AI",
  11: "AI",
  8: "E-commerce",
  4: "E-commerce",
  5: "E-commerce",
  6: "Desktop",
};
const CATEGORIES = ["All", "AI", "E-commerce", "Desktop"];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const gardenInView = useInView(ref, { once: false, margin: "10% 0px" });
  const gardenNear = useInView(ref, { once: true, margin: "800px 0px" });
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

  const [f1, f2, f3, ...rest] = projects;
  const featuredList = [f1, f2, f3];
  const gridProjects = filter === "All" ? rest : projects.filter((p) => CATEGORY[p.id] === filter);

  return (
    <section id="projects" className="relative overflow-hidden py-16 md:py-32">
      {/* Enchanted 3D garden behind the cards */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <GardenBackground active={gardenInView} near={gardenNear} />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
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

            <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground">
              {selected?.details.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

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
                  {selected.link.includes("github.com") ? (
                    <>
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      Open the live site
                    </>
                  )}
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
