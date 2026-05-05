const featured = [
  {
    title: "Learning Management System",
    stack: "MongoDB · Express · React · Node.js",
    desc: "Full-stack LMS with course creation, material uploads, task assignments, JWT auth and progress tracking.",
    grad: "from-[#aeefff] to-[#d8b4fe]",
  },
  {
    title: "AI Portal Website",
    stack: "WordPress · PHP · Tailwind",
    desc: "Custom WordPress theme for an AI portal with a sleek, responsive UI and dynamic content rendering.",
    grad: "from-[#d8b4fe] to-[#fbcfe8]",
  },
  {
    title: "Pokedex App",
    stack: "React · Redux · REST API",
    desc: "Responsive Pokedex with search, filters and dynamic detail fetching from the Pokémon API.",
    grad: "from-[#fbcfe8] to-[#aeefff]",
  },
  {
    title: "Custom WordPress Theme",
    stack: "WordPress · PHP · Tailwind",
    desc: "Customizable blogging theme with custom post types, widgets and advanced theme options.",
    grad: "from-[#c6f6d5] to-[#aeefff]",
  },
];

export function FeaturedProjects() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Featured</p>
      <h2 className="mb-10 text-4xl font-bold tracking-tight md:text-5xl">Selected case studies.</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-3xl glass p-8 transition-all hover:-translate-y-1"
          >
            <div
              className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${f.grad} opacity-40 blur-3xl transition-transform duration-700 group-hover:scale-125`}
            />
            <h3 className="text-2xl font-bold">{f.title}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-foreground/50">
              {f.stack}
            </p>
            <p className="mt-4 text-foreground/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
