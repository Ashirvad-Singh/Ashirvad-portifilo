import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    quote:
      "Ashirvad transformed our alumni platform into a modern, user-friendly experience. The performance improvements, custom WordPress development, and attention to detail exceeded our expectations.",
    name: "Dr S.K. Sarin",
    role: "Project Coordinator, ILBS Alumni",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rajeev",
  },
  {
    quote:
      "Our restaurant needed a website that felt as premium as the dining experience itself. Ashirvad delivered an elegant, fast, and responsive website that our customers genuinely love browsing.",
    name: "Davin Kapoor",
    role: "Owner, Roadhouse Cafe",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohit",
  },
  {
    quote:
      "Working with Ashirvad was seamless from start to finish. He built a clean, scalable frontend that perfectly reflected our corporate identity while keeping performance top-notch.",
    name: "Tushar Sharma",
    role: "Director, Charta International",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Amit",
  },
  {
    quote:
      "We wanted a website that captured our creative energy without sacrificing speed. The final result was visually stunning, responsive, and incredibly smooth across all devices.",
    name: "Arjit",
    role: "Founder, Metal Cat Music",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Jason",
  },
  {
    quote:
      "Ashirvad built a high-performance platform that helped showcase our services professionally while significantly improving SEO and overall user experience.",
    name: "Arjit Bhat",
    role: "Founder, GigLab SoundWorks",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=David",
  },
  {
    quote:
      "From planning to deployment, every stage was handled professionally. The website looks modern, loads quickly, and has already helped us attract more students online.",
    name: "Rahul Gill",
    role: "Founder, MV Sports Tohana",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rahul",
  },
];

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
        <div className="flex -space-x-3">
          {items.map((it, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              data-cursor="hover"
              className={`group relative h-10 w-10 overflow-hidden rounded-full border-2 border-white transition-all md:h-20 md:w-20 ${
                idx === i ? "z-10 scale-110 shadow-xl" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img src={it.img} alt={it.name} className="h-full w-full object-cover" />
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
