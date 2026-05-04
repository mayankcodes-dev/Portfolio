"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink, Send, CheckCircle, AlertCircle, MapPin, Clock, Briefcase } from "lucide-react";
import SiteNav from "@/components/layout/site-nav";
import { Footer } from "@/components/sections/footer";

type FormState = "idle" | "sending" | "success" | "error";

const ICON_PATHS = {
  github:   "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
  hashnode: "M13.205.043a13.01 13.01 0 0 0-9.23 3.816A13.038 13.038 0 0 0 .043 13.1c.066 7.18 5.984 12.998 13.162 12.998 7.117 0 13.018-5.836 13.018-13.021 0-7.228-5.877-13.077-13.018-13.034zm1.245 16.918a3.437 3.437 0 0 1-4.864 0 3.44 3.44 0 0 1 0-4.865 3.438 3.438 0 0 1 4.864 0 3.44 3.44 0 0 1 0 4.865z",
};

const SOCIALS = [
  { label: "Email",    value: "mayankbca96325@gmail.com",           href: "mailto:mayankbca96325@gmail.com",           icon: "email" },
  { label: "Phone",    value: "+91 8115529832",                    href: "tel:+918115529832",                        icon: "phone" },
  { label: "GitHub",   value: "github.com/coderMayank69",          href: "https://github.com/coderMayank69",         icon: "github" },
  { label: "LinkedIn", value: "linkedin.com/in/codermayank69",     href: "https://www.linkedin.com/in/codermayank69/",icon: "linkedin" },
  { label: "LeetCode", value: "leetcode.com/u/coderMayank69",      href: "https://leetcode.com/u/coderMayank69/",    icon: "leetcode" },
  { label: "Hashnode", value: "codermayank69.hashnode.dev",        href: "https://codermayank69.hashnode.dev/",      icon: "hashnode" },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const, delay } },
});

