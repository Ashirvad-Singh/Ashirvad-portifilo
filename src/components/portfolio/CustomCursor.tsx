import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3.out" });
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const enter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute("data-cursor-text") ?? "";
      setLabel(text);
      gsap.to(ring.current, {
        scale: text ? 3 : 2.4,
        opacity: 0.5,
        duration: 0.3,
        ease: "power3.out",
      });
    };
    const leave = () => {
      setLabel("");
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" });
    };

    window.addEventListener("mousemove", move);
    const targets = document.querySelectorAll<HTMLElement>("[data-cursor='hover'], a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 mix-blend-multiply will-change-transform"
      >
        {label && (
          <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary will-change-transform"
      />
    </>
  );
}
