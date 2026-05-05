import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, X } from "lucide-react";
import { fetchStarredRepos, repoImage, type Repo } from "@/lib/github";

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<Repo | null>(null);

  useEffect(() => {
    fetchStarredRepos()
      .then((d) => setRepos(d.slice(0, 12)))
      .catch(() => setError("Couldn't load GitHub stars right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Work</p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Curated from GitHub.</h2>
        </div>
        <a
          href="https://github.com/Ashirvad-Singh"
          target="_blank"
          rel="noreferrer"
          className="hidden text-sm text-foreground/60 hover:text-foreground md:inline-flex items-center gap-1"
        >
          @Ashirvad-Singh <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl bg-white/40" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-3xl glass p-8 text-center text-foreground/70">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              data-cursor="hover"
              data-cursor-text="Open"
              className="group relative overflow-hidden rounded-3xl glass p-0 text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(168,139,250,0.45)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={repoImage(r)}
                  loading="lazy"
                  alt={r.name}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).src = r.owner.avatar_url)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <h3 className="truncate text-lg font-bold">{r.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-foreground/60">
                  {r.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {r.language && (
                    <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-[10px] font-medium">
                      {r.language}
                    </span>
                  )}
                  {r.topics?.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gradient-to-r from-[#aeefff]/40 to-[#d8b4fe]/40 px-2.5 py-0.5 text-[10px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-foreground/50">
                    <Star className="h-3 w-3" /> {r.stargazers_count}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)" }}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-strong"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/70 p-2 hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={repoImage(active)}
                alt={active.name}
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = active.owner.avatar_url)}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold">{active.name}</h3>
                <p className="mt-2 text-foreground/70">
                  {active.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.language && (
                    <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs">
                      {active.language}
                    </span>
                  )}
                  {active.topics?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-gradient-to-r from-[#aeefff]/40 to-[#d8b4fe]/40 px-3 py-1 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={active.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
                  >
                    View on GitHub <ExternalLink className="h-4 w-4" />
                  </a>
                  <span className="inline-flex items-center gap-2 text-sm text-foreground/60">
                    <Star className="h-4 w-4" /> {active.stargazers_count}
                    <GitFork className="ml-3 h-4 w-4" /> {active.forks_count}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
