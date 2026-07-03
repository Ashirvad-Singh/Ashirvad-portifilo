import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, X, Code2, BookOpen, Eye } from "lucide-react";
import { fetchStarredRepos, repoImage, type Repo } from "@/lib/github";

function GithubCard({ repo, onClick }: { repo: Repo; onClick: () => void }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-black/5 dark:border-white/10 bg-white dark:bg-[#0A0A0F] p-8 shadow-xl hover:shadow-2xl cursor-pointer h-full min-h-[300px]"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120,119,198,0.15), transparent 40%)`,
        }}
      />
      
      {/* Glowing Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative Background Icon */}
      <div className="absolute -bottom-6 -right-6 text-foreground/5 dark:text-white/5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
        <Code2 size={160} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-foreground/60 bg-foreground/5 px-3 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
          <p className="text-sm text-foreground/60 line-clamp-3 leading-relaxed">
            {repo.description ?? "No description provided for this repository."}
          </p>
        </div>

        <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {repo.language && (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-foreground/80">{repo.language}</span>
              </div>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
            View Details <ArrowUpRightIcon />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l9.2-9.2M17 17V7H7"/>
    </svg>
  );
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<Repo | null>(null);

  // Lock body scroll when modal is open
  if (typeof document !== "undefined") {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  useEffect(() => {
    fetchStarredRepos()
      .then((d) => setRepos(d.slice(0, 6))) // Show top 6 to keep it premium and not overwhelming
      .catch(() => setError("Couldn't load GitHub stars right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github-work" className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Open Source</p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
            Curated from GitHub.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/60">
            A collection of my starred and most valued open-source repositories. These tools and projects shape my development ecosystem.
          </p>
        </div>
        <a
          href="https://github.com/Ashirvad-Singh"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <IconBrandGithub className="w-5 h-5" />
          @Ashirvad-Singh
        </a>
      </div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-[32px] bg-foreground/5 dark:bg-white/5" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-[32px] bg-red-500/10 border border-red-500/20 p-8 text-center text-red-500 font-bold mx-auto max-w-3xl">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
          {repos.map((repo) => (
            <GithubCard key={repo.id} repo={repo} onClick={() => setActive(repo)} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[32px] md:rounded-[40px] bg-white dark:bg-[#0A0A0F] shadow-2xl border border-white/10 max-h-[85vh] md:max-h-[90vh]"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-6 top-6 z-50 rounded-full bg-black/10 dark:bg-white/10 p-2 text-foreground backdrop-blur-md transition-colors hover:bg-black/20 dark:hover:bg-white/20 hover:scale-105"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="relative h-40 md:h-64 w-full shrink-0 bg-neutral-900 overflow-hidden">
                <img
                  src={repoImage(active)}
                  alt={active.name}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).src = active.owner.avatar_url)}
                  className="h-full w-full object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-10 flex items-center gap-4">
                  <img src={active.owner.avatar_url} alt="Owner" className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/20 shadow-lg" />
                  <div>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{active.owner.login}</span>
                    <h3 className="text-2xl md:text-5xl font-bold text-white">{active.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10 flex flex-col overflow-y-auto scrollbar-hide">
                <p className="text-base md:text-lg leading-relaxed text-foreground/80 max-w-2xl">
                  {active.description ?? "No detailed description provided for this repository."}
                </p>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/5">
                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Language</span>
                    <span className="font-bold text-foreground">{active.language || "N/A"}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/5">
                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Stars</span>
                    <span className="font-bold text-foreground flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> {active.stargazers_count}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/5">
                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Forks</span>
                    <span className="font-bold text-foreground flex items-center gap-2"><GitFork className="w-4 h-4 text-blue-500" /> {active.forks_count}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/5">
                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Watchers</span>
                    <span className="font-bold text-foreground flex items-center gap-2"><Eye className="w-4 h-4 text-green-500" /> {active.watchers_count}</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {active.topics?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-bold text-primary"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="mt-12 flex justify-end">
                  <a
                    href={active.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full md:w-auto items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition-transform hover:-translate-y-1 shadow-xl hover:shadow-2xl dark:bg-white dark:text-black"
                  >
                    View Repository on GitHub <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function IconBrandGithub({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
  );
}
