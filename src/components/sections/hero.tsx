import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Tagline */}
          <div className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-muted-foreground">
            Welcome to my portfolio
          </div>

          {/* Main heading */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
              Hi, I'm Mayank
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Full-stack developer crafting beautiful, performant web experiences. 
              I turn ideas into elegant digital solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/projects">
              <Button size="lg" className="min-w-48">
                View My Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="min-w-48">
                Get In Touch
              </Button>
            </Link>
          </div>

          {/* Optional: Stats or Social */}
          <div className="pt-8 grid grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">100+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">5+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
