import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const items = [
  {
    school: "Dr. A.P.J. Abdul Kalam Technical University",
    degree: "Master of Computer Applications (MCA)",
    place: "Lucknow, India",
    period: "2022 – 2024",
    color: "from-cyan-400 to-blue-500",
  },
  {
    school: "Lotus Institute of Management",
    degree: "Bachelor of Computer Applications (BCA)",
    place: "Bareilly, India",
    period: "2018 – 2021",
    color: "from-purple-400 to-pink-500",
  },
];

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate timeline line filling up
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      // Animate each item
      const items = gsap.utils.toArray<HTMLElement>(".edu-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="education" className="relative mx-auto max-w-6xl px-6 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Education</p>
      <h2 className="mb-20 text-4xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
        Academic foundation.
      </h2>
      
      <div className="relative pl-8 md:pl-16 max-w-4xl">
        {/* Background line */}
        <div className="absolute left-3 md:left-5 top-0 h-full w-1 bg-foreground/5 rounded-full" />
        
        {/* Animated fill line */}
        <div 
          ref={lineRef}
          className="absolute left-3 md:left-5 top-0 h-full w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full origin-top"
        />

        {items.map((it, i) => (
          <div key={it.school} className="edu-item relative mb-16 last:mb-0 group">
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-[45px] md:-left-[57px] top-0 h-10 w-10 md:h-12 md:w-12 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center z-10 transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(168,139,250,0.5)]">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>

            {/* Glowing Backdrop */}
            <div className={`absolute -inset-0.5 rounded-[32px] bg-gradient-to-r ${it.color} opacity-0 blur-xl transition duration-500 group-hover:opacity-20`} />
            
            {/* Card Content */}
            <div className="relative glass-strong rounded-[32px] p-8 md:p-10 border border-white/10 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl md:text-3xl font-bold">{it.school}</h3>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-bold text-primary self-start md:self-auto">
                  <Calendar className="w-4 h-4" />
                  {it.period}
                </span>
              </div>
              
              <p className="text-xl font-semibold text-foreground/80 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">{it.degree}</p>
              
              <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 bg-foreground/5 px-4 py-2 rounded-xl">
                <MapPin className="w-4 h-4" />
                {it.place}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
