import { Counter } from "./Counter";
import { TechSphere } from "./TechSphere";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">About</p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Crafting modern web experiences with precision and soul.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
            WordPress-focused developer with expertise in building dynamic websites, learning
            management systems, and e-commerce solutions. Skilled in custom WordPress theme &
            plugin development, PHP, and React. Adept at SEO-friendly, responsive design and
            delivering optimized solutions tailored to client needs.
          </p>
        </div>

        <div className="flex justify-center">
          <TechSphere />
        </div>
      </div>
    </section>
  );
}
