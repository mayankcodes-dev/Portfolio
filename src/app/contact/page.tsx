"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ExternalLink, Send, CheckCircle, AlertCircle, MapPin, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";

type FormState = "idle" | "sending" | "success" | "error";

/* Inline SVGs for icons lucide v1 doesn't have */
const ICON_PATHS = {
  github:   "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
};

const SOCIALS = [
  { label: "Email",    value: "codermayank69@gmail.com",           href: "mailto:codermayank69@gmail.com", icon: "email" },
  { label: "GitHub",   value: "github.com/coderMayank69",          href: "https://github.com/coderMayank69", icon: "github" },
  { label: "LinkedIn", value: "linkedin.com/in/codermayank69",     href: "https://www.linkedin.com/in/codermayank69/", icon: "linkedin" },
  { label: "LeetCode", value: "leetcode.com/u/coderMayank69",      href: "https://leetcode.com/u/coderMayank69/", icon: "leetcode" },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const, delay } },
});

function SocialIcon({ type }: { type: string }) {
  if (type === "email") return <Mail className="size-4" />;
  const path = ICON_PATHS[type as keyof typeof ICON_PATHS];
  return path ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d={path} />
    </svg>
  ) : <ExternalLink className="size-4" />;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [formData,     setFormData]     = useState({ name: "", email: "", message: "" });
  const [formState,    setFormState]    = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage("");

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-background text-foreground">

        {/* ── Hero ── */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-8 md:pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp(0)}>
              <Badge variant="outline" className="btn-chai mb-5">Contact</Badge>
            </motion.div>
            <motion.h1 variants={fadeUp(0.05)} className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Let&apos;s build something{" "}
              <span className="text-primary">great.</span>
            </motion.h1>
            <motion.p variants={fadeUp(0.1)} className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Have a project in mind, want to hire me, or just want to say hi?
              Fill out the form below and I&apos;ll get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Form + Sidebar ── */}
        <section ref={ref} className="border-t border-border/60">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mx-auto grid max-w-5xl gap-12 px-6 py-14 lg:grid-cols-[1fr_320px]"
          >

            {/* ── Contact form ── */}
            <motion.div variants={fadeUp(0)}>
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card p-8"
                >
                  <CheckCircle className="size-10 text-emerald-500" />
                  <div>
                    <p className="text-lg font-semibold text-foreground">Message sent!</p>
                    <p className="mt-1 text-muted-foreground">
                      Thanks for reaching out. I&apos;ll reply within 24 hours.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setFormState("idle")} className="btn-chai">
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-sm font-medium text-foreground">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <Input id="contact-name" type="text" name="name" value={formData.name}
                        onChange={handleChange} placeholder="Riya Sharma" required
                        disabled={formState === "sending"} className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input id="contact-email" type="email" name="email" value={formData.email}
                        onChange={handleChange} placeholder="riya@startup.com" required
                        disabled={formState === "sending"} className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea id="contact-message" name="message" value={formData.message}
                      onChange={handleChange} placeholder="Hi Mayank, I have a project I'd like to discuss..."
                      rows={6} required disabled={formState === "sending"} className="resize-none rounded-xl"
                    />
                  </div>

                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      {errorMessage}
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" size="lg" disabled={formState === "sending"}
                      className="btn-chai btn-magnetic gap-2 bg-primary text-primary-foreground w-full sm:w-auto"
                    >
                      {formState === "sending" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div variants={fadeUp(0.12)} className="space-y-6">

              {/* Social links */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Other ways to reach me
                </p>
                <div className="mt-4 space-y-3">
                  {SOCIALS.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target={s.label !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-border/60 bg-muted/50 transition-colors group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
                        <SocialIcon type={s.icon} />
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">{s.label}</p>
                        <p className="text-xs">{s.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Response time</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically reply within <strong className="text-foreground">24 hours</strong>.
                  For urgent inquiries, email is fastest.
                </p>
              </div>

              {/* Open to */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Currently open to</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Internships", "Freelance", "Contract", "Collaborations"].map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs btn-chai">{t}</Badge>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="size-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Location</p>
                </div>
                <p className="text-sm text-muted-foreground">Krishna Nagar, Lucknow, India</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">IST (UTC+5:30) · Available for remote</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Google Maps ── */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            >
              Based in Lucknow
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl border border-border/60 shadow-xl"
              style={{ height: "380px" }}
            >
              <iframe
                title="Lucknow, Krishna Nagar location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56850.67614696629!2d80.93040647294921!3d26.874964999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdb6a44a6e3b%3A0x2bb9d9d7dc2b03f4!2sKrishna%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714666400000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
