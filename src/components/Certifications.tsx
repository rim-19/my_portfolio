import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import alxCertificate from "../assets/72-virtual-assistant-certificate-rim-elrhezzal.png";
import aiForBeginnersCertificate from "../assets/aiForBeginners.png";
import awsCertificate from "../assets/aws.png";
import azureCertificate from "../assets/azure.png";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: any;
  color: string;
  image?: any;
  verificationUrl?: string;
}

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications: Certification[] = [
    {
      title: "Foundations of Prompt Engineering",
      issuer: "AWS Certification",
      date: "12/2025",
      description: "Validates skills in crafting effective prompts to guide AI tools for accurate, reliable, and practical results.",
      icon: Cpu,
      color: "lavender",
      image: awsCertificate,
    },
    {
      title: "Azure DevOps Foundations Course",
      issuer: "ScholarHat",
      date: "12/2025",
      description: "A foundational course on Azure DevOps covering core concepts, tools, and best practices for planning, building, testing, and delivering software efficiently using Microsoft's DevOps platform.",
      icon: Briefcase,
      color: "mint",
      image: azureCertificate,
    },
    {
      title: "Virtual Assistance Skills in the Digital Age",
      issuer: "ALX Virtual Assistant",
      date: "April 2025",
      description: "Successfully completed an 8-week comprehensive program covering virtual assistance, project management, and digital communication tools. Demonstrates proficiency in organizational skills, client support, and modern workplace productivity tools.",
      icon: Award,
      color: "sky",
      image: alxCertificate,
      verificationUrl: "https://savanna.alxafrica.org/certificates/2BpsNPe3FX"
    },
    {
      title: "AI for Beginners",
      issuer: "HP Life Online Course",
      date: "February 2025",
      description: "Key concepts of AI, data importance, and ethics in artificial intelligence.",
      icon: Cpu,
      color: "peach",
      image: aiForBeginnersCertificate,
    },
    {
      title: "Generative AI Badge",
      issuer: "IBM",
      date: "March 2025 – April 2025",
      description: "Learned about large language models and real-world AI applications.",
      icon: Award,
      color: "lavender",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="text-gradient">Certifications</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass h-full hover:shadow-2xl transition-all duration-300 border-0">
                  <CardHeader>
                    {cert.image ? (
                      <div className="mb-4 group cursor-pointer" onClick={() => cert.image && window.open(cert.image, '_blank')}>
                        <div className="relative overflow-hidden rounded-lg border-2 border-border/50 hover:border-primary/50 transition-all duration-300">
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                              View Full Size
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          🔍 Click to view full certificate
                        </p>
                      </div>
                    ) : (
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                        cert.color === 'lavender' ? 'bg-lavender/20' :
                        cert.color === 'mint' ? 'bg-mint/20' :
                        cert.color === 'sky' ? 'bg-sky/20' :
                        'bg-peach/20'
                      }`}>
                        <cert.icon className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <CardDescription className="text-sm font-medium">{cert.issuer}</CardDescription>
                    <CardDescription className="text-xs text-muted-foreground">{cert.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground text-sm leading-relaxed">{cert.description}</p>
                    {cert.verificationUrl && (
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => window.open(cert.verificationUrl, '_blank')}
                          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-medium"
                        >
                          <Award className="w-4 h-4" />
                          Verify Certificate
                        </button>
                        <span className="text-xs text-muted-foreground self-center">|</span>
                        <button 
                          onClick={() => cert.image && window.open(cert.image, '_blank')}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          View Full Size
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
