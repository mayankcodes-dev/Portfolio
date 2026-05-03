"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const featured = projects.filter((p) => p.featured);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.p
            variants={headingVariants}
            className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            Featured Work
          </motion.p>
          <motion.h2
            variants={headingVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            Selected Projects
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            A collection of full-stack applications demonstrating design, engineering, and problem-solving expertise.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={cn(
                "grid gap-8 items-center md:grid-cols-2",
                i % 2 === 1 && "md:grid-flow-dense"
              )}
            >
              {/* Image Placeholder */}
              <div className={cn(
                "aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center",
                i % 2 === 1 && "md:col-start-2"
              )}>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary/20 mb-2">
                    {project.title.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-xs text-muted-foreground">Project Preview</p>
                </div>
              </div>

              {/* Content */}
              <div className={cn(
                i % 2 === 1 && "md:col-start-1"
              )}>
                <p className="text-sm font-semibold text-primary mb-3">
                  {String(i + 1).padStart(2, "0")} · Project
                </p>
                <h3 className="text-3xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {project.longDescription ?? project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-medium">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-2">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="gap-2">
                        <GitBranch className="w-3.5 h-3.5" />
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/projects">
            <Button size="lg" variant="outline" className="gap-2">
              View All Projects
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
