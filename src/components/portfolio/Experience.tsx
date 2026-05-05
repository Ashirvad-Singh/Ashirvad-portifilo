import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Experience</p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl">Where I've built.</h2>
      <div className="exp-card group relative overflow-hidden rounded-3xl glass p-8 md:p-12 transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(168,139,250,0.4)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#d8b4fe]/40 to-[#fbcfe8]/40 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold md:text-3xl">Web Developer</h3>
            <p className="mt-1 text-lg text-foreground/70">Adat Soft Solutions · Mohali, Punjab</p>
          </div>
          <span className="rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-medium">
            March 2024 – Present
          </span>
        </div>
        <ul className="mt-6 space-y-3 text-foreground/70">
          {[
            "Built and managed WordPress websites with responsive design and seamless UX.",
            "Developed custom plugins and tailored WooCommerce stores for e-commerce clients.",
            "Collaborated with the design team to improve performance and SEO rankings.",
          ].map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
