import { Sparkle } from "lucide-react";

const items = [
  "React", "Next.js", "TypeScript", "Python", "Node.js", "LangChain",
  "Gemini", "TailwindCSS", "PostgreSQL", "Framer Motion", "LLaMA", "FAISS",
  "Hugging Face", "Prisma", "Express",
];

const Marquee = () => {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-plum py-5">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-plum to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-plum to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-xl italic text-blush/90 md:text-2xl">
              {item}
            </span>
            <Sparkle className="h-4 w-4 shrink-0 text-rose" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
