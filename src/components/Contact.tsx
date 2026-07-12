import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

const contactInfo = [
  { icon: Mail, label: "Email", value: "elrhezzalrim@gmail.com", href: "mailto:elrhezzalrim@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "rim-elrhezzal", href: "https://linkedin.com/in/rim-elrhezzal-2a6178334" },
  { icon: Github, label: "GitHub", value: "rim-19", href: "https://github.com/rim-19" },
  { icon: Phone, label: "Phone", value: "+212 771-907639", href: "tel:+212771907639" },
];

type Errors = { name?: string; email?: string; message?: string };

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Tell me a little about it.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:elrhezzalrim@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldClass =
    "w-full rounded-xl border border-border bg-white/70 px-4 py-3 text-sm text-plum outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus-ring";

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/15 gradient-blush p-6 sm:p-10 md:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose-soft aura" />

          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Get in touch</span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-plum md:text-5xl">
              Let&apos;s make something
              <span className="italic text-gradient"> worth using.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;m looking for junior developer roles, internships, and freelance projects.
              Send a note below, or reach me directly.
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              {/* Message form */}
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wide text-plum/70">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      className={fieldClass}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-plum/70">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={fieldClass}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wide text-plum/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What are you working on?"
                    aria-invalid={!!errors.message}
                    className={`${fieldClass} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-rose px-6 py-3.5 text-sm font-medium text-white shadow-rose transition-transform duration-200 ease-out-strong hover:-translate-y-0.5 active:scale-[0.97] focus-ring sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send message
                </button>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-white/70 px-4 py-3 text-sm text-plum"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      Thanks! Your email app should be opening. If it doesn&apos;t, write to{" "}
                      <a className="font-medium text-primary underline" href="mailto:elrhezzalrim@gmail.com">
                        elrhezzalrim@gmail.com
                      </a>
                      .
                    </span>
                  </motion.div>
                )}
              </form>

              {/* Direct contact */}
              <div className="lg:pl-2">
                <p className="text-xs font-medium uppercase tracking-wide text-plum/70">Or reach me directly</p>
                <div className="mt-4 space-y-3">
                  {contactInfo.map((info, i) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: 24 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                      className="group flex items-center gap-3.5 rounded-2xl border border-white/60 bg-white/50 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm focus-ring cursor-pointer"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <info.icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        <p className="truncate text-sm font-medium text-plum">{info.value}</p>
                      </div>
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-white/50 px-4 py-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-sm font-medium text-plum">Open to junior roles &amp; freelance</span>
                </div>

                <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Casablanca, Morocco · Remote-friendly
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
