import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { FloatingNav } from "@/components/portfolio/FloatingNav";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Experience } from "@/components/portfolio/Experience";
import { SkillsStack } from "@/components/portfolio/SkillsStack";
import { Projects } from "@/components/portfolio/Projects";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Newsletter } from "@/components/portfolio/Newsletter";
import { Footer } from "@/components/portfolio/Footer";
import MacbookScrollDemo from "@/components/macbook-scroll-demo";
import { Preloader } from "@/components/ui/preloader";

export default function App() {
  useLenis();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader after 3 seconds
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (showPreloader) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [showPreloader]);

  return (
    <main className="relative" id="top">
      <AnimatePresence mode="popLayout">
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.785, 0.135, 0.15, 0.86] }}
            className="fixed inset-0 z-[9999]"
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showPreloader ? "h-screen overflow-hidden" : ""}>
        <CustomCursor />
        <ScrollProgress />
        <MacbookScrollDemo />
        <About />
        <Education />
        <Experience />
        <SkillsStack />
        <FeaturedProjects />
        <Projects />
        <Testimonials />
        <Newsletter />
        <Footer />
        <FloatingNav />
      </div>
    </main>
  );
}
