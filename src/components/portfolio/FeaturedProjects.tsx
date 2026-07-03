import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";

type Project = {
  title: string;
  website: string;
  category: string;
  filterCategory: "Business" | "Creative" | "Platforms";
  roles: string[];
  tech: string[];
  description: string;
  summary: string;
  image: string;
};

const featuredProjects: Project[] = [
  {
    title: "ILBS Alumni",
    website: "https://www.ilbsalumni.net/",
    category: "Alumni portal",
    filterCategory: "Platforms",
    roles: ["Frontend", "WordPress", "Custom PHP", "SEO"],
    tech: ["WordPress", "PHP", "Tailwind CSS", "JavaScript"],
    description: "Premium alumni portal with bespoke WordPress architecture, responsive layouts, and performance-focused delivery.",
    summary: "Combined custom theme development and conversion-focused UX to create a robust portal for alumni engagement.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Roadhouse Cafe",
    website: "https://www.roadhousecafeandbar.com/",
    category: "Restaurant site",
    filterCategory: "Creative",
    roles: ["Frontend", "React Dev", "UI/UX"],
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    description: "Modern restaurant website with immersive visuals, fluid navigation, and a fast, polished experience.",
    summary: "Emphasized responsive storytelling and smooth interactions for a refined hospitality experience.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Charta Int.",
    website: "https://chartainternational.com/",
    category: "Corporate website",
    filterCategory: "Business",
    roles: ["Frontend", "React Dev", "UI Implementation"],
    tech: ["React.js", "Next.js", "TypeScript"],
    description: "Corporate experience with reusable components, modern hierarchy, and elegant presentation.",
    summary: "Focused on clarity, speed, and scalable component structure to support a professional brand presence.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  },
  {
    title: "Metal Cat Music",
    website: "https://www.metalcatmusic.com/",
    category: "Music platform",
    filterCategory: "Creative",
    roles: ["Frontend", "UI/UX", "Optimization"],
    tech: ["React.js", "CSS3", "JavaScript"],
    description: "Expressive music platform with immersive visuals and responsive layout systems.",
    summary: "Blended visual storytelling with a lightweight frontend architecture for a memorable first impression.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "GigLab SoundWorks",
    website: "https://www.giglabsoundworks.com/",
    category: "Audio production",
    filterCategory: "Platforms",
    roles: ["Full Stack", "Next.js Dev", "SEO"],
    tech: ["Next.js", "React.js", "TypeScript"],
    description: "High-performance audio production platform with strong SEO foundations and server-rendered architecture.",
    summary: "Emphasized technical performance, content discoverability, and premium presentation.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "MV Sports Tohana",
    website: "https://mvsportstohana.in/",
    category: "Sports academy",
    filterCategory: "Business",
    roles: ["Full Website Dev", "Responsive Design", "SEO"],
    tech: ["WordPress", "PHP", "Tailwind CSS"],
    description: "Modern sports academy website focused on responsive layouts and strong discoverability.",
    summary: "Combined clean structure, accessible navigation, and thoughtful content presentation.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
  },
];

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-primary">Projects Showcase</p>
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
        Selected Work
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/60">
        Hover to explore and click to expand into immersive detail views. Built with smooth layout transitions and draggable interactions.
      </p>
    </div>
  );
}

const TABS = ["All", "Business", "Creative", "Platforms"];

