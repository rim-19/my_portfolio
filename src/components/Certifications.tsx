import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ArrowUpRight, Maximize2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import alxCertificate from "../assets/72-virtual-assistant-certificate-rim-elrhezzal.png";
import aiForBeginnersCertificate from "../assets/aiForBeginners.png";
import awsCertificate from "../assets/aws.png";
import azureCertificate from "../assets/azure.png";
import ibmGenerativeAIBadge from "../assets/code-generation-and-optimization-using-ibm-granite.png";

const ease = [0.23, 1, 0.32, 1] as const;

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  verificationUrl?: string;
}

const certifications: Certification[] = [
  {
    title: "Foundations of Prompt Engineering",
    issuer: "AWS",
    date: "December 2025",
    description:
      "Crafting effective prompts to guide AI tools toward accurate, reliable, and practical results.",
    image: awsCertificate,
  },
  {
    title: "Azure DevOps Foundations",
    issuer: "ScholarHat",
    date: "December 2025",
    description:
      "Core concepts, tools, and best practices for planning, building, testing, and delivering software on Azure DevOps.",
    image: azureCertificate,
  },
  {
    title: "Virtual Assistance in the Digital Age",
    issuer: "ALX",
    date: "April 2025",
    description:
      "An 8-week program covering virtual assistance, project management, and modern digital communication tools.",
    image: alxCertificate,
    verificationUrl: "https://savanna.alxafrica.org/certificates/2BpsNPe3FX",
  },
  {
    title: "AI for Beginners",
    issuer: "HP LIFE",
    date: "February 2025",
    description: "Key concepts of AI, the importance of data, and ethics in artificial intelligence.",
    image: aiForBeginnersCertificate,
  },
  {
    title: "Generative AI Badge",
    issuer: "IBM",
    date: "March - April 2025",
    description:
      "Large language models and real-world AI applications, including code generation with IBM Granite models.",
    image: ibmGenerativeAIBadge,
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative overflow-hidden py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Certifications"
          subtitle="Continuous learning across AI, cloud, and modern development practices."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <button
                onClick={() => window.open(cert.image, "_blank")}
                className="relative block overflow-hidden"
                aria-label={`View ${cert.title} full size`}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-plum/0 opacity-0 transition-all duration-300 group-hover:bg-plum/30 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-plum">
                    <Maximize2 className="h-4 w-4" />
                    View full size
                  </span>
                </div>
              </button>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {cert.issuer} · {cert.date}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-plum">
                  {cert.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {cert.description}
                </p>
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    <Award className="h-4 w-4" />
                    Verify certificate
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
