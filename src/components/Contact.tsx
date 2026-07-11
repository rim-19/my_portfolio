import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

const contactInfo = [
  { icon: Mail, label: "Email", value: "elrhezzalrim@gmail.com", href: "mailto:elrhezzalrim@gmail.com" },
  { icon: Phone, label: "Phone", value: "+212 771-907639", href: "tel:+212771907639" },
  { icon: Linkedin, label: "LinkedIn", value: "rim-elrhezzal", href: "https://linkedin.com/in/rim-elrhezzal-2a6178334" },
  { icon: MapPin, label: "Location", value: "Casablanca, Morocco", href: null },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/15 gradient-blush p-6 sm:p-10 md:p-16"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-soft aura" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Get in touch
              </span>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-plum md:text-5xl">
                Let&apos;s make something
                <span className="italic text-gradient"> worth using.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                I&apos;m looking for junior developer roles, internships, and
                freelance projects. If you&apos;re working on something interesting,
                send it my way.
              </p>
              <a
                href="mailto:elrhezzalrim@gmail.com"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-rose transition-transform duration-200 ease-out-strong hover:-translate-y-0.5 active:scale-[0.97] focus-ring"
              >
                <Mail className="h-4 w-4" />
                Send me an email
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((info, i) => {
                const Wrapper = info.href ? "a" : "div";
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                  >
                    <Wrapper
                      {...(info.href
                        ? {
                            href: info.href,
                            target: info.href.startsWith("http") ? "_blank" : undefined,
                            rel: info.href.startsWith("http") ? "noopener noreferrer" : undefined,
                          }
                        : {})}
                      className={`group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 px-5 py-4 transition-all duration-300 ${
                        info.href ? "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm focus-ring cursor-pointer" : ""
                      }`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <info.icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        <p className="truncate font-medium text-plum">{info.value}</p>
                      </div>
                      {info.href && (
                        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
