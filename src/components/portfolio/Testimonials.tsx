import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    "quote": "Ashirvad doesn’t just deliver features—he delivers outcomes. Our LMS saw a measurable jump in engagement within weeks of launch.",
    "name": "Raghav Sharma",
    "role": "Founder, Qynt Creative Co.",
    "img": "https://api.dicebear.com/7.x/notionists/svg?seed=Raghav"
  },
  {
    "quote": "From design fidelity to performance optimization, every detail was handled with precision. The final build felt effortless and fast.",
    "name": "Yogesh Gupta",
    "role": "Founder, Kriyo Digital",
    "img": "https://api.dicebear.com/7.x/notionists/svg?seed=Yogesh"
  },
  {
    "quote": "We came in with half-baked ideas—he walked out with a production-ready product. Clear thinking, clean execution.",
    "name": "Ankit Verma",
    "role": "Co-Founder, AI Portal",
    "img": "https://api.dicebear.com/7.x/notionists/svg?seed=Ankit"
  },
  {
    "quote": "Reliable, fast, and ridiculously detail-oriented. You don’t need to micromanage—he just gets it done right.",
    "name": "Neha Kapoor",
    "role": "Product Lead, Adat Soft Solutions",
    "img": "https://api.dicebear.com/7.x/notionists/svg?seed=Neha"
  },
  {
    "quote": "Our biggest win? Not having to worry. Ashirvad handled everything from architecture to polish like a pro.",
    "name": "Rahul Mehta",
    "role": "Tech Lead, SaaSWorks",
    "img": "https://api.dicebear.com/7.x/notionists/svg?seed=Rahul"
  },
  {
    "quote": "If you want average, look elsewhere. If you want someone who actually elevates your product—this is your guy.",
    "name": "Priya Singh",
    "role": "Founder, ScaleUp Labs",
    "img": "https://api.dicebear.com/7.x/notionists/svg?seed=Priya"
  }
]

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
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
