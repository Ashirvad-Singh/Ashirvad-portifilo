import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Mail } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll(".letter");
      if (letters) {
        gsap.from(letters, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: { each: 0.04, from: "center" },
          duration: 1.1,
          ease: "power4.out",
        });
      }
      gsap.from(subRef.current, { y: 30, opacity: 0, duration: 0.9, delay: 0.6, ease: "power3.out" });
      gsap.from(ctaRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
      });
      // Floating cards
      const cards = cardsRef.current?.querySelectorAll(".float-card");
      cards?.forEach((c, i) => {
        gsap.to(c, {
          y: "+=20",
          rotation: i % 2 === 0 ? 4 : -4,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
      // Parallax on mouse (desktop only)
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      if (!isCoarse) {
        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 20;
          gsap.to(cardsRef.current, { x, y, duration: 1, ease: "power2.out" });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    });
    return () => ctx.revert();
  }, []);

  const name = "Ashirvad Singh";

  return (
    <section
      id="top"
      className="relative grain mx-auto flex min-h-[50vh] md:min-h-[64vh] w-full items-center justify-center overflow-hidden bg-hero pt-20 pb-10 md:pt-28 md:pb-0"
    >
      <HeroBackground />

      {/* Floating glass blobs */}
      <div ref={cardsRef} className="pointer-events-none absolute inset-0">
        <div className="float-card absolute left-[6%] top-[18%] h-28 w-28 rounded-3xl glass-soft" />
        <div className="float-card absolute right-[8%] top-[28%] h-40 w-40 rounded-full glass-soft" />
        <div className="float-card absolute bottom-[14%] left-[12%] h-32 w-44 rounded-2xl glass-soft" />
        <div className="float-card absolute bottom-[10%] right-[14%] h-24 w-24 rotate-12 rounded-2xl glass-soft" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px),linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 pb-8 md:pb-16 text-center">
        <span className="mb-4 md:mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Available for new projects
        </span>

        <h1
          ref={titleRef}
          className="select-none text-[2.75rem] font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-[7.25rem] md:leading-[0.9]"
          style={{ perspective: 1000 }}
        >
          {name.split("").map((ch, i) => (
            <span key={i} className="letter inline-block" style={{ display: "inline-block" }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <p ref={subRef} className="mt-4 md:mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-foreground/60 sm:text-lg md:text-xl md:gap-x-3">
          <span className="text-gradient font-semibold">Web Developer</span>
          <span className="hidden text-foreground/30 md:inline">|</span>
          <span className="text-gradient font-semibold">Problem Solver</span>
          <span className="hidden text-foreground/30 md:inline">|</span>
          <span className="text-gradient font-semibold">Tech Enthusiast</span>
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
            View Work <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Mail className="h-4 w-4" /> Contact
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
