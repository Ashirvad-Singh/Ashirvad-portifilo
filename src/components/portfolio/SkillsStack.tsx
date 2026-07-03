import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Counter } from "./Counter";
import { Code2, Layers, Layout, Wrench } from "lucide-react";

const groups = [
  {
    title: "Languages",
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/20",
    icon: Code2,
    items: [
      { name: "JavaScript", level: 92 },
      { name: "PHP", level: 88 },
      { name: "HTML / CSS", level: 96 },
      { name: "Java", level: 70 },
    ],
  },
  {
    title: "Frameworks & Libs",
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-purple-500/20",
    icon: Layers,
    items: [
      { name: "React", level: 90 },
      { name: "Tailwind CSS", level: 94 },
      { name: "GSAP", level: 80 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "CMS Platforms",
    color: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/20",
    icon: Layout,
    items: [
      { name: "WordPress", level: 95 },
      { name: "WooCommerce", level: 90 },
      { name: "Elementor", level: 88 },
    ],
  },
  {
    title: "Tools & DBs",
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20",
    icon: Wrench,
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
          // The last card doesn't need to animate out
          if (i === cards.length - 1) return;

          // Advanced Sticky Card Stacking Animation (Skiper UI Style)
          gsap.to(card, {
            scale: 1 - (cards.length - 1 - i) * 0.05,
            rotation: i % 2 === 0 ? -2 : 2,
            y: -(cards.length - 1 - i) * 20,
            opacity: 0.85,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: `top ${100 + i * 20}px`,
              endTrigger: wrap.current,
              end: `bottom ${200 + cards.length * 20}px`,
              scrub: true,
            },
          });
        });
      }
      
      // Progress Bar Animation
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
    <section id="skills" ref={wrap} className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-3xl text-center mb-20">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Technical Expertise</p>
        <h2 className="text-4xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          Tools & Skills
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/60">
          A comprehensive toolkit shaped by years of building modern, scalable web applications. Scroll to explore my technical stack.
        </p>
      </div>
      
      {/* Container for sticky cards */}
      <div className="relative w-full skills-container">
        {groups.map((g, i) => {
          const GroupIcon = g.icon;
          return (
            <div
              key={g.title}
              // The sticky offset dynamically changes so cards stack visibly on desktop
              style={{ zIndex: i + 1, top: `${100 + i * 20}px` }}
              className="sk-card static md:sticky w-full rounded-[40px] border border-black/5 dark:border-white/5 bg-background dark:bg-[#111116] p-8 md:p-14 shadow-2xl mb-8 md:mb-12 will-change-transform"
            >
              {/* Card Ambient Glow */}
              <div className={`absolute -inset-0.5 rounded-[40px] bg-gradient-to-r ${g.color} opacity-[0.03] dark:opacity-10 blur-xl pointer-events-none`} />

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                  <div className={`flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${g.color} shadow-lg ${g.shadow}`}>
                    <GroupIcon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-foreground">
                    {g.title}
                  </h3>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 px-5 py-2 text-sm font-bold text-foreground/70">
                  <Counter to={g.items.length} />+ tools inside
                </span>
              </div>
              
              <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {g.items.map((it) => (
                  <div 
                    key={it.name}
                    className="group relative overflow-hidden rounded-[24px] bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white dark:hover:bg-black/50"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-bold text-lg text-foreground/80 transition-colors group-hover:text-foreground">{it.name}</span>
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${g.color} font-bold text-lg`}>{it.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/5 dark:bg-white/5">
                      <div
                        data-level={it.level}
                        className={`bar h-full rounded-full bg-gradient-to-r ${g.color} relative shadow-inner`}
                        style={{ width: 0 }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
