import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed left-0 right-0 top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3 md:px-8">
        <a href="#top" className="text-lg font-bold tracking-tight">
          Ashirvad<span className="text-primary">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="md:hidden rounded-full p-2 hover:bg-white/40"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <a
          href="#contact"
          className="hidden md:inline-flex rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-transform hover:scale-105"
        >
          Let's talk
        </a>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(28px)" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 rounded-full p-3 hover:bg-white/40"
            >
              <X className="h-6 w-6" />
            </button>
            <ul className="space-y-6 text-center">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="text-5xl font-bold tracking-tight text-foreground hover:text-gradient md:text-7xl"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
