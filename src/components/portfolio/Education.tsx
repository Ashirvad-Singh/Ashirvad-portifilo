import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  {
    school: "Dr. A.P.J. Abdul Kalam Technical University",
    degree: "Master of Computer Applications (MCA)",
    place: "Lucknow, India",
    period: "2022 – 2024",
  },
  {
    school: "Lotus Institute of Management",
    degree: "Bachelor of Computer Applications (BCA)",
    place: "Bareilly, India",
    period: "2018 – 2021",
  },
];

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".edu-item", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="education" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Education</p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl">Academic foundation.</h2>
      <div className="relative pl-8 md:pl-12">
        <div className="absolute left-2 top-2 h-full w-px bg-gradient-to-b from-[#aeefff] via-[#d8b4fe] to-[#fbcfe8]" />
        {items.map((it) => (
          <div key={it.school} className="edu-item relative mb-10 last:mb-0">
            <div className="absolute -left-[26px] top-3 h-3 w-3 rounded-full bg-primary ring-4 ring-white md:-left-[34px]" />
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold md:text-2xl">{it.school}</h3>
                <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70">
                  {it.period}
                </span>
              </div>
              <p className="mt-2 text-foreground/70">{it.degree}</p>
              <p className="mt-1 text-sm text-foreground/50">{it.place}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
