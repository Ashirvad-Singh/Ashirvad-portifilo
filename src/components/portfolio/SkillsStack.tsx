import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Counter } from "./Counter";

const groups = [
  {
    title: "Languages",
    color: "from-[#aeefff] to-[#d8b4fe]",
    items: [
      { name: "JavaScript", level: 92 },
      { name: "PHP", level: 88 },
      { name: "HTML / CSS", level: 96 },
      { name: "Java", level: 70 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    color: "from-[#d8b4fe] to-[#fbcfe8]",
    items: [
      { name: "React", level: 90 },
      { name: "Tailwind CSS", level: 94 },
      { name: "GSAP", level: 80 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "CMS Platforms",
    color: "from-[#fbcfe8] to-[#aeefff]",
    items: [
      { name: "WordPress", level: 95 },
      { name: "WooCommerce", level: 90 },
      { name: "Elementor", level: 88 },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "from-[#c6f6d5] to-[#aeefff]",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "MySQL", level: 82 },
      { name: "Mailchimp", level: 75 },
    ],
  },
];

export function SkillsStack() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".sk-card");
      if (!isMobile) {
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.92 - (cards.length - 1 - i) * 0.02,
            rotation: (i % 2 === 0 ? -1 : 1) * 2,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 10%",
              endTrigger: cards[cards.length - 1],
              end: "top 20%",
              scrub: true,
            },
          });
        });
      }
      gsap.utils.toArray<HTMLElement>(".bar").forEach((bar) => {
        const target = Number(bar.dataset.level);
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${target}%`,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 85%" },
          },
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={wrap} className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Skills</p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl">
        Tools shaped by years of building.
      </h2>
      <div className="relative space-y-6">
        {groups.map((g, i) => (
          <div
            key={g.title}
            className="sk-card sticky top-24 rounded-3xl glass-strong p-8 md:p-12"
            style={{ zIndex: i + 1 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className={`bg-gradient-to-r ${g.color} bg-clip-text text-3xl font-bold text-transparent md:text-4xl`}>
                {g.title}
              </h3>
              <span className="text-sm text-foreground/50">
                <Counter to={g.items.length} />+ tools
              </span>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {g.items.map((it) => (
                <div key={it.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">{it.name}</span>
                    <span className="text-foreground/50">{it.level}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/5">
                    <div
                      data-level={it.level}
                      className={`bar h-full rounded-full bg-gradient-to-r ${g.color}`}
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
