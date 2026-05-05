import { Github, Linkedin, Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative mx-auto max-w-6xl px-6 pb-10 pt-20">
      <div className="rounded-3xl glass p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
              Let's build something <span className="text-gradient">memorable</span>.
            </h3>
            <p className="mt-3 max-w-md text-foreground/60">
              Currently open to freelance projects and full-time roles. Drop a line — I reply within
              a day.
            </p>
            <a
              href="mailto:ashirvad2912@gmail.com"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" /> ashirvad2912@gmail.com
            </a>
          </div>
          <div className="space-y-3 text-sm">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Contact
            </h4>
            <p className="flex items-center gap-2 text-foreground/70">
              <Phone className="h-4 w-4" /> +91 78179 40937
            </p>
            <p className="flex items-center gap-2 text-foreground/70">
              <MapPin className="h-4 w-4" /> Mohali, Punjab
            </p>
            <p className="flex items-center gap-2 text-foreground/70">
              <Mail className="h-4 w-4" /> ashirvad2912@gmail.com
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Social
            </h4>
            <a
              href="https://github.com/Ashirvad-Singh"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground"
            >
              <Globe className="h-4 w-4" /> Portfolio
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/40 pt-6 text-xs text-foreground/50">
          <span>© {new Date().getFullYear()} Ashirvad Singh. Crafted with care.</span>
          <span>Built with React, GSAP, Three.js & Tailwind.</span>
        </div>
      </div>
    </footer>
  );
}
