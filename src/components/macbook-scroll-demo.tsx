import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

import { HeroBackground } from "@/components/portfolio/HeroBackground";

export default function MacbookScrollDemo() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  return (
    <section className="relative grain w-full overflow-hidden bg-hero dark:bg-[#0B0B0F] pt-20">
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

      <div className="relative z-10">
        <MacbookScroll
          title={
            <div className="flex flex-col items-center">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Available for new projects
              </span>
              <span className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400">
                Building Modern Web Experiences. <br /> Developer & Problem Solver.
              </span>
            </div>
          }
          src={`/linear.webp`}
          showGradient={false}
        />
      </div>
    </section>
  );
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};
