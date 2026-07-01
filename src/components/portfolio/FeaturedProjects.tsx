import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

type Project = {
  title: string;
  website: string;
  category: string;
  gradient: string;
  glow: string;
  roles: string[];
  tech: string[];
  description: string;
  summary: string;
};

const featuredProjects: Project[] = [
  {
    title: "ILBS Alumni",
    website: "https://www.ilbsalumni.net/",
    category: "Alumni portal",
    gradient: "from-[#aeefff] via-[#d8b4fe] to-[#fbcfe8]",
    glow: "from-[#aeefff]/80 to-[#d8b4fe]/70",
    roles: [
      "Frontend Development",
      "WordPress Theme Development",
      "Custom PHP Development",
      "Responsive UI",
      "Performance Optimization",
      "SEO Optimization",
    ],
    tech: ["WordPress", "PHP", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
    description:
      "Designed and developed a premium alumni portal with bespoke WordPress architecture, responsive layouts, polished interactions, and performance-focused delivery.",
    summary:
      "This experience combined custom theme development, dynamic content structure, and conversion-focused UX to create a robust portal for alumni engagement.",
  },
  {
    title: "Roadhouse Cafe & Bar",
    website: "https://www.roadhousecafeandbar.com/",
    category: "Restaurant site",
    gradient: "from-[#fbcfe8] via-[#fef3c7] to-[#aeefff]",
    glow: "from-[#fbcfe8]/80 to-[#fde68a]/70",
    roles: ["Frontend Development", "React Development", "Responsive UI", "Performance Optimization"],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3"],
    description:
      "Built a modern restaurant website with immersive visuals, fluid navigation, and a fast, polished experience tailored for local discovery.",
    summary:
      "The build emphasized responsive storytelling, smooth interactions, and lightweight implementation for a refined hospitality experience.",
  },
  {
    title: "Charta International",
    website: "https://chartainternational.com/",
    category: "Corporate website",
    gradient: "from-[#d8b4fe] via-[#aeefff] to-[#c6f6d5]",
    glow: "from-[#d8b4fe]/80 to-[#aeefff]/70",
    roles: ["Frontend Development", "React Development", "UI Implementation", "Responsive Design"],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3"],
    description:
      "Created a corporate experience with reusable components, modern information hierarchy, and elegant presentation across every screen size.",
    summary:
      "The project focused on clarity, speed, and scalable component structure to support a professional brand presence.",
  },
  {
    title: "Metal Cat Music",
    website: "https://www.metalcatmusic.com/",
    category: "Music platform",
    gradient: "from-[#aeefff] via-[#c6f6d5] to-[#fbcfe8]",
    glow: "from-[#aeefff]/80 to-[#c6f6d5]/70",
    roles: ["Frontend Development", "React Development", "UI/UX", "Performance Optimization"],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3"],
    description:
      "Developed an expressive music platform with immersive visuals, responsive layout systems, and a contemporary feel aligned with the brand.",
    summary:
      "The experience blended visual storytelling with a lightweight frontend architecture for a memorable first impression.",
  },
  {
    title: "GigLab SoundWorks",
    website: "https://www.giglabsoundworks.com/",
    category: "Audio production",
    gradient: "from-[#d8b4fe] via-[#fbcfe8] to-[#aeefff]",
    glow: "from-[#d8b4fe]/80 to-[#fbcfe8]/70",
    roles: ["Full Stack Development", "Next.js Development", "SEO Optimization", "Performance Optimization"],
    tech: ["Next.js", "React.js", "JavaScript", "HTML5", "CSS3"],
    description:
      "Built a high-performance audio production platform with strong SEO foundations, server-rendered architecture, and refined interactions.",
    summary:
      "This build emphasized technical performance, content discoverability, and premium presentation for a modern creative studio.",
  },
  {
    title: "MV Sports Tohana",
    website: "https://mvsportstohana.in/",
    category: "Sports academy",
    gradient: "from-[#c6f6d5] via-[#aeefff] to-[#d8b4fe]",
    glow: "from-[#c6f6d5]/80 to-[#aeefff]/70",
    roles: ["Full Website Development", "Responsive Design", "SEO Optimization"],
    tech: ["WordPress", "PHP", "JavaScript", "HTML5", "CSS3"],
    description:
      "Developed a modern sports academy website focused on responsive layouts, strong discoverability, and a polished, conversion-friendly UI.",
    summary:
      "The project combined clean structure, accessible navigation, and thoughtful content presentation for a strong digital presence.",
  },
];

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">Featured Work</p>
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Selected Projects</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/70 md:text-lg">
        A collection of production-ready applications and business websites I&apos;ve designed and
        developed using modern technologies.
      </p>
    </div>
  );
}

function ProjectBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">
      {children}
    </span>
  );
}

function ProjectCard({
  project,
  isExpanded,
  onToggle,
}: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const host = new URL(project.website).hostname.replace(/^www\./, "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/55 p-4 shadow-[0_24px_80px_-28px_rgba(168,139,250,0.45)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div
        className={`pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-gradient-to-br ${project.glow} opacity-70 blur-3xl transition duration-700 group-hover:scale-125`}
      />
      <div className="relative flex flex-1 flex-col">
        <div
          className={`relative mb-4 overflow-hidden rounded-[24px] border border-white/70 bg-gradient-to-br ${project.gradient} p-3 shadow-inner`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_50%)]" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] border border-white/60 bg-white/35 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.05))]" />
            <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/70">
              {project.category}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-2xl border border-white/70 bg-white/55 px-4 py-3 shadow-sm backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/50">
                  Preview
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground/80">{project.title}</p>
              </div>
            </div>
            <motion.div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/30 blur-2xl"
              animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-8 right-6 h-20 w-20 rounded-full bg-white/20 blur-2xl"
              animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary/80 transition hover:text-primary"
              >
                {host}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
              Live
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-foreground/70">{project.description}</p>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
              Technology stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <ProjectBadge key={item}>{item}</ProjectBadge>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
              Role
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.roles.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-sm font-medium text-foreground/75 transition duration-300 hover:-translate-y-0.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 pt-2">
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/15"
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isExpanded}
              className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-medium text-foreground/75 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <Sparkles className="h-4 w-4" />
              {isExpanded ? "Hide details" : "View details"}
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {isExpanded ? (
            <div className="mt-4 rounded-[22px] border border-white/70 bg-white/55 p-4 text-sm leading-7 text-foreground/70">
              <p className="font-semibold text-foreground/85">{project.summary}</p>
              <ul className="mt-3 space-y-2 text-foreground/65">
                <li>• Focused on performance, accessibility, and thoughtful visual hierarchy.</li>
                <li>• Crafted for fast loading, clean navigation, and polished interactions.</li>
                <li>• Built to feel premium while remaining scalable and maintainable.</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
          isExpanded={expandedProject === project.title}
          onToggle={() =>
            setExpandedProject((current) => (current === project.title ? null : project.title))
          }
        />
      ))}
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[38px] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(174,239,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(216,180,254,0.16),transparent_35%),rgba(255,255,255,0.45)] p-6 shadow-[0_30px_120px_-40px_rgba(15,23,42,0.18)] backdrop-blur-2xl md:p-8 lg:p-10">
        <div className="absolute inset-0 rounded-[38px] border border-white/70" />
        <div className="absolute -left-12 top-12 h-32 w-32 rounded-full bg-[#aeefff]/40 blur-3xl" />
        <div className="absolute bottom-8 right-6 h-36 w-36 rounded-full bg-[#d8b4fe]/35 blur-3xl" />
        <SectionHeader />
        <ProjectGrid projects={featuredProjects} />
      </div>
    </section>
  );
}