export function FeaturedProjects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const dragConstraintsRef = useRef(null);

  // Lock body scroll when modal is open
  if (typeof document !== "undefined") {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  const filteredProjects = featuredProjects.filter(p => filter === "All" || p.filterCategory === filter);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <SectionHeader />
      
      {/* Animated Filter Menu */}
      <div className="mt-12 flex flex-wrap justify-center gap-2 relative z-20">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-colors ${
              filter === tab ? "text-background dark:text-background" : "text-foreground/70 hover:text-foreground bg-foreground/5 dark:bg-white/5"
            }`}
          >
            {filter === tab && (
              <motion.div
                layoutId="active-pill-filter"
                className="absolute inset-0 bg-foreground dark:bg-white rounded-full -z-10 shadow-lg"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-16 grid gap-6 sm:grid-cols-1 lg:grid-cols-3 auto-rows-[400px] md:auto-rows-[450px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            // Dynamic span logic for Bento grid (2-1, 1-2, 2-1) based on current filtered index
            const isLarge = i % 3 === 0 || i % 3 === 2; // For dynamic sizes on filtered arrays
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                layoutId={`card-${project.title}`}
                key={project.title}
                onClick={() => setActive(project)}
                className={`group cursor-pointer relative flex flex-col justify-end overflow-hidden rounded-[32px] md:rounded-[40px] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.05)] w-full h-full ${
                  isLarge && filteredProjects.length > 1 ? "lg:col-span-2" : "col-span-1"
                }`}
              >
                <motion.div 
                  layoutId={`image-container-${project.title}`}
                  className="absolute inset-0 z-0 bg-neutral-900"
                >
                  <motion.img 
                    layoutId={`image-${project.title}`}
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                  />
                  {/* Premium vignette/gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                </motion.div>
                
                <div className="relative z-10 flex flex-col p-8 md:p-10 transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">
                  <motion.span layoutId={`category-${project.title}`} className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">
                    {project.category}
                  </motion.span>
                  <motion.h3 layoutId={`title-${project.title}`} className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {project.title}
                  </motion.h3>
                  <motion.p layoutId={`desc-${project.title}`} className="text-sm md:text-base text-white/70 line-clamp-2 leading-relaxed opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100 max-w-lg">
                    {project.description}
                  </motion.p>
                </div>
                
                <div className="absolute top-8 right-8 z-20">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white w-12 h-12 rounded-full scale-50 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 flex items-center justify-center shadow-2xl">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`card-${active.title}`}
              className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[32px] md:rounded-[48px] bg-white dark:bg-[#0B0B0F] shadow-2xl md:flex-row h-[85vh] md:h-[70vh] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-6 top-6 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/80 hover:scale-105"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div 
                layoutId={`image-container-${active.title}`}
                className="relative h-1/2 w-full overflow-hidden md:h-full md:w-[55%] bg-neutral-900" 
                ref={dragConstraintsRef}
              >
                <motion.img
                  layoutId={`image-${active.title}`}
                  src={active.image}
                  alt={active.title}
                  drag
                  dragConstraints={dragConstraintsRef}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                  className="h-full w-full object-cover cursor-grab"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                  <span className="bg-black/40 border border-white/10 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full tracking-wide shadow-lg">
                    Hold & Drag Image
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-12 relative scrollbar-hide">
                <motion.span layoutId={`category-${active.title}`} className="text-xs font-bold text-primary uppercase tracking-widest inline-block mb-3">
                  {active.category}
                </motion.span>
                <motion.h3 layoutId={`title-${active.title}`} className="text-3xl md:text-5xl font-bold text-foreground">
                  {active.title}
                </motion.h3>
                <motion.p layoutId={`desc-${active.title}`} className="mt-4 text-base md:text-lg leading-relaxed text-foreground/70">
                  {active.description}
                </motion.p>
                
                <div className="mt-10 flex flex-col gap-8">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 mb-3">Summary</h4>
                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">{active.summary}</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {active.tech.map(t => (
                        <span key={t} className="rounded-xl bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 px-3 py-1.5 text-xs font-semibold text-foreground/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 mb-3">Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {active.roles.map(r => (
                        <span key={r} className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                          {r}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-12 pb-4">
                  <a 
                    href={active.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-2xl bg-foreground text-background px-8 py-4 text-sm font-bold shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl dark:bg-white dark:text-black"
                  >
                    Launch Project <ExternalLink className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