function SocialIcon({ type }: { type: string }) {
  if (type === "email") return <Mail className="size-4" />;
  if (type === "phone") return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
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
      <main className="min-h-screen bg-white text-[#0a0a0a]">

        {/* ── Hero ── */}
        <section className="relative bg-[#fafafa]">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden />
          <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 pb-10 pt-8 md:pt-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp(0)}>
                <span className="eyebrow">Contact</span>
              </motion.div>
              <motion.h1
                variants={fadeUp(0.05)}
                className="mt-4 font-extrabold tracking-tighter text-balance"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
              >
                Let&apos;s build something{" "}
                <span className="text-neutral-400">great.</span>
              </motion.h1>
              <motion.p variants={fadeUp(0.1)} className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-neutral-500">
                Have a project in mind, want to hire me, or just want to say hi?
                Fill out the form below and I&apos;ll get back to you within 24 hours.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Form + Sidebar ── */}
        <section ref={ref} className="border-t border-neutral-100">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mx-auto grid max-w-5xl gap-12 px-6 md:px-8 py-14 lg:grid-cols-[1fr_320px]"
          >

            {/* ── Contact form ── */}
            <motion.div variants={fadeUp(0)}>
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-eng flex flex-col items-start gap-4 p-8"
                >
                  <CheckCircle className="size-10 text-emerald-500" />
                  <div>
                    <p className="text-lg font-bold text-[#0a0a0a]">Message sent!</p>
                    <p className="mt-1 text-neutral-500">
                      Thanks for reaching out. I&apos;ll reply within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => setFormState("idle")} className="btn btn-outline btn-sm">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-sm font-medium text-[#0a0a0a]">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name" type="text" name="name" value={formData.name}
                        onChange={handleChange} placeholder="Riya Sharma" required
                        disabled={formState === "sending"}
                        className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-[#0a0a0a] placeholder:text-neutral-400 outline-none transition-colors focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-sm font-medium text-[#0a0a0a]">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email" type="email" name="email" value={formData.email}
                        onChange={handleChange} placeholder="riya@startup.com" required
                        disabled={formState === "sending"}
                        className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-[#0a0a0a] placeholder:text-neutral-400 outline-none transition-colors focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[#0a0a0a]">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message" name="message" value={formData.message}
                      onChange={handleChange} placeholder="Hi Mayank, I have a project I'd like to discuss..."
                      rows={6} required disabled={formState === "sending"}
                      className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-[#0a0a0a] placeholder:text-neutral-400 outline-none transition-colors focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] disabled:opacity-50"
                    />
                  </div>

                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      {errorMessage}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="btn btn-primary w-full sm:w-auto disabled:opacity-50"
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
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div variants={fadeUp(0.1)} className="space-y-4">

              {/* Social links */}
              <div>
                <p className="eyebrow mb-4">Other ways to reach me</p>
                <div className="space-y-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-sm text-neutral-500 transition-colors hover:text-[#0a0a0a]"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-neutral-200 bg-white transition-colors group-hover:border-neutral-400 group-hover:text-[#0a0a0a]">
                        <SocialIcon type={s.icon} />
                      </span>
                      <div>
                        <p className="font-semibold text-[#0a0a0a] text-sm">{s.label}</p>
                        <p className="text-xs text-neutral-400">{s.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="card-eng p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-4 text-neutral-400" />
                  <p className="text-sm font-semibold text-[#0a0a0a]">Response time</p>
                </div>
                <p className="text-sm text-neutral-500">
                  I typically reply within <strong className="text-[#0a0a0a]">24 hours</strong>.
                  For urgent inquiries, email is fastest.
                </p>
              </div>

              {/* Open to */}
              <div className="card-eng p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="size-4 text-neutral-400" />
                  <p className="text-sm font-semibold text-[#0a0a0a]">Currently open to</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Internships", "Freelance", "Contract", "Collaborations"].map((t) => (
                    <span key={t} className="badge badge-neutral text-[11px]">{t}</span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="card-eng p-5">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="size-4 text-neutral-400" />
                  <p className="text-sm font-semibold text-[#0a0a0a]">Location</p>
                </div>
                <p className="text-sm text-neutral-500">Krishna Nagar, Lucknow, India</p>
                <p className="text-xs text-neutral-400 mt-0.5">IST (UTC+5:30) · Available for remote</p>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918115529832?text=Hi%20Mayank%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 card-eng p-4 transition-colors hover:border-[#25D366]/50"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white shadow-sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-[#0a0a0a] group-hover:text-[#25D366] transition-colors">Chat on WhatsApp</p>
                  <p className="text-xs text-neutral-400">+91 8115529832</p>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Google Maps ── */}
        <section className="border-t border-neutral-100 bg-[#fafafa]">
          <div className="mx-auto max-w-5xl px-6 md:px-8 py-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-center justify-between"
            >
              <div>
                <p className="eyebrow mb-1">Location</p>
                <h2 className="text-xl font-bold tracking-tight text-[#0a0a0a]">
                  Based in Lucknow, India
                </h2>
              </div>
              <a
                href="https://maps.app.goo.gl/WHHrY1Vy3UARDXgC8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm hidden sm:flex items-center gap-1.5"
              >
                <MapPin className="size-3.5" />
                Get Directions
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
              style={{ height: "400px" }}
            >
              <iframe
                title="Mayank's location — Krishna Nagar, Lucknow"
                src="https://maps.google.com/maps?q=Krishna+Nagar,+Lucknow,+Uttar+Pradesh,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.1) contrast(1.05) saturate(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Bottom info bar overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm border-t border-neutral-100 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#0a0a0a] text-white">
                    <MapPin className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#0a0a0a]">Krishna Nagar, Lucknow</p>
                    <p className="text-[11px] text-neutral-400">Uttar Pradesh, India · IST (UTC+5:30)</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/WHHrY1Vy3UARDXgC8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-[#0a0a0a] hover:text-neutral-600 flex items-center gap-1 transition-colors"
                >
                  Open in Maps <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
