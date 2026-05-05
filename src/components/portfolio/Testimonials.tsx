import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    quote: "Ashirvad shipped our LMS in record time and the engagement numbers spoke for themselves.",
    name: "Project Lead",
    role: "EdTech Client",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Aria",
  },
  {
    quote: "Pixel-precise WordPress builds with motion that feels alive — exactly what we needed.",
    name: "Design Director",
    role: "Adat Soft Solutions",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Kai",
  },
  {
    quote: "He turned a vague brief into a polished, performant product. A rare collaborator.",
    name: "Founder",
    role: "AI Portal",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Mira",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Voices</p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl">Words from the team.</h2>

      <div className="grid items-center gap-12 md:grid-cols-[1fr_2fr]">
        <div className="flex -space-x-4">
          {items.map((it, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              data-cursor="hover"
              className={`group relative h-20 w-20 overflow-hidden rounded-full border-4 border-white transition-all md:h-28 md:w-28 ${
                idx === i ? "z-10 scale-110 shadow-xl" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-foreground/80 py-1 text-center text-[9px] font-medium text-background opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {it.name}
              </span>
            </button>
          ))}
        </div>
        <div className="rounded-3xl glass p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl font-medium leading-relaxed md:text-2xl">"{items[i].quote}"</p>
              <div className="mt-6 text-sm text-foreground/60">
                <span className="font-semibold text-foreground">{items[i].name}</span> ·{" "}
                {items[i].role}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
