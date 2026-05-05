import { useLenis } from "@/hooks/useLenis";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { MobileNav } from "@/components/portfolio/MobileNav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Experience } from "@/components/portfolio/Experience";
import { SkillsStack } from "@/components/portfolio/SkillsStack";
import { Projects } from "@/components/portfolio/Projects";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Newsletter } from "@/components/portfolio/Newsletter";
import { Footer } from "@/components/portfolio/Footer";

export default function App() {
  useLenis();
  return (
    <main className="relative">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <SkillsStack />
      <FeaturedProjects />
      <Projects />
      <Testimonials />
      <Newsletter />
      <Footer />
      <MobileNav />
    </main>
  );
}
