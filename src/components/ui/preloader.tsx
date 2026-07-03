import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles on mount
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Only track mouse if window is available
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      // Initialize mouse position to center
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Interactive Glow */}
      <motion.div
        className="pointer-events-none absolute rounded-full bg-primary/20 blur-[120px]"
        style={{ width: 600, height: 600 }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 1.5 }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/60"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}vw`,
            top: `${p.y}vh`,
          }}
          animate={{
            y: ["-25vh", "25vh"],
            x: ["-15vw", "15vw"],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
          <h1 className="relative text-6xl font-black tracking-tighter text-white md:text-8xl">
            Ashirvad<span className="text-primary">.</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md"
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase">Loading Experience</span>
        </motion.div>
      </div>
    </div>
  );
}
