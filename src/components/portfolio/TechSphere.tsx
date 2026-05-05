import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const techs = [
  { name: "React", color: "#61dafb" },
  { name: "JS", color: "#f7df1e" },
  { name: "Node", color: "#8cc84b" },
  { name: "GSAP", color: "#88ce02" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "PHP", color: "#777bb4" },
  { name: "WP", color: "#21759b" },
];

export function TechSphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      rotation: 360,
      duration: 30,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const radius = 110;

  return (
    <div className={`relative pointer-events-none ${className}`} aria-hidden>
      <div
        ref={ref}
        className="relative h-[260px] w-[260px] will-change-transform"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Orbit ring */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 260">
          <defs>
            <linearGradient id="orbit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#aeefff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d8b4fe" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke="url(#orbit)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <circle cx="130" cy="130" r={radius - 20} fill="none" stroke="rgba(216,180,254,0.25)" strokeWidth="0.8" />
        </svg>

        {techs.map((t, i) => {
          const angle = (i / techs.length) * Math.PI * 2;
          const x = 130 + radius * Math.cos(angle) - 22;
          const y = 130 + radius * Math.sin(angle) - 22;
          return (
            <div
              key={t.name}
              className="absolute flex h-11 w-11 items-center justify-center rounded-full glass-strong text-[10px] font-bold pointer-events-auto transition-transform hover:scale-125"
              style={{ left: x, top: y, color: t.color }}
              data-cursor="hover"
            >
              {t.name}
            </div>
          );
        })}

        {/* Core */}
        <div
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(216,180,254,0.55) 60%, rgba(174,239,255,0.4))",
            boxShadow: "0 10px 40px -10px rgba(168,139,250,0.6)",
          }}
        />
      </div>
    </div>
  );
}
