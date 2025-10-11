import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "elrhezzalrim@gmail.com",
      href: "mailto:elrhezzalrim@gmail.com",
      color: "lavender",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+212 771-907639",
      href: "tel:+212771907639",
      color: "mint",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Casablanca, Morocco",
      href: null,
      color: "peach",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "rim-elrhezzal",
      href: "https://linkedin.com/in/rim-elrhezzal-2a6178334",
      color: "sky",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16">
            Need a developer? Let's talk! 💬
          </p>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href || undefined}
                  target={info.href?.startsWith("http") ? "_blank" : undefined}
                  rel={info.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`glass p-6 rounded-2xl flex items-center gap-4 hover:shadow-xl transition-all duration-300 ${
                    info.href ? "cursor-pointer hover:scale-105" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    info.color === 'lavender' ? 'bg-lavender/20' :
                    info.color === 'mint' ? 'bg-mint/20' :
                    info.color === 'peach' ? 'bg-peach/20' :
                    'bg-sky/20'
                  }`}>
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-semibold">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
